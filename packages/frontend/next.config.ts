import type { NextConfig } from "next";
import BuilderDevTools from "@builder.io/dev-tools/next";
import { loadRootEnv } from "../shared/env-loader";

loadRootEnv();
const nextConfig: NextConfig = BuilderDevTools()({
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
});

export default nextConfig;
