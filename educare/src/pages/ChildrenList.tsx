import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { childrenApi, ChildrenDto } from "../api";
import { styles } from "../styles/ChildrenListStyles";

const ChildrenList = () => {
  const { t } = useTranslation();
  const [children, setChildren] = useState<ChildrenDto[]>([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const data = await childrenApi.getAll();
        setChildren(data);
      } catch (error) {
        console.error("Failed to fetch children", error);
      }
    };
    fetchChildren();
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
            <article key={child.ID} className={styles.childCard}>
              <h3>{child.Name} {child.Surname}</h3>
              <p>
                Status: {child.Status ? "Active" : "Inactive"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ChildrenList;