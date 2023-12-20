import { getShippingRegionByZipCode } from "../services/shippingRegion";
import { getAddressRequest } from "../services/zipCode";

export async function getShippingRegionAndPriceByZipCode(zipCode) {
	const addressResponse = await getAddressRequest(zipCode);
	if (!addressResponse || addressResponse == null) {
		return null;
	}
	const shippingRegionResponse = await getShippingRegionByZipCode(zipCode);
	if (
		!shippingRegionResponse.success ||
		shippingRegionResponse.data.length < 1
	) {
		return null;
	}
	const maxValueShippingRegion = shippingRegionResponse.data.reduce(
		(prev, current) =>
			prev.product.unitPrice > current.product.unitPrice ? prev : current
	);

	return maxValueShippingRegion && addressResponse
		? { region: maxValueShippingRegion, address: addressResponse }
		: null;
}
