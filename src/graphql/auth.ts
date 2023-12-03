import { gql, useMutation } from "@apollo/client";
import {  BaseInput, ILoginResponse, ISignupResponse, LoginProps, SignupProps } from "@src/types";

const LOGIN = gql`
  mutation Login($props: LoginInput!) {
  login(props: $props) {
    token
  }
}
`;

const SIGNUP = gql`
mutation Signup($props: SignupInput!) {
  signup(props: $props) {
    token
  }
}
`

export const useLogin = () => useMutation<ILoginResponse, BaseInput<LoginProps>>(LOGIN);
export const useSignup = () => useMutation<ISignupResponse, BaseInput<SignupProps>>(SIGNUP);