import { useEffect, useState } from "react";
import { Child } from "../types/Child";

const ChildrenList = () => {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("children") || "[]");
    setChildren(stored);
  }, []);

  return (
    <section className="page-card">
      <h2 className="page-title">Lista e Femijeve</h2>
      <p className="page-subtitle">Te gjithe femijet e regjistruar ne EduCare.</p>

      {children.length === 0 ? (
        <p className="empty-state">Nuk ka femije te regjistruar ende.</p>
      ) : (
        <div className="children-grid">
          {children.map((child) => (
            <article key={child.id} className="child-card">
              <h3>{child.fullName}</h3>
              <p>Mosha: {child.age} vjec</p>
              <p>Prindi: {child.parentName}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ChildrenList;
