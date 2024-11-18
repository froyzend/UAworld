import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import css from "./BtnBack.module.css";
const BtnBack = () => {
  return (
    <Link to="/">
      <button className={css.btnBack}>
        <AiOutlineArrowLeft />
        Back
      </button>
    </Link>
  );
};

export default BtnBack;
