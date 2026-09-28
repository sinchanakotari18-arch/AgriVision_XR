// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// Stores one Merkle Sum Tree root per harvest batch and can verify a record against it.
/// Deploy on Polygon Amoy (testnet) with Remix, then put the address in VITE_AGRI_MST_ADDRESS.
contract AgriProvenance {
    struct Batch {
        bytes32 root;
        uint256 totalGrams;
        address farmer;
        uint64 anchoredAt;
    }

    mapping(bytes32 => Batch) public batches;

    event BatchAnchored(bytes32 indexed batchId, bytes32 root, uint256 totalGrams, address indexed farmer);

    function anchor(bytes32 batchId, bytes32 root, uint256 totalGrams) external {
        require(batches[batchId].anchoredAt == 0, "batch exists");
        batches[batchId] = Batch(root, totalGrams, msg.sender, uint64(block.timestamp));
        emit BatchAnchored(batchId, root, totalGrams, msg.sender);
    }

    /// Recomputes the root from one leaf plus its sibling path. Matches src/lib/mst.ts exactly.
    function verify(
        bytes32 batchId,
        bytes32 recordDataHash,
        uint256 grams,
        bytes32[] calldata sibHashes,
        uint256[] calldata sibSums,
        bool[] calldata sibIsLeft
    ) external view returns (bool) {
        Batch memory b = batches[batchId];
        if (b.anchoredAt == 0) return false;
        require(sibHashes.length == sibSums.length && sibSums.length == sibIsLeft.length, "bad proof");

        bytes32 h = keccak256(abi.encodePacked(recordDataHash, grams));
        uint256 s = grams;
        for (uint256 i = 0; i < sibHashes.length; i++) {
            if (sibIsLeft[i]) {
                h = keccak256(abi.encodePacked(sibHashes[i], sibSums[i], h, s));
            } else {
                h = keccak256(abi.encodePacked(h, s, sibHashes[i], sibSums[i]));
            }
            s += sibSums[i];
        }
        return h == b.root && s == b.totalGrams;
    }
}
