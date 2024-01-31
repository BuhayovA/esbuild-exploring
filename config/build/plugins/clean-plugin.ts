import { Plugin } from "esbuild";
import { rm } from "fs/promises";

export const cleanPlugin: Plugin = {
  name: "clean-plugin",
  setup(build) {
    build.onStart(async () => {
      console.log("BUILD START!");

      try {
        const outdir = build.initialOptions.outdir;
        if (outdir) {
          // ATTENTION!!! Check the "outdir" variable (console.log(outdir)) for the correct path to avoid deleting other system files, before rm folder
          await rm(outdir, { recursive: true });
        }
      } catch (err) {
        console.log('[Error while clean "/dist"]: ', err);
      }
    });

    build.onEnd(() => {
      console.log("BUILD END :)");
    });
  },
};
