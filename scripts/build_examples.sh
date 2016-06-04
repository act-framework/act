#!/bin/sh

ROOT=`pwd`

EXAMPLES=animation/examples/

for f in $EXAMPLES
do
  echo "Processing $ROOT/$f..."
  cd "$ROOT/$f"
  npm install
  npm run build
done

EXAMPLES=examples/*/

for f in $EXAMPLES
do
  echo "Processing $ROOT/$f..."
  cd "$ROOT/$f"
  npm install
  npm run build
done

