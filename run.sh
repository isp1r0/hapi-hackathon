#!/bin/sh
export NODE_PATH=.
export NODE_ENV=development
export NODE_HOST=localhost
export NODE_PORT=3000
export DB_DEV=mongodb://terry:dev@ds041651.mongolab.com:41651/fb_movies

node server