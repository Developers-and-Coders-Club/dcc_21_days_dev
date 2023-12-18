#!/bin/sh

# Path to the RSA keys
PRIVATE_KEY_PATH="./service/private_key.pem"
PUBLIC_KEY_PATH="./service/public_key.pem"

# Check if the private key exists
if [ ! -f "$PRIVATE_KEY_PATH" ]; then
    echo "Private key not found, generating keys..."
    openssl genpkey -algorithm RSA -out $PRIVATE_KEY_PATH -pkeyopt rsa_keygen_bits:2048
    openssl rsa -pubout -in $PRIVATE_KEY_PATH -out $PUBLIC_KEY_PATH
else
    echo "RSA keys already exist."
fi
