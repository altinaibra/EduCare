import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  dropdownVisible: boolean;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LanguageSelector: React.FC<Props> = ({
  dropdownVisible,
  setDropdownVisible,
}) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "EN", flag: "/flags/en.png" },
    { code: "al", label: "AL", flag: "/flags/al.png" },
  ];

  const selectedLanguage =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setDropdownVisible(!dropdownVisible)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        <img src={selectedLanguage.flag} alt="" width={24} />
        {selectedLanguage.label}
      </button>

      {dropdownVisible && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "#fff",
            borderRadius: 6,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            padding: "6px 0",
            minWidth: 80,
          }}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setDropdownVisible(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              <img src={lang.flag} alt="" width={24} />
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;