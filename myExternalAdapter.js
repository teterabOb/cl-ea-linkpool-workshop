let request = require('request');

exports.myExternalAdapter = (req, res) => {
    const url = "https://beta3.api.climatiq.io/travel/flights"

    const from = req.params.from;
    const to = req.params.to;
    const passengers = req.params.passengers;
    const flightClass= req.params.class;

    let requestObj = {
        legs: [{
                from: from,
                to: to,
                passengers: passengers,
                class: flightClass
            }]
    };

    let headerObj = {
        "API_KEY" : "MK5192247KMA51Q2V70Q0KR6SG16"
    };

    let options = {
        url: url,
        headers: headerObj,
        qs: requestObj,
        json: true
    };

    request(options, (error, response, body) => {
        if(error || response.statusCode >= 400){
            let errorData = {
                jobRunID: req.body.id,
                status: "errored",
                error: body
            };
            res.status(response.statusCode).send(errorData);
        }else{
            let returnData = {
                jobRunID: req.body.id,
                data: body
            };
            res.status(response.statusCode).send(returnData);
        }
    });
}

