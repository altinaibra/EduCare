import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { authApi, LoginType } from "../api";

type LoginProps = {
  onLoginSuccess: (token: string) => void;
};

type CountryCodeOption = {
  label: string;
  value: string;
};

const countryCodes: CountryCodeOption[] = [
  { label: "Kosove (+383)", value: "+383" },
  { label: "Shqiperi (+355)", value: "+355" },
];

const formatPhone = (rawValue: string) => {
  const digitsOnly = rawValue.replace(/\D/g, "").slice(0, 8);
  const first = digitsOnly.slice(0, 2);
  const second = digitsOnly.slice(2, 5);
  const third = digitsOnly.slice(5, 8);

  return [first, second, third].filter(Boolean).join("-");
};

const Login = ({ onLoginSuccess }: LoginProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [loginType, setLoginType] = useState<LoginType | null>(null);
  const [username, setUsername] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodes[0].value);
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [languageDropdown, setLanguageDropdown] = useState(false);

  const normalizedPhoneDigits = useMemo(
    () => telephone.replace(/\D/g, ""),
    [telephone]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!loginType) {
      setError(t("login.errors.chooseMethod"));
      return;
    }

    if (!password.trim()) {
      setError(t("login.errors.passwordRequired"));
      return;
    }

    if (loginType === "username" && !username.trim()) {
      setError(t("login.errors.usernameRequired"));
      return;
    }

    if (loginType === "telephone" && normalizedPhoneDigits.length !== 8) {
      setError(t("login.errors.phoneFormat"));
      return;
    }

    setIsSubmitting(true);

    try {
      const payload =
        loginType === "username"
          ? {
              loginType,
              username: username.trim().toLowerCase(),
              password: password.trim(),
            }
          : {
              loginType,
              telephone: `${countryCode}${normalizedPhoneDigits}`,
              password: password.trim(),
            };

      const response = await authApi.login(payload);
      onLoginSuccess(response.token);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(t("login.errors.failed"));
      console.error(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageDropdown(false);
  };

  return (
    <div className="auth-shell">

      {/* Language selector top right */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20
        }}
      >
        <button
          onClick={() => setLanguageDropdown(!languageDropdown)}
          style={{
            cursor: "pointer",
            border: "none",
            background: "transparent",
            fontWeight: 600
          }}
        >
          {i18n.language.toUpperCase()} ▼
        </button>

        {languageDropdown && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "#fff",
              borderRadius: 6,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              padding: "5px 0",
              minWidth: 80
            }}
          >
            <div
              style={{ padding: "6px 12px", cursor: "pointer" }}
              onClick={() => changeLanguage("al")}
            >
              🇦🇱 AL
            </div>

            <div
              style={{ padding: "6px 12px", cursor: "pointer" }}
              onClick={() => changeLanguage("en")}
            >
              🇬🇧 EN
            </div>
          </div>
        )}
      </div>

      <section className="auth-card">
        <h1>{t("login.title")}</h1>
        <p className="auth-subtitle">{t("login.subtitle")}</p>

        {!loginType && (
          <div className="login-choice-grid">
            <button
              type="button"
              className="choice-btn"
              onClick={() => setLoginType("username")}
            >
              {t("login.usernameButton")}
            </button>

            <button
              type="button"
              className="choice-btn"
              onClick={() => setLoginType("telephone")}
            >
              {t("login.phoneButton")}
            </button>
          </div>
        )}

        {loginType && (
          <form className="auth-form" onSubmit={handleSubmit}>
            {loginType === "username" && (
              <label>
                {t("login.username")}
                <input
                  type="text"
                  placeholder={t("login.usernamePlaceholder")}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
            )}

            {loginType === "telephone" && (
              <div className="phone-row">
                <label>
                  {t("login.countryCode")}
                  <select
                    value={countryCode}
                    onChange={(event) => setCountryCode(event.target.value)}
                  >
                    {countryCodes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  {t("login.phone")}
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="04x-xxx-xxx"
                    value={telephone}
                    onChange={(event) =>
                      setTelephone(formatPhone(event.target.value))
                    }
                  />
                </label>
              </div>
            )}

            <label>
              {t("login.password")}
              <div className="password-wrap">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder={t("login.passwordPlaceholder")}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="eye-btn"
                  aria-label={
                    isPasswordVisible
                      ? t("login.hidePassword")
                      : t("login.showPassword")
                  }
                  title={
                    isPasswordVisible
                      ? t("login.hidePassword")
                      : t("login.showPassword")
                  }
                  onClick={() =>
                    setIsPasswordVisible((previousValue) => !previousValue)
                  }
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("login.loggingIn") : t("login.loginButton")}
            </button>

            <div className="auth-actions">
              <button
                type="button"
                className="auth-back-btn"
                onClick={() => setLoginType(null)}
              >
                {t("login.back")}
              </button>

              <Link to="/forgot-password" className="auth-link-btn">
                {t("login.forgotPassword")}
              </Link>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Login;