import api from "./api";

export async function signInRequest({userName, password}) {
    const {data} = await api.post("/User/SignIn", {userName, password});
    return data;
}

export async function requestPasswordResetRequest(userName) {
    const {data} = await api.post("/User/PasswordReset", {userName});
    return data;
}

export async function resetPasswordRequest({Token, NewPassword}) {
    const {data} = await api.post("/User/ResetPassword", {Token, NewPassword});
    return data;
}

