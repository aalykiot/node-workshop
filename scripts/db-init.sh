#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Ensure the DATABASE_URL environment variable is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set."
  exit 1
fi

# Ensure the schema.sql file exists
if [ ! -f "schema.sql" ]; then
  echo "Error: schema.sql file not found."
  exit 1
fi

# Run the schema.sql file using psql
psql "$DATABASE_URL" -f schema.sql

# Check if psql command was successful
if [ $? -eq 0 ]; then
  echo "Schema applied successfully."
else
  echo "Error applying schema."
  exit 1
fi