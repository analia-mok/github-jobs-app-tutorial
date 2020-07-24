/* eslint-disable */
const querystring = require('querystring');
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const params = querystring.stringify(event.queryStringParameters);
    const response = await fetch(`https://jobs.github.com/positions.json?${params}`, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ jobs: data, params })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ e: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
