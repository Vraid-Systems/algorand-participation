FROM ubuntu:18.04

# install Algorand stable MainNet - https://developer.algorand.org/docs/run-a-node/setup/install/#installing-with-debian
RUN apt-get update && apt-get install -y curl gnupg2 python3 software-properties-common wget && wget https://releases.algorand.com/key.pub && apt-key add key.pub && rm -fr key.pub && add-apt-repository "deb https://releases.algorand.com/deb/ stable main" && apt-get update && apt-get install -y algorand && curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*
COPY algorand_system.json /var/lib/algorand/system.json

# app directory
WORKDIR /usr/src/app

# Bundle app source
COPY index.js index.js
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install app dependencies and configure
RUN npm ci --only=production

# By default this listens on TCP 3048
EXPOSE 3048
# Default execution of this container
CMD node index.js
