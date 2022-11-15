const { Requester, Validator } = require("@chainlink/external-adapter");
const { head } = require("request");
require("dotenv").config();

const customError = (data) => {
  if (data.Response === "Error") return true;
  return false;
};

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  //const validator = new Validator(callback, input);
  const jobRunID = input.data.id;

  const API_KEY = process.env.API_KEY;

  const from = input.data.from;
  const to = input.data.to;
  const passengers = input.data.passengers;
  const classFlight = input.data.classFlight;

  const url = process.env.API_ENDPOINT;

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
  };

  const config = {
    method: "post",
    url: url,
    headers,
    data: {
      legs: [
        {
          from: from,
          to: to,
          passengers: parseInt(passengers),
          class: classFlight,
        },
      ],
    },
  };

  Requester.request(config, customError)
    .then((response) => {
      // Modificación para parsear el valor de decimal a Integer
      if(response.data.co2e){
        response.data.co2e = parseInt(response.data.co2e)
      }  
      callback(response.status, Requester.success(jobRunID, response));
    })
    .catch((error) => {
      callback(500, Requester.errored(jobRunID, error));
    });
};

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
};

exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    });
  });
};

module.exports.createRequest = createRequest;
