import React, { useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import i18n from "../i18n";
import { Grid } from "@mui/material";
// import './Landing.css'; // Import your custom CSS file for Landing component styles

const Landing = () => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const {t} = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage); // Update language when Redux store changes
  }, [selectedLanguage]);
  return (
    // <div className="landing">
    //   <div className="title">
    //     <p id="title-style">{t("welcome")}</p>
    //     <p id="subtitle">
    //       {t("welcome2")}
    //     </p>
    //   </div>
    //     <SearchBox/>
    // </div>
    <div className="landing">
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <div className="title">
         <p id="title-style">{t("welcome")}</p>
         <p id="subtitle">
           {t("welcome2")}
         </p>
       </div>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}  display={'flex'} justifyContent={'center'} alignContent={'center'}>
          <SearchBox/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
