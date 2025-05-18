export interface JwtPayload {
    userId: string;
    roles?: string[];
    [key: string]: any;
}

export interface LoginBody {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
