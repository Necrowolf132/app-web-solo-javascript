#!/bin/bash

mongod --config /etc/mongod.conf > /dev/null &
sleep 5
npm run start