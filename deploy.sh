# !/bin/bash

# PRODUCTION
git reset --hard
git checkout master
git pull origin master

npm install
npm install serve -g
npm run build
<<<<<<< HEAD
pm2 start "npm run start:prod" --name=GROCERY-REACT
=======
pm2 start process.config.js --env production
>>>>>>> master
