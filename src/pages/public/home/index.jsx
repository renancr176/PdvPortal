import { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/elements/spinner";
import styles from "./index.module.css";
/*import CatalogsContainer from "../../../components/catalogsContainer";
import { searchCatalogsRequest } from "../../../services/catalog";*/

export default function Home() {
	const { t } = useTranslation("home");

	const [index, setIndex] = useState(0);
	const [catalogs, setCatalogs] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	useEffect(() => {
		// searchCatalogsRequest({ active: true, translate: true })
		// 	.then((response) => {
		// 		setCatalogs(response.data?.sort((a, b) => a.total - b.total));
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 	});
	}, []);

	return loading ? (
		<div className={styles.loading}>
			<Spinner />
		</div>
	) : (
		<>
			<Container fluid>
				<h1 className="text-center">Home</h1>
			</Container>
		</>
	);
}
