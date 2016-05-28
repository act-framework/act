#!/bin/sh

ROOT=`pwd`

EXAMPLES=examples/*/

for f in $EXAMPLES
do
  echo "Processing $ROOT/$f..."
  cd "$ROOT/$f"
  npm install
  npm run build
done

echo "Processing $ROOT/animation/examples/..."
cd "$ROOT/animation/examples/"
npm install
npm run build
