import { IUser } from ".";

export interface ILoginResponse {
    login: {
        token: string
    }
}

export interface ISignupResponse {
    signup: {
        token: string
    }
}

export type LoginProps = {
    email: string;
    password: string;
}

export type SignupProps = {
    full_name: string;
    email: string;
    password: string;
}

export type AuthContextType = {
    login: (props: LoginProps) => Promise<void>
    signup: (props: SignupProps) => Promise<void>
    logout: () => Promise<void>
    isAuthenticated: boolean;
    user: IUser | null;
}