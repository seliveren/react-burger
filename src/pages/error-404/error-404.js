import React from "react";
import Error404Styles from "./error-404.module.css";


const Error404Page = () => {
  return (
    <div className={Error404Styles.container}>
      <h1 className={Error404Styles.title}>ОШИБКА 404</h1>
      <p>В таком безграничном космическом пространстве мы не смогли найти то, что Вам нужно...</p>
    </div>
  );
}

export default Error404Page;