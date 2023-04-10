import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const token = Cookies.get("JWTtoken");

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []); // empty dependency array ensures this only runs on the client-side

  if (token) {
    return <>{children}</>;
  }

  return null;
}
