#!/bin/bash

nodemon -w ./ server.js

echo "hi"
cd ./../client/
npm run start


trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
