FROM node
WORKDIR /app

COPY ./package* ./yarn*  ./
RUN yarn

# Copy app source code
COPY . .

EXPOSE 5173
CMD [ "yarn", "dev"]