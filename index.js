const { Requester, Validator } = require("@chainlink/external-adapter");
const { head } = require("request");
require('dotenv').config()

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === "Error") return true;
  return false;
};



const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input);
  const jobRunID = validator.validated.id;

  const API_KEY = process.env.API_KEY;

  const from = input.data.from;
  const to = input.data.to;
  const passengers = input.data.passengers;
  const classFlight = input.data.classFlight;
  

  //const endpoint = validator.validated.data.endpoint || "price";
  //const url = `https://beta3.api.climatiq.io/travel/flights/BER&HAM&2&first`;
  const url = "https://beta3.api.climatiq.io/travel/flights";
  

  const params = {
    legs: [{
        from: from,
        to: to,
        passengers: parseInt(passengers),
        classFlight: classFlight,
      }]    
  };

  const headers = {
    Authorization: `Bearer ${API_KEY}`
  }

  const config = {
    method: 'post',
    url: url,
    headers,
    data: {
        legs: [{
                from: from,
                to: to,
                passengers: parseInt(passengers),
                class: classFlight
            }]
    }
  };

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then((response) => {
      // It's common practice to store the desired value at the top-level
      // result key. This allows different adapters to be compatible with
      // one another.
      //response.data.result = Requester.validateResultNumber(response.data, [
      //  tsyms,
      //]);
      /*
      if(response.data.co2e){
        response.data.co2e = parseInt(response.data.co2e)
      } 
      */     
      callback(response.status, Requester.success(jobRunID, response));
    })
    .catch((error) => {
      callback(500, Requester.errored(jobRunID, error));
    });
};

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
};

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    });
  });
};

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;