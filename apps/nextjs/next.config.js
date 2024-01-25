// // @ts-check
// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
//  * This is especially useful for Docker builds.
//  */
// !process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

// /** @type {import("next").NextConfig} */
// const config = {
//   reactStrictMode: true,
//   swcMinify: true,
//   transpilePackages: ["@acme/api", "@acme/db"],
//   // We already do linting on GH actions
//   eslint: {
//     ignoreDuringBuilds: !!process.env.CI,
//   },
// };

// export default config;

// Importing env files here to validate on build
import "./src/env.js";

// import "@acme/auth/env";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@acme/api", "@acme/db", "@acme/ui", "@acme/validators"],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
