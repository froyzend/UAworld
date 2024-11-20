import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import css from "./BtnBack.module.css";

const BtnBack = () => {
  const location = useLocation();

  const backTo = location.state?.from || "/movies";

  return (
    <Link to={backTo}>
      <button className={css.btnBack}>
        <AiOutlineArrowLeft />
        Back
      </button>
    </Link>
  );
};

export default BtnBack;
