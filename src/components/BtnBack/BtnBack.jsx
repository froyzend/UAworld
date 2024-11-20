import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import css from "./BtnBack.module.css";
import { useLocation } from "react-router-dom";
const BtnBack = () => {
  const location = useLocation();

  return (
    <Link to={location.state ?? "/movies"}>
      <button className={css.btnBack}>
        <AiOutlineArrowLeft />
        Back
      </button>
    </Link>
  );
};

export default BtnBack;
