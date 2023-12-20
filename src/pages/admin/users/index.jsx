import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBan, FaTrash } from "react-icons/fa";
import FormAddUser from "../../../components/adminUser/formAdd";
import Spinner from "../../../components/elements/spinner";
import css from "./index.module.css";
import { useAuth } from "../../../hooks/auth";
import usePagination from "../../../hooks/pagination";
import PaginationMenu from "../../../components/paginationMenu";
import {
	Button,
	ButtonGroup,
	Col,
	Container,
	Row,
	Table,
} from "react-bootstrap";
import useAlert from "../../../hooks/alert";

import { searchUsersRequest, signUpRequest } from "../../../services/user";
import {RoleEnum} from '../../../enums/roleEnum';

export default function AdminUsers() {
	const { t } = useTranslation("adminUsers");
	const navigate = useNavigate();
	const { hasRoles } = useAuth();
	const {
		data: users,
		pageIndex,
		totalPages,
		nextPage,
		prevPage,
		setPage,
		isLoading,
		setFilter
	} = usePagination(searchUsersRequest, 10, {NotHaveRoles: RoleEnum.Customer});

	const { fireSuccess, fireRequestError } = useAlert();
	const handleSubmit = (values) => {
		values.UserName = values.email;
		signUpRequest(values)
			.then(({ data }) => {
				const message = t("success");
				fireSuccess(message);
				setFilter({NotHaveRoles: RoleEnum.Customer});
			})
			.catch((err) => {
				console.error(err);
				fireRequestError(err);
			});
	};

	return (
		<div className={css.wrapper}>
			<Container>
				<h2>{t("title")}</h2>
			</Container>
			<div className={css.addWrapper}>
				<Container>
					<div className={css.addHeader}>
						<h3>{t("add.title")}</h3>
					</div>
				</Container>
				<div className={css.addMain}>
					<Container>
						<FormAddUser
							form={{
								name: "",
								email: "",
								password:"",
								profile: "",
							}}
							onSubmit={handleSubmit}
						/>
					</Container>
				</div>
			</div>
			<Container>
				<Row>
					<Col className="d-flex justify-content-center">
						<PaginationMenu
							nPagesToShow={5}
							{...{ pageIndex, totalPages, nextPage, prevPage, setPage }}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table responsive striped>
							<thead>
								<tr>
									<th>{t("table.header.name")}</th>
									<th style={{ width: "15%" }}>{t("table.header.email")}</th>
									<th style={{ width: "15%" }}>{t("table.header.roles")}</th>
									<th style={{ width: "15%" }}>{t("table.header.status")}</th>
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									<Spinner />
								) : (
									users?.map((user) => (
										<tr key={user.id}>
											<td>
												<p>{user.name}</p>
											</td>
											<td>
												<p>{user.email}</p>
											</td>
											<td>
												{user.roles?.map((role) => (
													<p>{t(role)}</p>
												))}
											</td>
											<td>
												<p>{t(user.status)}</p>
											</td>
											<td>
												<ButtonGroup>
													{user.status === "Blocked" ? (
														<Button>
														{t("table.activate")}
														</Button>
													) : (
														<Button>
															<FaBan />
														</Button>
													)}
												</ButtonGroup>
											</td>
										</tr>
									))
								)}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
