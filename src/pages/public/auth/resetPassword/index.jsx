import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";

import styles from "./index.module.css";
import { resetPasswordRequest } from "../../../../services/auth";
import useAlert from "../../../../hooks/alert";

export default function ResetPassword() {
	const { t } = useTranslation("resetPassword");
	const alert = useAlert();
	const navigate = useNavigate();
	const { token } = useParams();

	const [state, setState] = useState({
		password: "",
		confirmPassword: "",
	});
	const [submiting, setSubmiting] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmiting(true);

		if (state.password !== state.confirmPassword)
			return alert.fireError(t("error.passwordNotMatch"));

		resetPasswordRequest({
			Token: atob(token),
			NewPassword: state.password,
		})
			.then((res) => res.data)
			.then((data) => alert.fireSuccess(null, data.message.value))
			.then(() => navigate("/auth/signin"))
			.catch((err) => alert.fireRequestError(err))
			.finally(() => setSubmiting(false));
	};

	const handleChange = (event) => {
		const { value, name, type, checked } = event.target;

		let newValue = type !== "checkbox" ? value : checked;

		setState((prevState) => ({ ...prevState, [name]: newValue }));
	};

	return (
		<div className={`${styles.loginContainer} position-relative`}>
			<div className={`${styles.leftBar}`}>
				<div className={`${styles.ball}`}></div>
				<img src="/imgs/Pdv-logo.svg" alt="Pdv" />
			</div>

			<div className="position-absolute top-50 start-50 translate-middle">
				<h3 className={`${styles.title} mb-3`}>{t("title")}</h3>
				<Form
					className={`${styles.formContainer} mb-0`}
					onSubmit={handleSubmit}
				>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>{t("labelPassword")}</Form.Label>
								<Form.Control
									required
									type="password"
									placeholder={t("phPassword")}
									name="password"
									value={state.password}
									onChange={handleChange}
									autoFocus
									minLength={8}
									isValid={state.password.length >= 8}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>{t("labelConfPassword")}</Form.Label>
								<Form.Control
									required
									type="password"
									placeholder={t("phConfPassword")}
									name="confirmPassword"
									value={state.confirmPassword}
									onChange={handleChange}
									minLength={8}
									isValid={
										state.password.length > 0 &&
										state.confirmPassword == state.password
									}
									isInvalid={
										state.password.length > 0 &&
										state.confirmPassword != state.password
									}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button type="submit" variant="danger" className="btn-tc-red">
								{t("labelBtnSubmit")}{" "}
								{submiting ? <FaSpinner className="animate-spin" /> : null}
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}
