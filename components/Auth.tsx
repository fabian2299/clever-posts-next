import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "../context/user/UserContext";

export default function Auth({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user?.auth) {
      router.push("/login");
    }
  }, [user, router]);

  return children;
}
