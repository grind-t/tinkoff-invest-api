import path from "node:path";
import { $, cd, fs } from "zx";

const rootDir = path.dirname(import.meta.dirname);
const sourceDir = path.join(rootDir, "invest-contracts");
const targetDir = path.join(rootDir, "contracts");

cd(rootDir);
await $`git clone --filter=blob:none --no-checkout https://opensource.tbank.ru/invest/invest-contracts.git`;
cd(sourceDir);
await $`git sparse-checkout init`;
await $`git sparse-checkout set src/docs/contracts`;
await $`git checkout master`;

await fs.remove(targetDir);
await fs.copy(path.join(sourceDir, "src/docs/contracts"), targetDir);
await fs.remove(sourceDir);
