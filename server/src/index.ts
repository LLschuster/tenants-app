import express from 'express'
import path from 'path'
import bodyParser from 'body-parser';
import cluster from 'cluster'
import os from 'os'
import { AppartmentInfo, appartments } from './utils';

if (cluster.isPrimary){
  const cpuLen = os.cpus().length
  for (let i = 0; i < cpuLen; i++){
    cluster.fork()
  }
} else {
  const app = express();
  const PORT = process.env.PORT || 3000;
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  
  // parse application/json
  app.use(bodyParser.json())
  // Serve static files from the "public" directory in our case the client react app
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // setup CORS headers
  app.options("/*", function(req, res ){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });
  
  app.post("/v1/appartments", (req, res) => {
    const filters = req.body
    const appartmentResult: AppartmentInfo[] = appartments.filter(apart => {
      return apart.location === filters.location
    })
    
    res.setHeader("content-type", "Application/json")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(200)
    res.json(appartmentResult)
  })
  
  app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  })
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

