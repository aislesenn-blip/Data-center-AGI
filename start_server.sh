#!/bin/bash
npm run start > server_output.log 2>&1 &
echo $! > server.pid
