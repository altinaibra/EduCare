import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Child } from "../types/Child";

const ChildrenList = () => {
  const { t } = useTranslation();
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("children") || "[]");
    setChildren(stored);
  }, []);

  return (
    <section className="page-card">
      <h2 className="page-title">{t("children.title")}</h2>
      <p className="page-subtitle">{t("children.subtitle")}</p>

      {children.length === 0 ? (
        <p className="empty-state">{t("children.empty")}</p>
      ) : (
        <div className="children-grid">
          {children.map((child) => (
            <article key={child.id} className="child-card">
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