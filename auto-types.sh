#!/bin/bash

# Colors
DEFAULT='\x1b[36;1m'
SUCCESS='\x1b[32;1m'
ERROR='\x1b[31;43;1m'
UNDERLINE='\x1b[4m'
RESET='\x1b[0m'

echo -e "\n${DEFAULT}GENERATING TYPES FROM STRAPI GRAPHQL ENDPOINT:${RESET}\n"

# Containers names
STRAPI_CONTAINER_NAME="nuxt-x-strapi-backend-1"
NUXT_CONTAINER_NAME="nuxt-x-strapi-frontend-1"

# Function to handle errors
handle_error() {
    echo -e "\n${ERROR}ERROR !!!${RESET}\n"
    exit 1
}

# Remove the existing file in the Strapi container if it exists
docker exec -it $STRAPI_CONTAINER_NAME rm -f -f /strapi-app/src/Strapi.d.ts || handle_error

# And remove local file
rm -f ./strapi/src/Strapi.d.ts

# Generate types in the Strapi container
docker exec -it $STRAPI_CONTAINER_NAME yarn run types || handle_error

# Copy types from the Strapi container to the local directory
docker cp $STRAPI_CONTAINER_NAME:/strapi-app/src/Strapi.d.ts ./Strapi.d.ts || handle_error

# Remove the existing file in the Nuxt container if it exists
docker exec -it $NUXT_CONTAINER_NAME rm -f -f /nuxt-app/types/Strapi.d.ts

# And remove local file
rm -f ./nuxt/types/Strapi.d.ts

# Move types to the Nuxt container
docker cp ./Strapi.d.ts $NUXT_CONTAINER_NAME:/nuxt-app/types/Strapi.d.ts || handle_error

# And remove local root file
rm -f ./Strapi.d.ts || handle_error

echo -e "\n${SUCCESS}Types fetched and transferred to ${UNDERLINE}nuxt/types/${RESET}${SUCCESS} directory!\n"
