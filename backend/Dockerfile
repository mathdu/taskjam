FROM node
# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./
RUN yarn

# Copy app source code
COPY . .

# Env setup
COPY .env.example .env

#Expose port and begin application
EXPOSE 3000

# Start the app
CMD [ "yarn", "start:dev"]