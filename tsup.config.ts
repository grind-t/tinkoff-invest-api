import { copyFile } from "node:fs/promises";
import { defineConfig } from "tsup";

export default defineConfig({
  name: "@grind-t/t-invest",
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  experimentalDts: true,
  clean: true,
  shims: true,
  onSuccess: async () => {
    await copyFile('src/client/ca.pem', 'dist/ca.pem')
  }
});
