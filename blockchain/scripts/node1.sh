#!/bin/bash

# account=`cat nodes/node1/account.txt`

# Get enr address from boot node
enr=`geth attach nodes/bootnode/geth.ipc --exec admin.nodeInfo.enr | bc`

# Start Node1
nohup geth --datadir nodes/node1 \
  --networkid 1515 \
  --nat=none \
  --port 30311 \
  --bootnodes "$enr" \
  --ws \
  --ws.addr 127.0.0.1 \
  --ws.port 8546 \
  --ws.api personal,eth,net,web3 \
  --ws.origins '*' \
 > /dev/null 2>&1&
  # --unlock $account \
  # --password nodes/node1/password.txt \
  # --mine \
  # --miner.threads=1 \
  # --miner.etherbase="0x$account"
