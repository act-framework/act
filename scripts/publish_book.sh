#!/bin/sh

mv .gitignore .master.gitignore
mv .ghpages.gitignore .gitignore

./scripts/build_examples.sh
npm run docs:clean
npm run docs:build
cd _book
git init
git commit --allow-empty -m 'update book'
git checkout -b gh-pages
git add .
git commit -am 'update book'
git push git@github.com:joaomilho/act gh-pages --force
cd ..
mv .gitignore .ghpages.gitignore
mv .master.gitignore .gitignore
