FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY .babelrc .

VOLUME [ "pm2.json", "config.json", "template.html" ]

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
RUN npm run build

# Show current folder structure in logs
RUN ls -al -R

EXPOSE 4000

CMD [ "pm2-runtime", "start", "pm2.json" ]