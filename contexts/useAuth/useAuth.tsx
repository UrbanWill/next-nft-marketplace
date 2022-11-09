import { useContext, createContext, ReactNode } from "react";

// types
import { UserWithToken, Role } from "../../generated/graphql";

interface IAuthContext extends UserWithToken {}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const mockedUserWithToken: UserWithToken = {
    user: {
      id: "1",
      email: "demo@gmail.com",
      profilePicture: "",
      role: Role.User,
    },
    token: "token",
  };

  return (
    <AuthContext.Provider value={mockedUserWithToken}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
