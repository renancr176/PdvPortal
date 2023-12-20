import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

import styles from "./index.module.css";
import { confirmEmailRequest } from "../../../../services/user";
import useAlert from "../../../../hooks/alert";

export default function ConfirmEmail() {
    const { token } = useParams();
	const { t } = useTranslation("confirmEmail");
	const navigate = useNavigate();
	const alert = useAlert();
    const [loading, setLoading] = useState(false);

	useEffect(() => {
        setLoading(true);
        confirmEmailRequest({
            token: token
        }).then(({data}) => {
            Swal.fire({
                html: t("success"),
                icon: "success",
                confirmButtonText: "Ok",
            }).then(() => {
                navigate("/auth/signin");
            });
        })
        .catch(err => {
            Swal.fire({
                html: `<p>${err.response.data.errors.map(e => e.message).join('</p><p>')}</p>`,
                icon: "error",
                confirmButtonText: "Ok",
            })
            .then(() => {
                navigate("/auth/signin");
            });
        });
    }, [token]);

	return (
		<div className={`${styles.loginContainer} position-relative`}>
			<div className={`${styles.leftBar}`}>
				<div className={`${styles.ball}`}></div>
				<img src="/imgs/Pdv-logo.svg" alt="Pdv" />
			</div>

			<div className="position-absolute top-50 start-50 translate-middle p-5">
                <FaSpinner className="animate-spin mx-auto align-middle" size={60}/>
			</div>
		</div>
	);
}
