import api from "./api";

export async function searchCatalogsRequest(requestData) {
	const { data } = await api.get("/catalog/search", { params: requestData });
	return data;
}

export async function getCatalog(id, translate = false) {
	const { data } = await api.get(`/catalog/${id}`, { params: {translate: translate}});
	return data;
}

export async function addCatalogRequest(requestData) {
	const { data } = await api.post("/catalog", requestData);
	return data;
}

export async function editCatalogRequest(requestData) {
	const { data } = await api.put("/catalog", requestData);
	return data;
}

export async function getLanguages() {
	const { data } = await api.get(`/catalog/Languages`);
	return data;
}