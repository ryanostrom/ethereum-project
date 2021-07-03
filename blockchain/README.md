# Geth PoW (Proof of Work)

## I. About

A geth implementation on a local private network with two nodes to mine against one another.

### References:
 * https://geth.ethereum.org/docs/interface/private-network
 * https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8
 * https://www.bitcoininsider.org/article/17442/setup-your-own-private-proof-authority-ethereum-network-geth
 * https://chakrvyuh.medium.com/heres-how-i-built-a-private-blockchain-network-and-you-can-too-62ca7db556c0
 * https://medium.com/@prashantramnyc/how-to-set-up-a-multi-node-private-ethereum-blockchain-from-scratch-in-20-mins-or-less-e0d7e091e062

## II. Pre-requisites

### Step 1: Bootnode Account
You will need to first create a bootnode account and an account for node1, as follows:

```bash
$ geth --datadir nodes/bootnode account new
```

This will prompt you to enter a password, and will return a public address of the key. The key will look something like this: `0x123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ12345`. Copy every part of the key starting after the `0x`. Run the following commands to create local references to the account key and password (note, replace $accountKey with the copied key from above, and replace password with your password).

```bash
$ echo "$accountKey" > nodes/bootnode/account.txt
$ echo "$password" > nodes/bootnode/password.txt
```

### Step 2: Node1 Account

Repeat this same process for node1

```bash
$ geth --datadir nodes/node1 account new
$ echo "$accountKey" > nodes/node1/account.txt
$ echo "$password" > nodes/node1/password.txt
```

Congrats! You've created two accounts, one for your bootnode and another for node1. You can now begin using your local ethereum network, the following guide.

## III. Basic Usage

### Option 1: Docker

From the root of mono repo:

```bash
$ docker compose up
```

This will tail the eth chain logs for node1.

### Option 2: Linux

Note: Linux is useful in liue of Docker to have direct acces to eth console for both bootnode and node1 without going through API.

#### 1. Initialize state

Initializes config based on current genesis.json

If config is already initialized, will cleans bootnode and node1 to empty state and re-initialize config based on current genesis.json.
```bash
$ yarn initialize
```

#### 2. Run Local Network

Start private network for bootnode and node1
```bash
$ yarn run dev
```

Start consoles for bootnode and node1
```bash
$ yarn run dev
```
