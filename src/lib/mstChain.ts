// src/lib/mstChain.ts
// Connects AgriVision XR to MST Testnet and the deployed AgriProvenance contract.
// Needs: npm i ethers, src/lib/merkleSum.ts, and VITE_AGRI_MST_ADDRESS in .env
import { BrowserProvider, Contract, keccak256, toUtf8Bytes } from "ethers";
import { buildTree, getProof, verifyProof, dataHash, type FieldRecord } from "./merkleSum";

export const MST_TESTNET = {
  chainIdHex: "0x5752035", // 91562037
  chainName: "MST Testnet",
  rpcUrls: ["https://testnetrpc.mstblockchain.com"],
  nativeCurrency: { name: "MSTC", symbol: "MSTC", decimals: 18 },
  blockExplorerUrls: ["https://testnet.mstscan.com"],
};

const ABI = [
  "function anchor(bytes32 batchId, bytes32 root, uint256 totalGrams)",
  "function batches(bytes32) view returns (bytes32 root, uint256 totalGrams, address farmer, uint64 anchoredAt)",
  "function verify(bytes32 batchId, bytes32 recordDataHash, uint256 grams, bytes32[] sibHashes, uint256[] sibSums, bool[] sibIsLeft) view returns (bool)",
];

function contractAddress(): string {
  const addr = (import.meta as any).env?.VITE_AGRI_MST_ADDRESS as string | undefined;
  if (!addr) throw new Error("VITE_AGRI_MST_ADDRESS is missing in .env. Restart the dev server after adding it.");
  return addr;
}

export function batchIdFromName(name: string): string {
  return keccak256(toUtf8Bytes(name));
}

// Switches MetaMask to MST Testnet, adding the network if it is not there yet.
export async function connectMst() {
  const eth = (window as any).ethereum;
  if (!eth) throw new Error("No wallet found. Install MetaMask.");
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: MST_TESTNET.chainIdHex }] });
  } catch {
    await eth.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: MST_TESTNET.chainIdHex,
          chainName: MST_TESTNET.chainName,
          rpcUrls: MST_TESTNET.rpcUrls,
          nativeCurrency: MST_TESTNET.nativeCurrency,
          blockExplorerUrls: MST_TESTNET.blockExplorerUrls,
        },
      ],
    });
  }
  const provider = new BrowserProvider(eth);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return { provider, signer, address: await signer.getAddress() };
}

// Builds the Merkle sum tree from the records and stores its root on-chain.
// Keep the records in the same order: the same list always rebuilds the same tree.
export async function anchorBatch(batchName: string, records: FieldRecord[]) {
  const { signer } = await connectMst();
  const tree = buildTree(records);
  const batchId = batchIdFromName(batchName);
  const contract = new Contract(contractAddress(), ABI, signer);
  const tx = await contract.anchor(batchId, tree.root.hash, tree.root.sum);
  await tx.wait();
  return {
    batchId,
    root: tree.root.hash,
    totalGrams: tree.root.sum.toString(),
    txHash: tx.hash as string,
    explorerUrl: `${MST_TESTNET.blockExplorerUrls[0]}/tx/${tx.hash}`,
  };
}

// Checks one record against the root stored on-chain, both in the browser and by the contract.
export async function verifyRecord(batchName: string, records: FieldRecord[], index: number) {
  const { provider } = await connectMst();
  const contract = new Contract(contractAddress(), ABI, provider);
  const batchId = batchIdFromName(batchName);
  const stored = await contract.batches(batchId);
  if (stored.anchoredAt === 0n) return { found: false, localOk: false, onChainOk: false };

  const tree = buildTree(records);
  const proof = getProof(tree, index);
  const record = records[index];

  const localOk = verifyProof(record, proof, stored.root, stored.totalGrams);
  const onChainOk: boolean = await contract.verify(
    batchId,
    dataHash(record),
    BigInt(Math.round(record.grams)),
    proof.map((s) => s.hash),
    proof.map((s) => BigInt(s.sum)),
    proof.map((s) => s.side === "left"),
  );
  return { found: true, localOk, onChainOk };
}

// Demo helper: changes one field of a record, then verifies it. Should return false.
export async function tamperTest(batchName: string, records: FieldRecord[], index: number) {
  const bad = records.map((r, i) =>
    i === index ? { ...r, payload: { ...r.payload, tampered: true } } : r,
  );
  return verifyRecord(batchName, bad, index);
}

// Lets the static public/agrivision.html call these functions as window.AgriMst.*
if (typeof window !== "undefined") {
  (window as any).AgriMst = { connectMst, anchorBatch, verifyRecord, tamperTest, batchIdFromName };
}
