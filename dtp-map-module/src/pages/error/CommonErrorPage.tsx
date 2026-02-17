import React, { useEffect, useState } from "react";
import styles from "./CommonErrorPage.module.css";

interface ForbiddenPageProps {
  url?: string;
  children?: React.ReactElement;
}

const CommonErrorPage: React.FC<ForbiddenPageProps> = ({ url = window.location.href, children }) => {
  const [timeLeft, setTimeLeft] = useState<number>(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [url]);

  const handleManualRefresh = (): void => {
    window.location.href = url;
  };

  return (
    <div className={styles.commonErrorContainer}>
      {children}
      <p className={styles.subTitle}>
        Через {timeLeft} секунд страница обновится, либо обновите{" "}
        <button className={styles.refreshLink} onClick={handleManualRefresh}>
          сейчас
        </button>
      </p>
    </div>
  );
};

export default CommonErrorPage;
