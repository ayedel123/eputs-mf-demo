import { FC } from "react";
import CommonErrorPage from "./CommonErrorPage";
import styles from "./CommonErrorPage.module.css";

interface ForbiddenPageProps {}

const ForbiddenPage: FC<ForbiddenPageProps> = () => {
  return (
    <>

      <CommonErrorPage
        url={"/"}
        children={
          <>
            <p className={styles.statusCode}>403</p>
            <p className={styles.title}>Доступ запрещен.</p>
            <p className={styles.subTitle}>Недостаточно прав для доступа к ресурсу.</p>
          </>
        }
      />
    </>
  );
};

export default ForbiddenPage;
