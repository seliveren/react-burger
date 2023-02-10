import React from "react";
import AppHeader from "../components/app-header/app-header";
import Error404Styles from "./error-404.module.css";

const Error404Page = () => {
  return (
    <>
      <AppHeader/>
      <div className={Error404Styles.container}>
        <h1 className={Error404Styles.title}>ОШИБКА 404</h1>
        <p>В таком безграничном космическом пространстве мы не смогли найти то, что Вам нужно...</p>
      </div>
    </>
  );
}

export default Error404Page;