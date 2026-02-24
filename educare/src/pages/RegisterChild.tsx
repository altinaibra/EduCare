import { useState } from "react";
import { Child } from "../types/Child";

const RegisterChild = () => {
  const [child, setChild] = useState<Child>({
    id: 0,
    fullName: "",
    age: 0,
    parentName: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChild({ ...child, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("children") || "[]");
    child.id = Date.now();

    localStorage.setItem(
      "children",
      JSON.stringify([...existing, child])
    );

    alert("Fëmija u regjistrua me sukses ✅");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Regjistro Fëmijë</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Emri i plotë"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="number"
          name="age"
          placeholder="Mosha"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="parentName"
          placeholder="Emri i prindit"
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Regjistro</button>
      </form>
    </div>
  );
};

export default RegisterChild;