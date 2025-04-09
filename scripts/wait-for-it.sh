#!/usr/bin/env bash

echo "Raw host input: $1"
host="$1"
shift
cmd="$@"

host_ip=$(echo "$host" | cut -d: -f1)
host_port=$(echo "$host" | cut -d: -f2)

echo "Checking $host_ip:$host_port"

until nc -z "$host_ip" "$host_port"; do
  echo "Waiting for $host_ip:$host_port..."
  sleep 1
done

exec $cmd

