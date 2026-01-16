import { AuthContext } from "@/lib/auth-context";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of AuthContext");
  }
  return context;
}
