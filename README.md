# Ethereum Project

## About

A personal project to build an end-to-end ecoysytem with blockchain technology. This project is designed to demonstrate (a) broad expertise across the tech stack, enabling data flow from UI <-> API <-> Blockchain; (b) deep expertise in Javascript (React, NodeJS, Typescript); (c) general expertise in devops (bash, docker); and (d) capability in ethereum blockchain technology, including geth and solidity.

This project leverages a private PoW blockchain as opposed to one of the two test networks for two reasons:

1. Gain foundational knowledge and experience in geth
2. Include optionality to simulate rewards in a sandbox environment

## Current State of Project

The project is currently building locally with React, and provisioned by Docker for a NodeJS API, PostgreSQL DB and Geth PoW network, which is generated with some light bash scripting in the docker instance. The React UI is currently able to retrieve and display data of the latest block data via an API call to NodeJS, which leverages Web3  to retrieve data from the local chain.

## Future State of Project

The end-state of the project will be an example application that enables transfering of Vehicle Titles via Smart Contracts. As such, the following will be required:

- Build Solidity Ecosystem with Automated Tests
- Build and deploy smart contracts with a DAO
- Migrate smart contracts associated to DAO
- Interact with Smart Contracts via UI
- Transfer ethereum between accounts
- Debit/Credit Ethereum based on MetaMask account holder data for current user

## Development Docs

To run the app locally:

### UI

1. Create .env file at app/.env mimicking .env.example.
2. Then:

```bash
// project root
$ cd app
$ nvm use
$ yarn i
$ yarn start
```

### API / Blockchain / Postgres

1. Create .env file at api/.env mimicking .env.example.
2. Follow the instructions at blockchain/README for pre-requisites
3. Then:

```bash
// project root
$ docker compose up
```
