import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFoundPage = () => {
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
  }, [movieId]);

  const location = useLocation();
  const backLinkHref = location.state ?? "/home";

  return (
    <div>
      <h2>Page not found</h2>
      <Link to={backLinkHref}>Back</Link>;
    </div>
  );
};

export default NotFoundPage;
