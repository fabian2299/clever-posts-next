import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../context/user/UserContext";

export default function Login() {
  const router = useRouter();
  const { login, user: userContext } = useUserContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      id: new Date().getTime(),
      auth: true,
      name: "John Doe",
      email: user.email,
      password: user.password,
    });

    router.reload();
  };

  useEffect(() => {
    if (userContext?.auth) {
      router.push("/");
    }
  }, [userContext?.auth, router]);

  if (userContext?.auth) return null;

  return (
    <div className="min-h-[80vh] grid place-content-center ">
      <form
        onSubmit={handleSubmit}
        className="border-2 p-10 flex flex-col gap-5 rounded-md shadow-md"
      >
        <div className=" flex flex-col gap-5">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            className="border-2 outline-none p-2 rounded-md"
          />
        </div>

        <div className=" flex flex-col gap-5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            className="border-2 outline-none p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className=" px-4 py-2 bg-blue-600 w-fit text-white rounded-md mx-auto"
        >
          Login
        </button>

        <Link href={"/register"} className="text-sm text-blue-500">
          Not a member? Register
        </Link>
      </form>
    </div>
  );
}
