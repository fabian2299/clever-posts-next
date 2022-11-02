import useUserContext from "@/hooks/useUserContext";
import Link from "next/link";
// import HeroImg from "../../public/assets/hero.jpg";

export default function Hero() {
  const { user } = useUserContext();

  return (
    <section className="hero">
      <h1 className="hero__heading">Welcome {user?.name}</h1>
      <div className="hero__bg">
        <div className="hero__content">
          <h2 className="hero__text">TreePost</h2>
          <p>
            Post your trees and get feedback from other tree lovers. Share your
            tree
          </p>

          <Link className="hero__link" href={"/posts"}>
            See Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
