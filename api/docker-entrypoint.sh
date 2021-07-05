#!/bin/bash
set -o errexit
set -o pipefail
set -u

DB_HOST=${DB__HOSTNAME:-}
DB_PORT=${DB__PORT:=5432}
NO_MIGRATE=${DB__NO_MIGRATE:-}

# Run database migrations
if [ -n "$DB_HOST" ] && [ -z "$NO_MIGRATE" ]; then
  dockerize -wait tcp://$DB_HOST:$DB_PORT -timeout 30s npm run db:migrate
  cd /app/blockchain && npm run start
  cd /app/api
fi

exec "$@"
