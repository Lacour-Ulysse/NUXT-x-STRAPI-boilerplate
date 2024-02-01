#!/bin/bash

# Colors
DEFAULT='\x1b[36;1m'
SUCCESS='\x1b[32;1m'
ERROR='\x1b[31;43;1m'
UNDERLINE='\x1b[4m'
RESET='\x1b[0m'

echo -e "\n${DEFAULT}LAUNCHING DEV SERVER :${RESET}\n"

# Function to handle errors
handle_error() {
    echo -e "\n${ERROR}ERROR !!!${RESET}\n"
    exit 1
}

# Use right node version
. ~/.nvm/nvm.sh || handle_error
nvm use 18 || handle_error

# Install Strapi for vscode
yarn --cwd "strapi/" install || handle_error

# Install Nuxt dependencies for vscode
yarn --cwd "nuxt/" install || handle_error

# Mount docker containers
docker compose -f docker-compose.dev.yml up --build -d || handle_error

# Success message
echo -e "\n${SUCCESS}Dockerized apps up and running on localhost!\n"
