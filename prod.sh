#!/bin/sh

pm2 delete 0
npm run build
pm2 start npm --name "datadex-client" -- start
