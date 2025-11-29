import * as esbuild from "esbuild";
import config from "./esbuild.config.mjs";

let ctx = await esbuild.context(config);

await ctx.watch();

let { port } = await ctx.serve({ servedir: "." });

console.log(`Listening on http://localhost:${port}`);
