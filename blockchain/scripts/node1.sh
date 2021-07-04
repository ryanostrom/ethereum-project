#!/bin/bash

account=`cat nodes/node1/account.txt`

# Get enr address from boot node
enr=`geth attach bootnode/geth.ipc --exec admin.nodeInfo.enr | bc`

# Start Node1
geth --datadir nodes/node1 \
  --networkid 1515 \
  --nat extip:127.0.0.1 \
  --port 30311 \
  --bootnodes "$enr" \
  --unlock $account \
  --password nodes/bootnode/password.txt \
  --mine \
  --miner.threads=1 \
  --miner.etherbase="0x$account"

  # --http \
  # --http.port 8545 \
  # --http.api personal,eth,net,web3 \
  # --http.corsdomain '*'
  # --ws.port 3334 \
  # --ws.api eth,net,web3 \
  # --ws.origins '*'\
