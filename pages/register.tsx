import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUserContext } from "../context/user/UserProvider";

export default function Register() {
  const router = useRouter();
  const { login } = useUserContext();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      id: new Date().getTime(),
      name: user.name,
      email: user.email,
      password: user.password,
    });
    router.reload();
  };

  return (
    <div className="min-h-[80vh] grid place-content-center ">
      <form
        onSubmit={handleSubmit}
        className="border-2 p-10 flex flex-col gap-5 rounded-md shadow-md"
      >
        <div className=" flex flex-col gap-5">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
            className="border-2 outline-none p-2 rounded-md"
          />
        </div>

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
          Register
        </button>

        <Link href={"/login"} className="text-sm text-blue-500">
          Have an account? Login
        </Link>
      </form>
    </div>
  );
}
