import React, { useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import i18n from "../i18n";
// import './Landing.css'; // Import your custom CSS file for Landing component styles

const Landing = () => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const {t} = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage); // Update language when Redux store changes
  }, [selectedLanguage]);
  return (
    <div className="landing">
      <div className="title">
        <p id="title-style">{t("welcome")}</p>
        <p id="subtitle">
          {t("welcome2")}
        </p>
      </div>
        <SearchBox/>
    </div>
  );
};

export default Landing;
