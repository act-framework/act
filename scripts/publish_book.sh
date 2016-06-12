#!/bin/sh

./scripts/build_examples.sh
npm run docs:clean
npm run docs:build
cd _book
git init
git checkout -b gh-pages
git commit --allow-empty -m 'update book'
git add .
git commit -am 'update book'
git push git@github.com:joaomilho/act gh-pages --force
cd ..
