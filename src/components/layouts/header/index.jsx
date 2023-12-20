import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavHashLink } from 'react-router-hash-link';
import { useTranslation } from "react-i18next";
import { BsCart3, BsPhone } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { RiUserLine, RiUserShared2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import CategoryDropdown from "../../navbarDropdown";

import styles from "./index.module.css";
import { scrollWithOffset } from "../../../utils/helpers";

export default function Header() {
	const [scrollY, setScrollY] = useState(0);
	const [borderStyle, setBorderStyle] = useState("none");

	const { t } = useTranslation("header");

	const { user, signOut, getUserAreaPath } = useContext(AuthContext);

	function handleScroll() {
		setScrollY(window.scrollY);
	}

	useEffect(() => {
		function watchScroll() {
			window.addEventListener("scroll", handleScroll);
		}
		watchScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	useEffect(() => {
		if (scrollY > 30) {
			setBorderStyle("1px solid var(--tcColor1)");
		} else {
			setBorderStyle("none");
		}
	}, [scrollY, setBorderStyle]);

	const activeUrl = "/";
	const loginUrl = "/auth/signIn";
	const logoutRedirect = "/";
	const accountUrl = getUserAreaPath();

	return (
		<>
			<div className={styles.headerTop}>
				<Container fluid="xxl" className={styles.headerTopCointainer}>
					<div>
						{/* 
						<Link to={activeUrl}>
							{t("headerTop.active")} <BsPhone />
						</Link>
						*/}
						{user ? (
							<span>
								<Link to={accountUrl}>
									{user.name ? user.name.split(" ").shift() : user.userName}
								</Link>
								,{" "}
								<Link
									to={logoutRedirect}
									onClick={signOut}
									style={{ marginLeft: 0 }}
								>
									{t("signOut")} <GoSignOut />
								</Link>
							</span>
						) : (
							<Link to={loginUrl}>
								{t("headerTop.login")} <RiUserShared2Line />
							</Link>
						)}
					</div>
				</Container>
			</div>
			<Navbar
				expand="lg"
				sticky="top"
				className={styles.headerMain}
				style={{ padding: "1.5rem 0", borderBottom: borderStyle }}
			>
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Brand as={Link} className={styles.logo} to="/">
						<img src="/imgs/Pdv-logo.svg" alt="Pdv" />
					</Navbar.Brand>
					<Navbar.Collapse
						className={styles.collapseArea}
						id="basic-navbar-nav"
					>
						<Nav className={styles.navCenter}>
							<NavHashLink to="/#offers" scroll={el => scrollWithOffset(el)}>
								{t("link.mobility")}
							</NavHashLink>

							{/* <Nav.Link
								href="https://www.Pdv.com/telefonia"
								>
								{t("link.telephone")}
							</Nav.Link> */}

							<CategoryDropdown title={t("telephone.title")}>
								<NavDropdown.Item
									href="https://www.Pdv.com/pabx-ip"
								>
									{t("telephone.pabx")}
								</NavDropdown.Item>
								<NavDropdown.Item
									href="https://www.Pdv.com/telefonia/e1"
								>
									{t("telephone.e1")}
								</NavDropdown.Item>
								<NavDropdown.Item
									href="https://www.Pdv.com/telefonia/sip-trunk"
								>
									{t("telephone.sip")}
								</NavDropdown.Item>
								<NavDropdown.Item
									href="https://conteudo.Pdv.com/lp0800-40xx"
								>
									{t("telephone.numbers")}
								</NavDropdown.Item>
							</CategoryDropdown>

							<CategoryDropdown title={t("internet.title")}>
								<NavDropdown.Item
									href="https://www.Pdv.com/internet/internet-dedicada"
								>
									{t("internet.internet")}
								</NavDropdown.Item>
								<NavDropdown.Item
									href="https://www.Pdv.com/internet/banda-larga"
								>
									{t("internet.band")}
								</NavDropdown.Item>
								<NavDropdown.Item
									href="https://www.Pdv.com/internet/wi-fi"
								>
									{t("internet.wifi")}
								</NavDropdown.Item>
							</CategoryDropdown>

							<CategoryDropdown title={t("link.solutions")}>
								<NavDropdown.Item
									href="https://www.Pdv.com/rede-e-infraestrutura"
								>
									{t("categorySolutions.network")}
								</NavDropdown.Item>
								<NavDropdown.Item
									href="https://www.Pdv.com/servicos-para-eventos"
								>
									{t("categorySolutions.events")}
								</NavDropdown.Item>
								<NavDropdown.Item
									href="https://www.Pdv.com/activtrak"
								>
									{t("categorySolutions.activTrak")}
								</NavDropdown.Item>
							</CategoryDropdown>
						</Nav>
						<Nav className={styles.navTopHiddenLinks}>
							<NavDropdown.Divider />
							<Nav.Link to={activeUrl}>
								{t("headerTop.active")} <BsPhone />
							</Nav.Link>
							{user ? (
								<>
									<Nav.Link href={accountUrl}>
										{user.name ? user.name.split(" ").shift() : user.userName} <RiUserLine />
									</Nav.Link>
									<Nav.Link href={logoutRedirect} onClick={signOut}>
										{t("signOut")} <GoSignOut />
									</Nav.Link>
								</>
							) : (
								<Nav.Link href={loginUrl}>
									{t("headerTop.login")} <RiUserShared2Line />
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
					{/* <Link to="cart" className={styles.linkIcon}>
						<BsCart3 size="1.5rem" />
					</Link> */}
				</Container>
			</Navbar>
		</>
	);
}
