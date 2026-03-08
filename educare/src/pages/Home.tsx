import { useState } from "react";

const Home = () => {
  const [eventText, setEventText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles: File[] = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Event:", eventText);
    console.log("Files:", files);
  };

  return (
    <div className="page-wrap">
      {/* HERO CARD */}
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

      {/* EVENT CARD */}
      <section className="page-card" style={{ marginTop: "20px" }}>
        <span className="page-badge">Event</span>

        <h2 className="page-title">Event i ri</h2>

        <p className="page-subtitle">
          Shto një event për prindërit dhe fëmijët e çerdhes.
        </p>

        <form onSubmit={handleSubmit} className="kid-form">
          <label>Pershkrimi i eventit</label>

          <textarea
            value={eventText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEventText(e.target.value)
            }
            placeholder="Shkruaj event per prinderit dhe femijet..."
          />

          <label>Shto foto ose file</label>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />

          <button type="submit">
            Publiko Event
          </button>
        </form>

        {/* FILE PREVIEW */}
        {files.length > 0 && (
          <div className="children-grid" style={{ marginTop: "16px" }}>
            {files.map((file: File, i: number) => {
              const isImage = file.type.startsWith("image/");
              const url = URL.createObjectURL(file);

              return (
                <div key={i} className="child-card">
                  {isImage ? (
                    <img
                      src={url}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  ) : (
                    <p>{file.name}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;