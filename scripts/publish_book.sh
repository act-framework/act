#!/bin/sh

mv .gitignore .tmp-gitignore
cp scripts/.gitignore .
./scripts/build_examples.sh
npm run docs:clean
npm run docs:build
cp .gitignore _book
cd _book
git init
git checkout -b gh-pages
git commit --allow-empty -m 'update book'
git add .
git commit -am 'update book'
git push git@github.com:joaomilho/act gh-pages --force
cd ..
mv .tmp-gitignore .gitignore
