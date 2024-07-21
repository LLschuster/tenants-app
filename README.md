# Tenants app

## Description

An application form for tenants, so that they can register with and see apartments for booking.

## disclaimer

This project was built to showcase many fullstack skills, rather than as the simple solution to this particular application problem.

## How to run the project

The project can be run manually or using docker,
first make sure you are on the root project folder. The projects runs on port 3000, so make sure no other processes are using it.

### Manual approach

First install all dependencies
```bash
npm install-all
```

Build and run the project
```bash
npm run start
```

Build and run the project For Windows
```bash
npm run start-win
```

### Docker approach

build the image

```bash
sudo docker build -t tenants-app .
```


Run the image
```bash
docker run --name t-app -p 3000:3000  -d tenants-app
```

## Project structure and description

The project contains two main folders which are
client and server. The client includes the application frontend and the server a small api that also serves the client files.

### Client

Is a React app consisting of a single page with many subcomponents. When running the app it will ask information related to searching for an apartment and will show available apartments at the end of the form.

### server

Is a express app deployed as a cluster that serves the client build and provides a small API.

### github folder

It's another folder that contains information about github workflows that validates the code and runs the tests.