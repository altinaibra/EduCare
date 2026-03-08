import { useEffect, useState } from "react";
import { Child } from "../types/Child";
import { styles } from "../styles/DetailsStyles";
import { authApi, AgeGroup } from "../api";

const Details = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("children") || "[]");
    setChildren(stored);
  }, []);

  useEffect(() => {
    authApi.getAgeGroups().then(setAgeGroups).catch(console.error);
  }, []);

  return (
    <section className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Detajet e Cerdhes</h2>
      <p className={styles.pageSubtitle}>Informacionet kryesore per prinderit dhe stafin.</p>

      <div className={styles.detailGrid}>
        <article className={styles.detailItem}>
          <span>Emri</span>
          <strong>EduCare</strong>
        </article>
        <article className={styles.detailItem}>
          <span>Adresa</span>
          <strong>Prishtine, Kosove</strong>
        </article>
        <article className={styles.detailItem}>
          <span>Orari</span>
          <strong>08:00 - 16:00</strong>
        </article>
        <article className={styles.detailItem}>
          <span>Kapaciteti</span>
          <strong>60 femije</strong>
        </article>
      </div>

      <h3 style={{ marginTop: "2rem", marginBottom: "1rem", color: "#19352d", fontSize: "1.5rem" }}>
        Femijet sipas Grupmoshave
      </h3>

      <div className={styles.detailGrid}>
        {ageGroups.map((group) => {
          // compute number of children in this range locally
          const [min, max] = group.ageRange.split("-").map((s) => parseInt(s));
          const count = children.filter(c => c.age >= min && c.age <= max).length;

          return (
            <article key={group.id} className={styles.detailItem}>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong style={{ fontSize: "1.1rem" }}>{group.ageRange}</strong>
              </div>
              <div style={{ fontSize: "0.9rem", color: "#4e7164" }}>
                <div>Fëmijë: {count}</div>
                <div>Klasa: {group.numberOfClasses}</div>
                <div>Edukatore: {group.educatorName}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Details;
