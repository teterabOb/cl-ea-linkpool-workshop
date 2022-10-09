// request example
// http://localhost:8080/api/flights/BER&HAM&2&first
const axios = require('axios');
require('dotenv').config()
const express = require("express");
const app = express();

app.use(express.json());

const students = [
  { id: 1, name: "Jorge", age: 20, enroll: true },
  { id: 2, name: "Matias", age: 33, enroll: true },
  { id: 3, name: "Alvaro", age: 30, enroll: false },
];

app.get('/', (req, res) => {
    res.send('Node JS api');
});

app.get('/api/students', (req, res) => {
    res.send(students)
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.statusCode(404).send('Estudiante no encontrado');
    else res.send(student);
});

// Testing Axios
app.get('/api/search', (req, res) => {
    let url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD"
    //let query = req.query.queryStr;
    
    axios({
        method: 'get',
        url
    })
    .then((response) => {
        res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    })
});

// Solicitud con parametros
app.get('/api/flights/:from&:to&:passengers&:class', (req, res) => {
    let url = "https://beta3.api.climatiq.io/travel/flights"

    let from = req.params.from;
    let to = req.params.to;
    let passengers = req.params.passengers;
    let flightClass= req.params.class;

    console.log(from)
    
    axios({
        method: 'post',
        url: url,
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`
        },
        data: {
            legs: [
                {
                    "from": from, //"BER",
                    "to": to, //"HAM",
                    "passengers": parseInt(passengers), //2,
                    "class": flightClass //"first"
                }
            ]
        }
    })
    .then((response) => {
        res.send(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
        console.log(error);
    })
});

// Solicitud sin parametros
app.get('/api/flightsnoparam', (req, res) => {
    let url = "https://beta3.api.climatiq.io/travel/flights"
    
    axios({
        method: 'post',
        url: url,
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`
        },
        data: {
            legs: [
                {
                    "from": "BER",
                    "to": "HAM",
                    "passengers": 2,
                    "class": "first"
                }
            ]
        }
    })
    .then((response) => {
        res.send(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
        console.log(error);
    })
});


const port = process.env.port || 8080;
app.listen(port, () => console.log(`Esuchando en puerto ${port} ...`));