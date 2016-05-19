#!/bin/sh

npm run docs:clean
npm run docs:build
cd _book
git init
git commit --allow-empty -m 'update book'
git checkout -b gh-pages
git add .
git commit -am 'update book'
git push git@github.com:joaomilho/act gh-pages --force
