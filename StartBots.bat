START /B pm2 start CLA.js --name "CLA" --watch
START /B pm2 start CLB.js --name "CLB" --watch
START /B pm2 start CLD.js --name "CLD" --watch
START /B pm2 start CLH.js --name "CLH" --watch

START pm2 logs