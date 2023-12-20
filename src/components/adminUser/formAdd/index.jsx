import { Formik } from "formik";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import RequiredSpan from "../../elements/requiredSpan";
import { RoleEnum } from "../../../enums/roleEnum";

export default function FormAddUser({ form, onSubmit }) {
	const { t } = useTranslation("adminUsers");
	const schema = yup.object().shape({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().required(),
		profile: yup
			.string()
			.required()
			.oneOf(["", ...Object.keys(RoleEnum)]),
	});

	return (
		<Formik
			enableReinitialize={true}
			validationSchema={schema}
			onSubmit={(values, { resetForm }) => {
				onSubmit(values);
				resetForm();
		  	}}
			initialValues={form}
		>
			{({ handleSubmit, handleChange, values, touched, errors }) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Row className="mb-3">
						<Col md={7}>
							<Form.Group>
								<Form.Label>
									{t("formAdd.name")} <RequiredSpan />
								</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={values.name}
									onChange={handleChange}
									isValid={touched.name && !errors.name}
									isInvalid={touched.name && errors.name}
								/>
							</Form.Group>
						</Col>
						<Col md={5}>
							<Form.Group>
								<Form.Label>
									{t("formAdd.email")} <RequiredSpan />
								</Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={values.email}
									onChange={handleChange}
									isValid={touched.email && !errors.email}
									isInvalid={touched.email && errors.email}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col md={7}>
							<Form.Group>
								<Form.Label>
									{t("formAdd.password")} <RequiredSpan />
								</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={values.password}
									onChange={handleChange}
									isValid={touched.password && !errors.password}
									isInvalid={touched.password && errors.password}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col md={7}>
							<Form.Group>
								<Form.Label>
									{t("formAdd.profile")} <RequiredSpan />
								</Form.Label>
								<Form.Select
									name="profile"
									value={values.profile}
									onChange={(e) => {
										console.log(e.target.value);
										console.log(errors);
										handleChange(e);
									}}
									isInvalid={errors.profile}
								>
									<option value={""}>{t("formAdd.profilePlaceholder")}</option>
									{Object.keys(RoleEnum).filter(role => role !== RoleEnum.Customer).map((key) => (
										<option key={key} value={key}>
											{t(`${key}`)}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<div>
							<Button type="submit" variant="success">
								{t("formAdd.submit")}
							</Button>
						</div>
					</Row>
				</Form>
			)}
		</Formik>
	);
}
