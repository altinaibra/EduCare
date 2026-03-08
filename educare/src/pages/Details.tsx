import { styles } from "../styles/DetailsStyles";

const Details = () => {
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
    </section>
  );
};

export default Details;
