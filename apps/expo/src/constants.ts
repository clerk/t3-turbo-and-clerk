/**
 * URL key for the Clerk auth API. You can find this in your Clerk dashboard:
 * https://dashboard.clerk.dev
 *
 * NOTE: we recommend putting the publishable key here instead of in your .env
 * files for two reasons:
 * 1. It's okay for this to be "public" (CLERK_SECRET_KEY 
 *    NEVER be public)
 * 2. Parsing the .env file in Metro/Expo runs the risk of including the
 *    variables above that we don't want (and it's obnoxious to do right as a
 *    result)
 */

// FOR CLERK APPS AFTER 1/18/2023 pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
export const CLERK_PUBLISHABLE_KEY = undefined;

if (CLERK_PUBLISHABLE_KEY === undefined) {
  throw new Error("CLERK_PUBLISHABLE_KEY is not defined");
}
