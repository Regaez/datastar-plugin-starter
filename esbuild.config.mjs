export default {
  bundle: true,
  entryPoints: ["./src/**/*"],
  external: ["datastar"],
  format: "esm",
  minify: true,
  outdir: "dist",
  resolveExtensions: [".js", ".ts"],
  sourcemap: "external",
};
