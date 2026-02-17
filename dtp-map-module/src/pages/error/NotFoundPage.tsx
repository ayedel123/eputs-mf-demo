import React from "react";
import CommonErrorPage from "./CommonErrorPage";
import styles from "./CommonErrorPage.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <CommonErrorPage
      url={"/"}
      children={
        <>
          <p className={styles.statusCode}>404</p>
          <p className={styles.title}>Страница не найдена</p>
        </>
      }
    />
  );
};

export default NotFoundPage;
