import api from "./api";

export async function searchUsersRequest(requestData) {
	const { data } = await api.get("/user/search", { params: requestData });
	return data;
}

export async function signUpRequest({userName, password}) {
    const {data} = await api.post("/User/SignUp", {userName, password});
    return data;
}

export async function confirmEmailRequest({Token, NewPassword}) {
    const {data} = await api.post("/User/ConfirmEmail", {Token, NewPassword});
    return data;
}

export async function includeRoleRequest({Token, NewPassword}) {
    const {data} = await api.post("/User/IncludeRole", {Token, NewPassword});
    return data;
}