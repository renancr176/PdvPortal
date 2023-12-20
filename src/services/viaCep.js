import axios from "axios";

const url = process.env.REACT_APP_VIA_CEP;

const api = axios.create({
	baseURL: url,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export default api;
