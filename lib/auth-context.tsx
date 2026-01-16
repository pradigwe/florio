// create context, variables used
// login, register, isloading, session, sign out

import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

// create context

// create AuthProvider
// define the context variables
// create login async function

type AuthContextTypes = {
  isLoading: boolean;
  user: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<string | null>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<string | null>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession({
        email,
        password,
      });
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occured during sign in";
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      await login(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occured during sign up";
    }
  };

  const signOut = async () => {
    try {
      const session = await account.deleteSession({ sessionId: "current" });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext value={{ isLoading, user, login, register, signOut }}>
      {children}
    </AuthContext>
  );
}
