import React, {Component} from "react";
import "./styles.css";
import "./css/PageMainPage.css";

import traduction from "./traduction";
import idPage from "./idPage";

import LanguageMenu from "./LanguageMenu";

import history from "./images/History.png";
import logoTM from "./images/Menu.png";

import boxFR from "./images/BOX_FR.png";
import boxEN from "./images/BOX_EN.png";
import boxCNS from "./images/BOX_CNS.png";
import boxCNT from "./images/BOX_CNT.png";
import boxKR from "./images/BOX_KR.png";
import boxDE from "./images/BOX_DE.png";
import boxHU from "./images/BOX_HU.png";
import boxIT from "./images/BOX_IT.png";
import boxES from "./images/BOX_ES.png";
import boxBR from "./images/BOX_BR.png";
import boxGR from "./images/BOX_GR.png";
import boxPL from "./images/BOX_PL.png";
import boxJP from "./images/BOX_JP.png";
import boxNL from "./images/BOX_NL.png";
import logoSM from "./images/logo_sm.png";
import home from "./images/Home.png";
import config from "./config";

const imgBox = [boxFR, boxEN, boxCNS, boxCNT, boxKR, boxDE, boxHU, boxIT, boxES, boxGR, boxBR, boxJP, boxPL, boxNL];

class PageMainPage extends Component {
    render() {
        let rules = traduction[this.props.language]["DOWNLOADRULES"];
        let paradox = traduction[this.props.language]["XPARADOX"];
        if (this.props.language == 11) { rules = ""; paradox = ""}
        return (
            <div className="mainTab">
                <img
                    className="mainPageImage"
                    src={imgBox[this.props.language]}
                />
                <div className="homePage">
                    <a
                        className="green button homeButton"
                        onClick={() => this.props.changePage(idPage["P_ADV"])}
                    >
                        {traduction[this.props.language]["QUICK"]}
                    </a>
                    <a
                        className="orange button homeButton"
                        onClick={() => this.props.changePage(idPage["P_CREATECHALLENGE"])}
                    >
                        {traduction[this.props.language]["CREATECHALLENGE"]}
                    </a>
                    <a
                        className="yellow button homeButton"
                        onClick={() => this.props.gameOfTheDay()}

                    >
                        {traduction[this.props.language]["DAiLYCHALLENGE"]}
                    </a>
                    <a
                        className="blue button homeButton"
                        onClick={() => this.props.changePage(idPage["P_SEARCH"])}

                    >
                        {traduction[this.props.language]["SEARCH"]}
                    </a>
                    <a
                        className="purple button homeButton"
                        onClick={() => this.props.changePage(idPage["P_HIST"])}
                    >
                        {traduction[this.props.language]["GAMEHISTORY"]}
                    </a>

                    <a
                        href={config["RULESLINK"] + "rules_" + traduction[this.props.language]["LANGCODE"] + ".pdf"}
                        target="_blank"
                    >
                        {rules} 
                    </a>
                    <a
                        href={config["CHALLENGEBANKLINK"] + "_" + traduction[this.props.language]["LANGCODE"] + ".pdf"}
                        target="_blank"
                    >
                        {traduction[this.props.language]["PRINTABLECHALLENGES"]}
                    </a>
                    <a
                        href={config["RULESLINK"] + traduction[this.props.language]["XPARADOX_FILENAME"]}
                        target="_blank"
                    >
                        {paradox}
                    </a>
                    <a
                        href={config["NOTESHEETLINK"]}
                        target="_blank"
                    >
                        {traduction[this.props.language]["SHEET"]}
                    </a>
                    <a
                        href={traduction[this.props.language]["ABOUTLINK"]}
                        target="_blank"
                    >
                        {traduction[this.props.language]["ABOUT"]}
                    </a>
                    <div className="separator"></div>

                    <div className="clearfix"></div>
                    <div className="socialLinks">
                        <a href="https://www.scorpionmasque.com" target="_blank">
                            <img className="logo_SM"
                                 src={logoSM}
                                 alt="Scorpion masqué"/>
                        </a>
                        <div className="social">
                            <a href="https://www.instagram.com/scorpionmasque/" target="_blank"
                               className="icofont-instagram"></a>
                            <a href="https://twitter.com/Scorpionmasque" target="_blank"
                               className="icofont-twitter"></a>
                            <a href="https://www.facebook.com/scorpionmasque" target="_blank"
                               className="icofont-facebook"></a>
                            <a href="https://www.youtube.com/user/LeScorpionmasque" target="_blank"
                               className="icofont-youtube"></a>
                        </div>

                        Copyright &copy; 2023 - Le Scorpion Masqué {console.log(this.props.language)}
                    </div>


                </div>
            </div>
        );
    }
}

export default PageMainPage;
