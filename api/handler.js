'use strict';

// const request = require('request');
const axios = require('axios');

// api settings (would normally store Key in .env)
const API_BASE = "https://public.leagueapps.io/v1/sites";
const API_KEY = "?la-api-key=a92be92ac86c78982837e6545f42b26a";
const API_ID = "6970";

module.exports.programs = async (event, context) => {

	console.log("event: ", event);

	let url = `${API_BASE}/${API_ID}/programs/current${API_KEY}`;
	let results = await axios.get(url).then(response => response.data);

	return {
			statusCode: 200,
			headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify({
					message: 'Yay for serverless',
					data: results,
			}),
	};
};

module.exports.programById = async (event) => {

	// let id = '61458';
	let id = event.pathParameters.id;
	let url = `${API_BASE}/${API_ID}/programs/${id}${API_KEY}`;
	let results = await axios.get(url).then(response => response.data);

	return {
			statusCode: 200,
			headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify({
					data: results,
			}),
	};
};
