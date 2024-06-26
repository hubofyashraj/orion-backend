FROM node:20-alpine
ENV JWT_SECRET=MY_JWT_SECRET PORT=6789
RUN mkdir -p /home/yasmc
WORKDIR /home/yasmc

COPY package.json yarn.lock* ./
RUN yarn add sharp --ignore-engines
RUN yarn install 
COPY . /home/yasmc

RUN yarn
RUN yarn build
CMD ["yarn", "start"]
