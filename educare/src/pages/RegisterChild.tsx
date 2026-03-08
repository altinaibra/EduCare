import { useState } from "react";
import { Child } from "../types/Child";
import { styles } from "../styles/RegisterChildStyles";

const RegisterChild = () => {
  const [child, setChild] = useState<Child>({
    id: 0,
    fullName: "",
    age: 0,
    parentName: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setChild((previous) => ({
      ...previous,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("children") || "[]");
    const newChild = {
      ...child,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      monthlyFee: 120
    };

    localStorage.setItem("children", JSON.stringify([...existing, newChild]));

    alert("Femija u regjistrua me sukses.");

    setChild({
      id: 0,
      fullName: "",
      age: 0,
      parentName: ""
    });
  };

  return (
    <section className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Regjistro Femije</h2>
      <p className={styles.pageSubtitle}>Ploteso te dhenat me poshte per regjistrim te shpejte.</p>

      <form onSubmit={handleSubmit} className={styles.kidForm}>
        <label htmlFor="fullName">Emri i plote</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="p.sh. Ardit Krasniqi"
          value={child.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Mosha</label>
        <input
          id="age"
          type="number"
          name="age"
          min={1}
          max={10}
          placeholder="p.sh. 4"
          value={child.age || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="parentName">Emri i prindit</label>
        <input
          id="parentName"
          type="text"
          name="parentName"
          placeholder="p.sh. Linda Krasniqi"
          value={child.parentName}
          onChange={handleChange}
          required
        />

        <button type="submit">Regjistro</button>
      </form>
    </section>
  );
};

export default RegisterChild;
