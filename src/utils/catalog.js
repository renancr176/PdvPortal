export function calculateCatalogPrice(catalog, includeSms, quantity=1) {
	let catalogPrice = 0;
	if (catalog.smsOptional && !includeSms) {
		catalogPrice = catalog.total - getSmsPrice(catalog);
	} else {
		catalogPrice = catalog.total;
	}
	return catalogPrice * quantity;
}

export function getSmsPrice(catalog) {
	const smsProduct = catalog.products.find(
		(catalogProduct) => catalogProduct?.product?.type === "Sms"
	)?.product;
	const smsPrice = smsProduct?.unitPrice;
	return smsPrice ? smsPrice : 0;
}
