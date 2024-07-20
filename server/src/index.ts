import express from 'express'
import path from 'path'
import bodyParser from 'body-parser';
import cluster from 'cluster'
import os from 'os'



type AppartmentInfo = {
  imageUrl: string
  name: string
  price: string
  location: string
}

if (cluster.isPrimary){
  const cpuLen = os.cpus().length
  for (let i = 0; i < cpuLen; i++){
    cluster.fork()
  }
} else {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const appartments: AppartmentInfo[] = [
    {
      imageUrl: '',
      name: 'Rent 1 Berlin',
      price: '200',
      location: 'Berlin'
    },
    {
      imageUrl: '',
      name: 'Rent 2 Berlin',
      price: '3500',
      location: 'Berlin'
    },
    {
      imageUrl: '',
      name: 'Rent 1 Hamburg',
      price: '2100',
      location: 'Hamburg'
    },
    {
      imageUrl: '',
      name: 'Rent 2 Hamburg',
      price: '1200',
      location: 'Hamburg'
    },
    {
      imageUrl: '',
      name: 'Rent 1 Frankfurt',
      price: '5000',
      location: 'Frankfurt'
    },
  ]
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  
  // parse application/json
  app.use(bodyParser.json())
  
  app.post("/v1/appartments", (req, res) => {
    const filters = req.body
    const appartmentResult: AppartmentInfo[] = appartments.filter(apart => {
      return apart.location === filters.location
    })
    
    res.setHeader("content-type", "Application/json")
    res.status(200)
    res.json(appartmentResult)
  })
  
  
  // Serve static files from the "public" directory in our case the client react app
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  })
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

