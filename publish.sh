#!/bin/bash

echo "copy cc config file" 
cp -r ./dualSites/cc/* ./
echo "generate page and push" 
hexo clean all && hexo g -d
echo "ok" 
rm -rf _config*


echo "copy me config file" 
cp -r ./dualSites/me/* ./
echo "generate page and push" 
hexo clean all && hexo g -d
echo "ok" 
rm -rf _config*

echo "generate github page"
rm -rf ./publicPage/*
cp -r ./public/* ./publicPage
cd ./publicPage
git add . && git commit -m $(date '+UpDate_%Y-%m-%d_%H:%M') && git push
cd ..
echo "ok" 

git add . && git commit -m $(date '+UpDate_%Y-%m-%d_%H:%M') && git push

rm -rf ./public