import api from "./viaCep";

export async function getAddressRequest(zipCode) {
	return await api.get(`/ws/${zipCode}/json/`);
}