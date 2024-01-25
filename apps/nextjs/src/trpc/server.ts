// import { createTRPCNextLayout } from "@trpc/next";
// import superjson from "superjson";

// import { appRouter } from "@acme/api";
// import { createContextInner } from "@acme/api";

// import "server-only";

// export const trpcRsc = createTRPCNextLayout({
//   router: appRouter,
//   transformer: superjson,
//   createContext() {
//     const auth = getAuth();

//     return createContextInner({
//       auth,
//       req: null,
//     });
//   },
// });

import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs";

import { createCaller, createTRPCContext } from "@acme/api";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    auth: auth(),
    headers: heads,
  });
});

export const api = createCaller(createContext);
