#!/bin/bash

function bootnodeConsole {
  osascript -e "
    tell application \"Terminal\" to do script \"cd \\\"$(PWD)\\\" && npm run bootnode-console\"
  " > /dev/null 2>&1
}

bootnodeConsole

function node1Console {
  osascript -e "
    tell application \"Terminal\" to do script \"cd \\\"$(PWD)\\\" && npm run node1-console\"
  " > /dev/null 2>&1
}

node1Console
