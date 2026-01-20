import errorMsg from "@/data/errorMessages.json";
import { SplashScreen } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { AppwriteException, ID, Models } from "react-native-appwrite";
import { account } from "../services/appwrite";

type AuthContextTypes = {
  isLoading: boolean;
  user: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<string | null>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const errorMessages = errorMsg;

export const AuthContext = createContext<AuthContextTypes | undefined>(
  undefined,
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
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
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
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
      if (error instanceof AppwriteException) {
        const specificError = errorMessages.find(
          (err) => err.type === error.type,
        );
        if (specificError) {
          console.log(`[${error.code}] ${error.type}`);
          return specificError.message;
        }
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
      if (error instanceof AppwriteException) {
        const specificError = errorMessages.find(
          (err) => err.type === error.type,
        );
        if (specificError) {
          console.log(`[${error.code}] ${error.type}`);
          return specificError.message;
        }

        // future idea: check error code. tell user the group that the error falls under
        // maybe instruct to contact support if it persists?
        // also maybe make this a pop up with link a link/premade email or something
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
