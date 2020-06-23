#!/bin/bash
dockerd &

sleep 10

# By some strange reason we need to do echo command to get to the next command
echo " "
exec bash -c "docker-compose up"