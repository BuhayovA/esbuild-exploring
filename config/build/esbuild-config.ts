import path from "path";
import { BuildOptions } from "esbuild";
// plugins
import { cleanPlugin } from "./plugins/clean-plugin";
import { HTMLPlugin } from "./plugins/html-plugin";

const mode = process.env.MODE || "development";

const isDev = mode === "development";
const isProd = mode === "production";

function resolveRoot(...segments: string[]) {
  return path.resolve(__dirname, "..", "..", ...segments);
}

const config: BuildOptions = {
  entryNames: "[dir]/bundle.[name]-[hash]",

  format: "esm",
  allowOverwrite: true,
  bundle: true,
  minify: isProd,
  sourcemap: isDev,
  loader: {
    ".png": "file",
    ".svg": "file",
    ".jpg": "file",
  },
  metafile: true,

  plugins: [
    cleanPlugin,
    HTMLPlugin({
      title: "ESBUILD-exploring",
    }),
  ],

  outdir: path.resolve(__dirname, resolveRoot("dist")),
  tsconfig: path.resolve(__dirname, resolveRoot("tsconfig.json")),
  entryPoints: [path.resolve(__dirname, resolveRoot("src", "index.tsx"))],

  // custom dev-server
};

export default config;
