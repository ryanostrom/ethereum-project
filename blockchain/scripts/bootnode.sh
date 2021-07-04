#!/bin/bash

account=`cat nodes/bootnode/account.txt`

geth --datadir nodes/bootnode \
  --networkid 1515 \
  --nat extip:127.0.0.1 \
  --port 30310 \
  --miner.gasprice 1 \
  --unlock $account \
  --password nodes/bootnode/password.txt \
  --mine \
  --miner.threads=1 \
  --miner.etherbase="0x$account"

