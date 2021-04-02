#Node foundation implementation

FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]



#Best practice

# FROM node:14.4.0 AS build

# COPY . .
# RUN npm ci && npm run build

# FROM node:slim-14.4.0

# USER node
# EXPOSE 8080

# COPY --from=build /home/node/app/dist /home/node/app/package.json /home/node/app/package-lock.json ./
# RUN npm ci --production

# CMD [ "node", "dist/app.js" ]