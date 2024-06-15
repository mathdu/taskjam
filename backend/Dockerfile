FROM node
WORKDIR /app

COPY package*.json ./
RUN yarn

# Copy app source code
COPY . .

COPY .env.example .env

EXPOSE 3000
CMD [ "yarn", "start:dev"]