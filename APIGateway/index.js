const express = require('express');
const httpProxy = require('express-http-proxy');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;
const {
  USERS_API_URL,
  PRODUCTS_API_URL,
} = require('./urls');

const userServiceProxy = httpProxy(USERS_API_URL);
const productsServiceProxy = httpProxy(PRODUCTS_API_URL);
app.use(bodyParser.json());


app.get('/', (req, res) => {

  var dados = [{
      lat: -25.470991,
      lon: -49.271036
    },
    {
      lat: -0.935586,
      lon: -49.635540
    },
    {
      lat: -2.485874,
      lon: -43.128493
    }
  ];

  res.send('api1 - Usuários \n api2 - Produtos ' + JSON.stringify(dados));
  
});



app.get('/users', (req, res, next) => userServiceProxy(req, res, next));
app.get('/products', (req, res, next) => productsServiceProxy(req, res, next));

app.listen(port, () => console.log(`Serviços sendo executados na porta ${port}!`));