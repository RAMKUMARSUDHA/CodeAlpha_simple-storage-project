# SimpleStorage — Solidity Smart Contract

![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-363636?style=flat&logo=solidity)
![Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-FFF100?style=flat&logo=ethereum&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

A minimal, production-ready Ethereum smart contract demonstrating core Solidity fundamentals — state variables, public getters, state-mutating functions, events, and Solidity 0.8.x's built-in overflow/underflow protection.

---

## 📖 Overview

`SimpleStorage` is a single-purpose contract that stores one `uint256` counter on-chain and exposes three operations on it:

| Function | Type | Description |
|---|---|---|
| `value()` | auto-generated getter | Reads the current counter value |
| `getValue()` | `view` function | Explicit read function, mirrors `value()` |
| `increment()` | state-mutating | Increases the counter by 1 |
| `decrement()` | state-mutating | Decreases the counter by 1 (reverts below 0) |

Every state change emits a `ValueChanged` event so off-chain applications (dashboards, indexers, frontends) can track updates without polling.

This project was built and tested end-to-end using **Hardhat** — compiled, deployed to a local blockchain, and verified by scripted function calls.

---

## 🧠 Core Concepts Demonstrated

- **Pragma versioning** — `pragma solidity ^0.8.0;` locks the contract to a safe, modern compiler range.
- **Public state variables** — `uint256 public value` auto-generates a free getter.
- **Checked arithmetic** — Solidity ≥0.8.0 reverts automatically on overflow/underflow; no SafeMath needed.
- **Custom revert reasons** — `require()` guards `decrement()` with a human-readable error instead of a raw panic code.
- **Events** — `ValueChanged` logs every mutation with the previous value, new value, and caller address.
- **View functions** — `getValue()` costs zero gas when called off-chain.

---

## 📂 Project Structure

```
simple-storage-project/
├── contracts/
│   └── SimpleStorage.sol        # The smart contract
├── ignition/
│   └── modules/
│       └── SimpleStorage.js     # Hardhat Ignition deployment module
├── test/
│   └── interact.js              # Script to call & verify contract functions
├── hardhat.config.js            # Hardhat configuration
└── package.json
```

---

## 📜 Contract Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title  SimpleStorage
 * @notice Demonstrates core Solidity state management:
 *         reading, incrementing, and decrementing an integer.
 * @dev    Solidity ^0.8.0 arithmetic is overflow/underflow-checked
 *         by default — no SafeMath required.
 */
contract SimpleStorage {

    // ── State variable ───────────────────────────────────────────
    // `public` causes Solidity to auto-generate a `value()` getter.
    // Initialised to 0 (EVM default; explicit here for clarity).
    uint256 public value = 0;

    // ── Event ────────────────────────────────────────────────────
    // Emitted on every state change so off-chain listeners
    // (frontends, indexers) can react without polling.
    event ValueChanged(
        uint256 indexed previousValue,
        uint256 indexed newValue,
        address indexed changedBy
    );

    /**
     * @notice Increases `value` by 1.
     * @dev    Overflow auto-reverts in ^0.8.0 (panic 0x11).
     */
    function increment() public {
        uint256 previous = value;
        value += 1;
        emit ValueChanged(previous, value, msg.sender);
    }

    /**
     * @notice Decreases `value` by 1.
     * @dev    `require` gives a readable revert reason before the
     *         implicit underflow guard would fire.
     */
    function decrement() public {
        require(value > 0, "SimpleStorage: cannot decrement below zero");
        uint256 previous = value;
        value -= 1;
        emit ValueChanged(previous, value, msg.sender);
    }

    /**
     * @notice Returns the current value (mirrors the auto getter).
     * @dev    `view` = read-only. Zero gas off-chain.
     */
    function getValue() public view returns (uint256) {
        return value;
    }
}
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes bundled with Node.js)

### Installation

```bash
git clone https://github.com/<your-username>/simple-storage-project.git
cd simple-storage-project
npm install
```

### Compile

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully (evm target: paris).
```

### Run a local blockchain

In a separate terminal, start a local Hardhat node (keep this running):

```bash
npx hardhat node
```

### Deploy

In your main terminal:

```bash
npx hardhat ignition deploy ignition/modules/SimpleStorage.js --network localhost
```

Expected output:
```
[ SimpleStorageModule ] successfully deployed 🚀
Deployed Addresses
SimpleStorageModule#SimpleStorage - 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Interact & Test

```bash
npx hardhat run test/interact.js --network localhost
```

Expected output:
```
Initial value: 0
After increment() x2: 2
After decrement() x1: 1
getValue() returns: 1
```

---

## 🧪 Test Matrix

| # | Starting value | Action | Expected value | Result |
|---|---|---|---|---|
| 1 | `0` | `increment()` | `1` | ✅ Pass |
| 2 | `1` | `increment()` | `2` | ✅ Pass |
| 3 | `2` | `decrement()` | `1` | ✅ Pass |
| 4 | `1` | `decrement()` | `0` | ✅ Pass |
| 5 | `0` | `decrement()` | reverts | ⛔ Revert (`"cannot decrement below zero"`) |
| 6 | `0` | `value()` | `0` | ✅ Read |
| 7 | `0` | `getValue()` | `0` | ✅ Read |

---

## 🛠️ Built With

- [Solidity](https://soliditylang.org/) — Smart contract language
- [Hardhat](https://hardhat.org/) — Ethereum development environment
- [Ethers.js](https://docs.ethers.org/) — Contract interaction library
- [Hardhat Ignition](https://hardhat.org/ignition) — Declarative deployment system

---

## 📄 License

This project is licensed under the **MIT License** — see the contract's SPDX header for details.

---

## 👤 Author

**Your RAMKUMAR S**

- GitHub: [@your-github-username](https://github.com/your-github-RAMKUMARSUDHA)
- LinkedIn: [your-linkedin-profile](https://linkedin.com/in/your-linkedin-https://www.linkedin.com/in/ramkumar-subramani-324160314/)

---

<p align="center"><em>Built as a foundational exercise in Solidity smart contract development.</em></p>
