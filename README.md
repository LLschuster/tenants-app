# Tenants app

## Description

An application form for tenants, so that they can register with and start booking apartments.

## disclaimer

This project was built to showcase many fullstack skills, rather than as the simple solution to this particular application problem.

## How to run the project

The project can be run manually or using docker,
first make sure you are on the root project folder.

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

