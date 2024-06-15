FROM node
WORKDIR /app

COPY ./package* ./yarn*  ./
RUN yarn

# Copy app source code
COPY . .

EXPOSE 10086
CMD [ "yarn", "dev"]