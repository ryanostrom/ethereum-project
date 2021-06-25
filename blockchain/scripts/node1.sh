#!/bin/sh

# cat nodes/node1/account.txt
account=`cat nodes/node1/account.txt`

# Get enr address from boot node
enr=`geth attach bootnode/geth.ipc --exec admin.nodeInfo.enr | bc`

# Start Node2
geth --datadir nodes/node1 \
  --networkid 1515 \
  --nat extip:127.0.0.1 \
  --port 30311 \
  --miner.gasprice 0 \
  --unlock $account \
  --password nodes/node1/password.txt \
  --mine \
  --miner.threads=1 \
  --miner.etherbase="0x$account" \
  --bootnodes "$enr"
