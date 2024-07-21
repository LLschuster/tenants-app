FROM node:20.15.1-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm run install-all

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start"]
