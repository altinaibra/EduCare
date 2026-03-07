import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authApi } from "../api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email eshte i detyrueshem.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.requestPasswordReset({ email: email.trim() });
      setIsCodeSent(true);
      setMessage(response.message || "Kodi u dergua ne email.");
    } catch (requestError) {
      setError("Nuk u dergua kodi. Kontrollo emailin ose API.");
      // eslint-disable-next-line no-console
      console.error(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!code.trim()) {
      setError("Kodi eshte i detyrueshem.");
      return;
    }

    if (!newPassword.trim()) {
      setError("Password i ri eshte i detyrueshem.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmimi i password-it nuk perputhet.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.verifyCodeAndResetPassword({
        email: email.trim(),
        code: code.trim(),
        newPassword: newPassword.trim(),
      });

      setMessage(response.message || "Password u ndryshua me sukses.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (requestError) {
      setError("Kodi nuk eshte valid ose kerkesa deshtoi.");
      // eslint-disable-next-line no-console
      console.error(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <h1>Forgot Password</h1>
        <p className="auth-subtitle">Shkruaj emailin per te marre kodin e verifikimit.</p>

        {!isCodeSent && (
          <form className="auth-form" onSubmit={handleSendCode}>
            <label>
              Email
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            {error && <p className="auth-error">{error}</p>}
            {message && <p className="auth-success">{message}</p>}

            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Duke derguar..." : "Dergo kodin"}
            </button>

            <Link to="/login" className="auth-link-btn">
              Kthehu te Login
            </Link>
          </form>
        )}

        {isCodeSent && (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <label>
              Kodi i verifikimit
              <input
                type="text"
                placeholder="Shkruaj kodin"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </label>

            <label>
              Password i ri
              <div className="password-wrap">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password i ri"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="eye-btn"
                  aria-label={isPasswordVisible ? "Fsheh password-in" : "Shfaq password-in"}
                  title={isPasswordVisible ? "Fsheh password-in" : "Shfaq password-in"}
                  onClick={() => setIsPasswordVisible((previousValue) => !previousValue)}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <label>
              Konfirmo Password-in
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Perserit password-in"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </label>

            {error && <p className="auth-error">{error}</p>}
            {message && <p className="auth-success">{message}</p>}

            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Duke verifikuar..." : "Verifiko dhe ndrysho password"}
            </button>

            <div className="auth-actions">
              <button type="button" className="auth-back-btn" onClick={() => setIsCodeSent(false)}>
                Back
              </button>
              <Link to="/login" className="auth-link-btn">
                Login
              </Link>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default ForgotPassword;
