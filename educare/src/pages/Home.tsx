const Home = () => {
  return (
    <section className="page-card">
      <span className="page-badge">Cerdhe moderne</span>
      <h1 className="page-title">Miresevini ne EduCare</h1>
      <p className="page-subtitle">
        Nje ambient i ngrohte, i sigurt dhe kreativ per menaxhimin profesional te femijeve.
      </p>

      <div className="feature-grid">
        <article className="feature-card">
          <h3>Kujdes i sigurt</h3>
          <p>Te dhena te qarta per cdo femije dhe prind.</p>
        </article>
        <article className="feature-card">
          <h3>Komunikim i thjeshte</h3>
          <p>Regjistrim i shpejte dhe informacion i organizuar.</p>
        </article>
        <article className="feature-card">
          <h3>Rritje me gezim</h3>
          <p>Dizajn i embel per staf, prinder dhe perdorim te lehte.</p>
        </article>
      </div>
    </section>
  );
};

export default Home;
