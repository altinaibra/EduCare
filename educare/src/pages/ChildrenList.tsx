import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Child } from "../types/Child";
import { styles } from "../styles/ChildrenListStyles";

const ChildrenList = () => {
  const { t } = useTranslation();
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("children") || "[]");
    setChildren(stored);
  }, []);

  return (
    <section className={styles.pageCard}>
      <h2 className={styles.pageTitle}>{t("children.title")}</h2>
      <p className={styles.pageSubtitle}>{t("children.subtitle")}</p>

      {children.length === 0 ? (
        <p className={styles.emptyState}>{t("children.empty")}</p>
      ) : (
        <div className={styles.childrenGrid}>
          {children.map((child) => (
            <article key={child.id} className={styles.childCard}>
              <h3>{child.fullName}</h3>
              <p>
                {t("children.age")}: {child.age} {t("children.years")}
              </p>
              <p>
                {t("children.parent")}: {child.parentName}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ChildrenList;