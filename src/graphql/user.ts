import { gql, useLazyQuery } from "@apollo/client";
import { IUser } from "@src/types";

const USER = gql`
 query User {
  user {
    _id
    full_name
    email
  }
}
`;

export const useGetUser = () => useLazyQuery<{ user: IUser }>(USER);