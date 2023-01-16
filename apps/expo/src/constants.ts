/**
 * URL key for the Clerk auth API. You can find this in your Clerk dashboard:
 * https://dashboard.clerk.dev
 *
 * NOTE: we recommend putting the frontend api key here instead of in your .env
 * files for two reasons:
 * 1. It's okay for this to be "public" (CLERK_API_KEY and CLERK_JWT_KEY should
 *    NEVER be public)
 * 2. Parsing the .env file in Metro/Expo runs the risk of including the
 *    variables above that we don't want (and it's obnoxious to do right as a
 *    result)
 */
export const CLERK_FRONTEND_API = "";

if (CLERK_FRONTEND_API === "") {
  throw new Error("CLERK_FRONTEND_API is not defined");
}
