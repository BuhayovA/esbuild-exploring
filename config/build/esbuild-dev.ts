import path from "path";
import ESBuild from "esbuild";
import config from "./esbuild-config";

// WITHOUT auto re-build
// ESBuild.build(config);

// WITH auto re-build
const PORT = Number(process.env.PORT) || 3000;

ESBuild.context(config).then((ctx) => {
  ctx
    .serve({ servedir: config.outdir, port: PORT })
    .then(({ host, port }) => console.log(`Server started on ${host}${port}`))
    .catch((err) => console.log("[Error]: ", err));
});
