FROM keymetrics/pm2:latest-alpine

WORKDIR /data/site

# Bundle APP files
COPY src src/
COPY package.json .
COPY package-lock.json .
COPY .babelrc .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

# build
RUN npm run build

# Show current folder structure in logs
RUN ls -al -R

EXPOSE 4000

CMD [ "pm2-runtime", "start", "pm2.json" ]