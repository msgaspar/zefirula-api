#!/bin/sh
set -e

echo "Running migrations..."
yarn typeorm migration:run

if [ "$RUN_SEED" = "true" ]; then
  echo "Running seed..."
  yarn seed:admin
fi

echo "Starting application..."
exec yarn dev
