#!/bin/bash

# Colors
DEFAULT='\x1b[36;1m'
SUCCESS='\x1b[32;1m'
ERROR='\x1b[31;43;1m'
UNDERLINE='\x1b[4m'
RESET='\x1b[0m'

echo -e "\n${DEFAULT}EXPORTING STRAPI DATA :${RESET}\n"

# Container name
STRAPI_CONTAINER_NAME="nuxt-x-strapi-backend-1"

# Function to handle errors
handle_error() {
    echo -e "\n${ERROR}ERROR !!!${RESET}\n"
    exit 1
}

# Export Strapi current dataset
docker exec -it $STRAPI_CONTAINER_NAME yarn strapi export --no-encrypt --file strapi-export || handle_error

# Remove local file
rm -f ./strapi/strapi-export.tar.gz

# Copy dataset from the Strapi container to the local directory
docker cp $STRAPI_CONTAINER_NAME:/strapi-app/strapi-export.tar.gz ./strapi/strapi-export.tar.gz || handle_error

echo -e "\n${SUCCESS}Dataset exported and transferred to ${UNDERLINE}strapi/${RESET}${SUCCESS} local directory!\n"
