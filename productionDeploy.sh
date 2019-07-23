#!/bin/bash

root="/var/www/focus.upesisoft.com/html"

cd $root

git pull origin master

npm install

npm run build

echo -e 'Deployment successful'
