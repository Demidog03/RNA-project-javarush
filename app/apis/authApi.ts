import axios from "axios";
import {LoginBody, LoginResponse, ProfileResponse} from "@/app/apis/authApi.types";

function login(body: LoginBody) {
    return axios.post<LoginResponse>(`http://10.0.2.2:3000/users/login`, body);
}

function getProfile(token: string) {
    return axios.get<ProfileResponse>(`http://10.0.2.2:3000/users/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

const authApi = { login, getProfile }

export default authApi;