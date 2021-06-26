/*
  This is a temporary fix to address a bug with react-dev-utils
  Source: https://github.com/facebook/create-react-app/issues/9880
  This, the postinstall script, and the 'replace-in-file' package
  can be removed when react-dev-utils is patched.
*/

const replace = require('replace-in-file');

const fixFormatWebpackMessages = async () => {
  try {
    const results = await replace({
      files: 'node_modules/react-dev-utils/formatWebpackMessages.js',
      from: `let lines = message.split('\\n');`,
      to: `let lines = [];
  if (typeof message === 'string' || message instanceof String) {
    lines = message.split('\\n');
  } else if ('message' in Object.keys(message)) {
    lines = message['message'].split('\\n');
  }`,
    });
  } catch (e) {
    console.log('error while trying to fix  "formatWebpackMessages.js"', e);
  }
};

fixFormatWebpackMessages();
