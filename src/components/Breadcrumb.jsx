import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import Home from "./Home";
import Reviews from "./Reviews";
import ReviewDetails from "./ReviewDetails";
import Categories from "./Categories";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/api/reviews", element: <Reviews /> },
  { path: "/api/categories", element: <Categories /> },
  { path: "/api/reviews/:review_id", element: <ReviewDetails /> },
];

export default function Breadcrumb() {
  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation();

  return (
    <nav>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <Link
          key={match.url}
          to={match.url}
          className={
            match.pathname === location.pathname
              ? "breadcrumb-active"
              : "breadcrumb-not-active"
          }
        >
          {breadcrumb} /
        </Link>
      ))}
    </nav>
  );
}
