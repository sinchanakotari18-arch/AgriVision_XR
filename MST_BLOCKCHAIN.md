# MST Blockchain integration (AgriVision XR)

| | |
|---|---|
| Network | MST Testnet |
| Chain ID | 91562037 (`0x5752035`) |
| RPC | https://testnetrpc.mstblockchain.com |
| Explorer | https://testnet.mstscan.com |
| Contract | `AgriProvenance` ([source](contracts/AgriProvenance.sol), [ABI](src/lib/abi/AgriProvenance.json)) |
| Contract address | `VITE_AGRI_MST_ADDRESS` in `.env` (shown live in the app, linked to MSTScan) |

## What goes on-chain
Each farm activity (crop scan, AI recommendation, farm action, VR training, farm creation, credential)
is turned into a compact summary in the browser. Personal fields (names, emails, phones, images) are
stripped. The summary is hashed with Keccak-256 (`dataHash`), and only this is written to the chain:

```
AgriProvenance.anchor(batchId = keccak256(activityId), root = keccak256(dataHash, 0), totalGrams = 0)
```

Anyone can later call `AgriProvenance.verify(batchId, dataHash, 0, [], [], [])` (free, read-only) to
prove a record is unchanged. The app's **Tamper test** does exactly this with a modified copy, and the
contract returns `false`.

## Code map
| What | Where |
|---|---|
| Network config, wallet, contract calls, hashing, error handling | `src/lib/mstChain.ts` |
| Merkle Sum Tree hashing | `src/lib/merkleSum.ts` |
| Compiled ABI | `src/lib/abi/AgriProvenance.json` (regenerate: `scripts/compile-contract.cjs`) |
| UI: Farm Passport, Activity Ledger, Blockchain Details, Architecture, Blockchain & Wallet | `public/agrivision.html`, section `#view-mst` + "MST BLOCKCHAIN UI CONTROLLER" script |
| Bridge between app page and module | `src/routes/index.tsx` imports `mstChain.ts`, which exposes `window.AgriMst` to the iframe |

## Honesty rules the UI follows
- Transaction hashes, block numbers and gas come only from MetaMask / MST RPC receipts.
- "✓ VERIFIED" is shown only after a successful receipt, and saved records are re-checked against the
  chain (receipt + stored root + `verify()`) every time the page opens.
- Sample rows are in a separate, collapsed table labelled **DEMO DATA** and have no transaction hash.
- No private key, Secret Recovery Phrase or API key is used. MetaMask signs everything.
