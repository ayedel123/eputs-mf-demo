import React from "react";
import CommonErrorPage from "./CommonErrorPage";
import styles from "./CommonErrorPage.module.css";

interface ErrorBoundaryProps {
  err?: React.ReactNode;
  info?: React.ErrorInfo;
}

const ErrorPage: React.FC<ErrorBoundaryProps> = (err, info) => {
  console.error(err);
  console.error(info);

  return (
    <CommonErrorPage
      url={window.location.href}
      children={
        <>
          <p className={styles.statusCode}>500</p>
          <p className={styles.title}>Произошла непредвиденная ошибка</p>
        </>
      }
    />
  );
};

export default ErrorPage;
