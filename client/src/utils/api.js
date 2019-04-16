import axios from 'axios';

// api settings (would normally store Key in .env)
const API_BASE = "https://e438muanz3.execute-api.us-east-1.amazonaws.com/dev";

function getPrograms() {
	const url = `${API_BASE}/current-programs`;
	return axios.get(url).then(response => {
		return response.data.data;
	});
}
function getProgramById(id) {
	const url = `${API_BASE}/program/${id}`;
	return axios.get(url).then(response => {
		return response.data.data;
	});
}

export { getPrograms, getProgramById };