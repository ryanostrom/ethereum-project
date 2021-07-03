#!/bin/bash

function bootnode {
  osascript -e "
    tell application \"Terminal\" to do script \"cd \\\"$(pwd)\\\" && npm run bootnode\"
  " > /dev/null 2>&1
}

bootnode

function node1 {
  osascript -e "
    tell application \"Terminal\" to do script \"cd \\\"$(pwd)\\\" && npm run node1\"
  " > /dev/null 2>&1
}

node1
