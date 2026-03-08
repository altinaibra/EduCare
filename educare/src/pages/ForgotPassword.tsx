import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { authApi } from "../api";
import { styles } from "../styles/ForgotPasswordStyles";

const ForgotPassword = () => {
  const { t } = useTranslation();
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
      setError(t("auth.emailRequired"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.requestPasswordReset({ email: email.trim() });
      setIsCodeSent(true);
      setMessage(response.message || t("auth.codeSent"));
    } catch (requestError) {
      setError(t("auth.codeSendError"));
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
      setError(t("auth.codeRequired"));
      return;
    }

    if (!newPassword.trim()) {
      setError(t("auth.newPasswordRequired"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.verifyCodeAndResetPassword({
        email: email.trim(),
        code: code.trim(),
        newPassword: newPassword.trim(),
      });

      setMessage(response.message || t("auth.passwordResetSuccess"));
      setTimeout(() => navigate("/login"), 1000);
    } catch (requestError) {
      setError(t("auth.invalidCode"));
      console.error(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.authShell}>
      <section className={styles.authCard}>
        <h1>{t("auth.forgotPassword")}</h1>
        <p className={styles.authSubtitle}>
          {t("auth.enterEmailForCode")}
        </p>

        {!isCodeSent && (
          <form className={styles.authForm} onSubmit={handleSendCode}>
            <label>
              {t("auth.email")}
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            {error && <p className={styles.authError}>{error}</p>}
            {message && <p className={styles.authSuccess}>{message}</p>}

            <button type="submit" className={styles.authSubmitButton} disabled={isSubmitting}>
              {isSubmitting ? t("auth.sending") : t("auth.sendCode")}
            </button>

            <Link to="/login" className={styles.authLinkButton}>
              {t("auth.backToLogin")}
            </Link>
          </form>
        )}

        {isCodeSent && (
          <form className={styles.authForm} onSubmit={handleResetPassword}>
            <label>
              {t("auth.verificationCode")}
              <input
                type="text"
                placeholder={t("auth.enterCode")}
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </label>

            <label>
              {t("auth.newPassword")}
              <div className={styles.passwordWrap}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder={t("auth.newPassword")}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  aria-label={
                    isPasswordVisible
                      ? t("auth.hidePassword")
                      : t("auth.showPassword")
                  }
                  title={
                    isPasswordVisible
                      ? t("auth.hidePassword")
                      : t("auth.showPassword")
                  }
                  onClick={() =>
                    setIsPasswordVisible((previousValue) => !previousValue)
                  }
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <label>
              {t("auth.confirmPassword")}
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={t("auth.confirmPassword")}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </label>

            {error && <p className={styles.authError}>{error}</p>}
            {message && <p className={styles.authSuccess}>{message}</p>}

            <button type="submit" className={styles.authSubmitButton} disabled={isSubmitting}>
              {isSubmitting
                ? t("auth.verifying")
                : t("auth.verifyAndReset")}
            </button>

            <div className={styles.authActions}>
              <button
                type="button"
                className={styles.authBackButton}
                onClick={() => setIsCodeSent(false)}
              >
                {t("common.back")}
              </button>

              <Link to="/login" className={styles.authLinkButton}>
                {t("auth.login")}
              </Link>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default ForgotPassword;