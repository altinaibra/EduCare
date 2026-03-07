import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  { label: "Maqedoni (+389)", value: "+389" },
  { label: "Gjermani (+49)", value: "+49" },
  { label: "Zvicerr (+41)", value: "+41" },
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
  const [loginType, setLoginType] = useState<LoginType | null>(null);
  const [username, setUsername] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodes[0].value);
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const normalizedPhoneDigits = useMemo(
    () => telephone.replace(/\D/g, ""),
    [telephone],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!loginType) {
      setError("Zgjedh menyren e login-it.");
      return;
    }

    if (!password.trim()) {
      setError("Passwordi eshte i detyrueshem.");
      return;
    }

    if (loginType === "username" && !username.trim()) {
      setError("Username eshte i detyrueshem.");
      return;
    }

    if (loginType === "telephone" && normalizedPhoneDigits.length !== 8) {
      setError("Nr telefonit duhet te jete ne formatin 4x-xxx-xxx.");
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
      setError("Login deshtoi. Kontrollo kredencialet ose lidhjen me API.");
      // eslint-disable-next-line no-console
      console.error(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <h1>Login</h1>
        <p className="auth-subtitle">Hyr me username ose me numer telefoni.</p>

        {!loginType && (
          <div className="login-choice-grid">
            <button
              type="button"
              className="choice-btn"
              onClick={() => setLoginType("username")}
            >
              Login me Username
            </button>
            <button
              type="button"
              className="choice-btn"
              onClick={() => setLoginType("telephone")}
            >
              Login me Nr Telefonit
            </button>
          </div>
        )}

        {loginType && (
          <form className="auth-form" onSubmit={handleSubmit}>
            {loginType === "username" && (
              <label>
                Username
                <input
                  type="text"
                  placeholder="Shkruaj username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
            )}

            {loginType === "telephone" && (
              <div className="phone-row">
                <label>
                  Country Code
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
                  Nr Telefonit
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
              Password
              <div className="password-wrap">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Shkruaj password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="eye-btn"
                  aria-label={
                    isPasswordVisible
                      ? "Fsheh password-in"
                      : "Shfaq password-in"
                  }
                  title={
                    isPasswordVisible
                      ? "Fsheh password-in"
                      : "Shfaq password-in"
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
              {isSubmitting ? "Duke u kycur..." : "Login"}
            </button>

            <div className="auth-actions">
              <button
                type="button"
                className="auth-back-btn"
                onClick={() => setLoginType(null)}
              >
                Back
              </button>
              <Link to="/forgot-password" className="auth-link-btn">
                Forgot password?
              </Link>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Login;
