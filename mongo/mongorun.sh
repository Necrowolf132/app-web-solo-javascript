#!/bin/bash

mongod --config /etc/mongod.conf > /dev/null &
sleep 5
mongorestore  --host=127.0.0.1 --dir /opt/mongoData/ -u root -p 25448132 --authenticationDatabase admin
echo ""
