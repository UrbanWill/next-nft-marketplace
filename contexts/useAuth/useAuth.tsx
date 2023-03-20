import { useRouter } from "next/router";
import {
  useContext,
  createContext,
  ReactNode,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";

// types
import { User, Role } from "../../generated/auth";

// hooks
import { useSigninWithWallet } from "../../hooks/mutations/temp_renamed_folder";

interface IAuthContext {
  handleAuthLogin: () => void;
  handleAuthLogout: () => void;
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialUser: User = {
  id: "",
  email: "",
  profilePicture: "",
  role: Role.User,
};

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const { handleLogin } = useSigninWithWallet();

  useEffect(() => {
    setIsLoading(true);
    const storageUser: User = {
      id: localStorage.getItem("id") ?? "",
      email: localStorage.getItem("email") ?? "",
      profilePicture: localStorage.getItem("profilePicture") ?? "",
      role: (localStorage.getItem("role") as Role) ?? Role.User,
    };
    setUser(storageUser);
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    setIsLoading(false);
  }, []);

  const handleAuthLogin = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    const { token, user } = (await handleLogin()) ?? {};
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");
      Object.keys(user).map((item) =>
        // @ts-ignore if the value is null, set the key to an empty string
        localStorage.setItem(item, user[item])
      );
      setIsAuthenticated(true);
      setUser(user);
      router.push("/activeItems");
    }
    setIsLoading(false);
  }, [handleLogin, router]);

  const handleAuthLogout = useCallback((): void => {
    localStorage.clear();
    setIsAuthenticated(false);
    router.push("/");
  }, [router]);

  // Make the provider update only when it should
  const memoedAuth = useMemo(
    () => ({
      user,
      handleAuthLogin,
      handleAuthLogout,
      isAuthenticated,
      isLoading,
    }),
    [user, handleAuthLogin, handleAuthLogout, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={memoedAuth}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
