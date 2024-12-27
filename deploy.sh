# !/bin/bash

# PRODUCTION
git reset --hard
git checkout master
git pull origin master

npm install --legacy-peer-deps
npm install --legacy-peer-deps serve -g
npm run build
pm2 start process.config.js --env production
