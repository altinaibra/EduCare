import { useState, useEffect } from "react";
import { Child } from "../types/Child";
import { styles } from "../styles/RegisterChildStyles";
import { childrenApi, authApi, AgeGroup } from "../api";

const RegisterChild = () => {
  const [child, setChild] = useState<Child>({
    ID: 0,
    Name: "",
    Surname: "",
    ParentID: undefined,
    AgeID: undefined,
    ClassID: undefined,
    Status: true
  });

  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);

  useEffect(() => {
    const fetchAgeGroups = async () => {
      try {
        const groups = await authApi.getAgeGroups();
        setAgeGroups(groups);
      } catch (error) {
        console.error("Failed to fetch age groups", error);
      }
    };
    fetchAgeGroups();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    let newValue: any = value;
    
    if (type === "number" || name.endsWith("ID") || name === "ClassID") {
      newValue = value === "" ? undefined : Number(value);
    } else if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }

    setChild((previous) => ({
      ...previous,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await childrenApi.create({
        Name: child.Name,
        Surname: child.Surname,
        ParentID: child.ParentID,
        AgeID: child.AgeID,
        ClassID: child.ClassID,
        Status: child.Status
      });

      alert("Femija u regjistrua me sukses.");

      setChild({
        ID: 0,
        Name: "",
        Surname: "",
        ParentID: undefined,
        AgeID: undefined,
        ClassID: undefined,
        Status: true
      });
    } catch (error) {
      console.error("Failed to register child", error);
      alert("Gabim gjate regjistrimit te femijes.");
    }
  };

  return (
    <section className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Regjistro Femije</h2>
      <p className={styles.pageSubtitle}>Ploteso te dhenat me poshte per regjistrim te shpejte.</p>

      <form onSubmit={handleSubmit} className={styles.kidForm}>
        <label htmlFor="name">Emri</label>
        <input
          id="name"
          type="text"
          name="Name"
          placeholder="p.sh. Ardit"
          value={child.Name}
          onChange={handleChange}
          required
        />

        <label htmlFor="surname">Mbiemri</label>
        <input
          id="surname"
          type="text"
          name="Surname"
          placeholder="p.sh. Krasniqi"
          value={child.Surname}
          onChange={handleChange}
          required
        />

        <label htmlFor="parentId">ID e Prindit (opsionale)</label>
        <input
          id="parentId"
          type="number"
          name="ParentID"
          placeholder="p.sh. 1"
          value={child.ParentID || ""}
          onChange={handleChange}
        />

        <label htmlFor="ageId">Grupi i Moshes</label>
        <select
          id="ageId"
          name="AgeID"
          value={child.AgeID?.toString() || ""}
          onChange={handleChange}
          required
        >
          <option value="">Zgjidh grupin e moshes</option>
          {ageGroups.map((group) => (
            <option key={group.id} value={group.id.toString()}>
              {group.ageRange}
            </option>
          ))}
        </select>

        <label htmlFor="classId">ID e Klases (opsionale)</label>
        <input
          id="classId"
          type="number"
          name="ClassID"
          placeholder="p.sh. 1"
          value={child.ClassID || ""}
          onChange={handleChange}
        />

        <label htmlFor="status">
          <input
            id="status"
            type="checkbox"
            name="Status"
            checked={child.Status}
            onChange={handleChange}
          />
          Aktiv
        </label>

        <button type="submit">Regjistro</button>
      </form>
    </section>
  );
};

export default RegisterChild;
