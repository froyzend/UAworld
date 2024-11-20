import { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import css from "./BtnBack.module.css";

const BtnBack = () => {
  const location = useLocation();

  /*Сохраняем начальный путь или дефолтный*/
  const backLocationRef = useRef(location.state?.from || "/movies");

  return (
    /*Ссылка для перехода назад*/

    <Link to={backLocationRef.current} className={css.btnBack}>
      Back
    </Link>
  );
};

export default BtnBack;
