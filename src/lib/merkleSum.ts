// src/lib/merkleSum.ts
// Merkle Sum Tree (MST) for AgriVision XR provenance records.
// Each leaf = one field record (CV scan, soil reading, fertigation, AR waypoint, harvest weight)
// plus an integer weight in grams. The root commits to every record AND the total grams,
// so a batch can never be sold for more than was logged.
//
// Install once:  npm i ethers
import { keccak256, toUtf8Bytes, solidityPackedKeccak256 } from "ethers";

export type RecordType = "CV_SCAN" | "SOIL" | "FERTIGATION" | "AR_WAYPOINT" | "HARVEST";

export interface FieldRecord {
  id: string;
  type: RecordType;
  payload: Record<string, unknown>; // e.g. { disease: "Leaf Spot", confidence: 0.94, gps: [12.9, 77.5] }
  grams: number; // integer; use 0 for non-weight records (scans, soil, etc.)
  ts: number; // Date.now()
}

export interface MstNode {
  hash: string; // 0x... bytes32
  sum: bigint; // total grams below this node
}

export interface ProofStep {
  hash: string;
  sum: string; // bigint as string so it is JSON safe
  side: "left" | "right"; // where the sibling sits
}

export interface MstTree {
  root: MstNode;
  levels: MstNode[][]; // levels[0] = leaves
}

// Deterministic JSON: sorted keys, so the same record always gives the same hash.
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    return `{${Object.keys(o)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${canonical(o[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function dataHash(r: FieldRecord): string {
  return keccak256(toUtf8Bytes(canonical({ id: r.id, type: r.type, payload: r.payload, ts: r.ts })));
}

export function leafNode(r: FieldRecord): MstNode {
  const grams = BigInt(Math.round(r.grams));
  return { hash: solidityPackedKeccak256(["bytes32", "uint256"], [dataHash(r), grams]), sum: grams };
}

function parent(l: MstNode, r: MstNode): MstNode {
  return {
    hash: solidityPackedKeccak256(
      ["bytes32", "uint256", "bytes32", "uint256"],
      [l.hash, l.sum, r.hash, r.sum],
    ),
    sum: l.sum + r.sum,
  };
}

export function buildTree(records: FieldRecord[]): MstTree {
  if (records.length === 0) throw new Error("No records to anchor");
  let level = records.map(leafNode);
  const levels: MstNode[][] = [level];
  while (level.length > 1) {
    const next: MstNode[] = [];
    for (let i = 0; i < level.length; i += 2) {
      // An odd node is carried up unchanged. Duplicating it would double count grams.
      next.push(i + 1 < level.length ? parent(level[i], level[i + 1]) : level[i]);
    }
    levels.push(next);
    level = next;
  }
  return { root: level[0], levels };
}

export function getProof(tree: MstTree, index: number): ProofStep[] {
  const steps: ProofStep[] = [];
  let i = index;
  for (let l = 0; l < tree.levels.length - 1; l++) {
    const level = tree.levels[l];
    const isRight = i % 2 === 1;
    const sibIdx = isRight ? i - 1 : i + 1;
    if (sibIdx < level.length) {
      const s = level[sibIdx];
      steps.push({ hash: s.hash, sum: s.sum.toString(), side: isRight ? "left" : "right" });
    }
    i = Math.floor(i / 2);
  }
  return steps;
}

// Anyone (a buyer, a bank) can run this with one record, its proof and the on-chain root.
export function verifyProof(
  record: FieldRecord,
  proof: ProofStep[],
  expectedRoot: string,
  expectedTotalGrams?: bigint,
): boolean {
  let node = leafNode(record);
  for (const s of proof) {
    const sib: MstNode = { hash: s.hash, sum: BigInt(s.sum) };
    node = s.side === "left" ? parent(sib, node) : parent(node, sib);
  }
  const rootOk = node.hash.toLowerCase() === expectedRoot.toLowerCase();
  const sumOk = expectedTotalGrams === undefined || node.sum === expectedTotalGrams;
  return rootOk && sumOk;
}
