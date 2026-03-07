const Details = () => {
  return (
    <section className="page-card">
      <h2 className="page-title">Detajet e Cerdhes</h2>
      <p className="page-subtitle">Informacionet kryesore per prinderit dhe stafin.</p>

      <div className="detail-grid">
        <article className="detail-item">
          <span>Emri</span>
          <strong>EduCare</strong>
        </article>
        <article className="detail-item">
          <span>Adresa</span>
          <strong>Prishtine, Kosove</strong>
        </article>
        <article className="detail-item">
          <span>Orari</span>
          <strong>08:00 - 16:00</strong>
        </article>
        <article className="detail-item">
          <span>Kapaciteti</span>
          <strong>60 femije</strong>
        </article>
      </div>
    </section>
  );
};

export default Details;
