import { Plugin } from "esbuild";
import { rm, writeFile } from "fs/promises";
import path from "path";

interface HtmlPluginOptions {
  template?: string;
  title?: string;
}

const preparePath = (keys: string[]) => {
  return keys.reduce<Array<string[]>>(
    (acc, path) => {
      const [js, css] = acc;
      const splittedFileName = path.split("/").pop();

      if (splittedFileName?.endsWith(".js")) {
        js.push(splittedFileName);
      } else if (splittedFileName?.endsWith(".css")) {
        css.push(splittedFileName);
      }

      return acc;
    },
    [[], []],
  );
};

export const HTMLPlugin = (options: HtmlPluginOptions): Plugin => {
  return {
    name: "html-plugin",
    setup(build) {
      const outdir = build.initialOptions.outdir;

      build.onStart(async () => {
        console.log("BUILD START!");

        try {
          if (outdir) {
            // ATTENTION!!! Check the "outdir" variable (console.log(outdir)) for the correct path to avoid deleting other system files, before rm folder
            await rm(outdir, { recursive: true });
          }
        } catch (err) {
          console.log('[Error while clean "/dist"]: ', err);
        }
      });

      build.onEnd(async (result) => {
        console.log("BUILD END!", result);

        const outputs = result.metafile?.outputs;
        const [jsPath, cssPath] = preparePath(Object.keys(outputs || {}));

        console.log(jsPath, cssPath);

        if (outdir) {
          await writeFile(
            path.resolve(outdir, "index.html"),
            options.template ||
              `<!doctype html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport"
                          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    ${cssPath.map((path) => `<link  rel="stylesheet" href=${path}/>`).join(" ")}
                    <title>${options.title}</title>
                </head>
                <body>
                    <div id="root"></div>
                    ${jsPath.map((path) => `<script src=${path}></script>`).join(" ")}
                </body>
                </html>
            `,
          );
        }
      });
    },
  };
};
