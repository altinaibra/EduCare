import { useEffect, useState } from "react";
import { Child } from "../types/Child";

const ChildrenList = () => {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("children") || "[]");
    setChildren(stored);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista e Fëmijëve të Regjistruar</h2>

      {children.length === 0 ? (
        <p>Nuk ka fëmijë të regjistruar.</p>
      ) : (
        <ul>
          {children.map((child) => (
            <li key={child.id}>
              {child.fullName} - {child.age} vjeç - Prindi: {child.parentName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChildrenList;