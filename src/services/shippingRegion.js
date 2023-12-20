import api from "./api";

export async function getShippingRegionByZipCode(zipCode) {
	const { data } = await api.get(`/ShippingRegion/${zipCode}`);
	return data;
}
