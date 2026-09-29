// Regenerates src/lib/abi/AgriProvenance.json from contracts/AgriProvenance.sol.
// Usage (one-off, does not change package.json):
//   npx --yes -p solc@0.8.24 node scripts/compile-contract.cjs
// If npx cannot resolve solc, run `npm i --no-save solc@0.8.24` first.
const fs = require("fs");
const path = require("path");
let solc;
try {
  solc = require("solc");
} catch {
  console.error("solc not found. Run: npm i --no-save solc@0.8.24");
  process.exit(1);
}
const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "contracts/AgriProvenance.sol"), "utf8");
const out = JSON.parse(
  solc.compile(
    JSON.stringify({
      language: "Solidity",
      sources: { "AgriProvenance.sol": { content: src } },
      settings: { optimizer: { enabled: true, runs: 200 }, outputSelection: { "*": { "*": ["abi"] } } },
    }),
  ),
);
const errs = (out.errors || []).filter((e) => e.severity === "error");
if (errs.length) {
  errs.forEach((e) => console.error(e.formattedMessage));
  process.exit(1);
}
const abi = out.contracts["AgriProvenance.sol"].AgriProvenance.abi;
const file = path.join(root, "src/lib/abi/AgriProvenance.json");
fs.writeFileSync(
  file,
  JSON.stringify({ contractName: "AgriProvenance", compiler: "solc " + solc.version(), source: "contracts/AgriProvenance.sol", abi }, null, 2) + "\n",
);
console.log("Wrote", path.relative(root, file));
