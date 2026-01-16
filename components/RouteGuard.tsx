import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const isAuthScreen = segments[0] === "auth";

    if (!isAuthScreen && !user && !isLoading) {
      setTimeout(() => router.replace("/auth"), 0);
    } else if (isAuthScreen && user && !isLoading) {
      router.replace("/");
    }
  }, [user, segments, isLoading]);

  return <>{children}</>;
}
