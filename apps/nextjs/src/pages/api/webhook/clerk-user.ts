import type { IncomingHttpHeaders } from "http";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import type { NextApiRequest, NextApiResponse } from "next";
import { type WebhookRequiredHeaders, Webhook } from "svix";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { buffer } from "micro";

import { appRouter, createContext } from "@acme/api";
import { env } from "../../../env/client.mjs";

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

const handler = async (
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) => {
  // Create context and caller
  const ctx = await createContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(env.NEXT_PUBLIC_CLERK_WEBHOOK_SECRET);
  let evt: WebhookEvent;
  console.log("verifying secret");
  try {
    // res.send("verifying secret");
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
  // res.send("done verifying secret");
  console.log("done verifying secret");

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      first_name,
      last_name,
      username,
      email_addresses,
      profile_image_url,
      birthday,
      gender,
      created_at,
      updated_at,
      last_sign_in_at,
    } = evt.data;

    if (!email_addresses[0]) return res.status(405).end("email not defined");
    const email = email_addresses[0].email_address;
    const createdAt: Date = new Date(created_at);
    const updatedAt: Date = new Date(updated_at);
    const lastSignInAt: Date = new Date(last_sign_in_at);

    try {
      console.log("attempt to call trpc");
      caller.auth;
      await caller.user.upsert({
        birthday,
        createdAt,
        email,
        firstName: first_name,
        gender,
        id,
        lastName: last_name,
        lastSignInAt,
        profileImageUrl: profile_image_url,
        updatedAt,
        username,
      });
      return res.status(200).end(`${eventType.toString()} event success`);
    } catch (error) {
      console.log(error);
      if (error instanceof TRPCError) {
        // An error from tRPC occured
        const httpCode = getHTTPStatusCodeFromError(error);
        return res.status(httpCode).json(error);
      }
      // Another error occured
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id)
      return res
        .status(405)
        .end("Failed to delete user. Most propably user does not exists");

    try {
      await caller.user.delete({ id });
      return res.status(200).end("user deleted");
    } catch (error) {
      if (error instanceof TRPCError) {
        // An error from tRPC occured
        const httpCode = getHTTPStatusCodeFromError(error);
        return res.status(httpCode).json(error);
      }
      // Another error occured
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Important! do not remove
// Disable the bodyParser so we can access the raw
// request body for verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
