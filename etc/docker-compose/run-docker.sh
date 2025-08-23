#!/bin/bash

if [[ ! -d certs ]]
then
    mkdir certs
    cd certs/
    if [[ ! -f localhost.pfx ]]
    then
        dotnet dev-certs https -v -ep localhost.pfx -p abfaec8c-65dc-40b8-a08e-7ab267ae1204 -t
    fi
    cd ../
fi

docker-compose up -d
