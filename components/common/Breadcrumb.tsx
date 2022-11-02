import Link from "next/link";
import { useRouter } from "next/router";

export default function Breadcrumb() {
  const router = useRouter();

  const generateBreadcrumbs = () => {
    const asPathWithoutQuery = router.asPath.split("?")[0];

    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const text = subpath;
      return { href, text };
    });

    return [{ href: "/", text: "Home" }, ...crumblist];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="breadcrumb">
      {breadcrumbs.map((crumb, index) => {
        const isLastCrumb = index === breadcrumbs.length - 1;

        return (
          <span key={crumb.href} className="breadcrumb__item">
            {isLastCrumb ? (
              <span className={` breadcrumb__link breadcrumb__link--disabled`}>
                {crumb.text}
              </span>
            ) : (
              <Link href={crumb.href} className={`breadcrumb__link`}>
                {crumb.text}
              </Link>
            )}
            {!isLastCrumb && <span> / </span>}
          </span>
        );
      })}
    </nav>
  );
}
