export interface LoginBody {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface ProfileResponse {
    id: string;
    name: string;
    email: string;
}