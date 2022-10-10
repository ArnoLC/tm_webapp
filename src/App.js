import React from "react";
import { createRoot } from "react-dom/client";
import Cookies from "universal-cookie";
import Moment from "moment";
import "./styles.css";
import "./css/App.css";

import traduction from "./traduction";
import config from "./config";
import idPage from "./idPage";

import PageMainPage from "./PageMainPage";
import PageAdvancedGame from "./PageAdvancedGame";
import PageLoading from "./PageLoading";
import PageAskSolo from "./PageAskSolo";
import PageInputCode from "./PageInputCode";
import PageInGame from "./PageInGame";
import PageShowSolution from "./PageShowSolution";
import PageError from "./PageError";
import PageHistorical from "./PageHistorical";
import PageSoloPlay from "./PageSoloPlay";
import clipboard from "./images/Clipboard.png";
import clipboardOK from "./images/ClipboardOK.png";
import shareImg from "./images/Share.jpg";
import shareImgOK from "./images/ShareOK.jpg";
import { createBrowserHistory } from 'history';
import PageMainPageOptionMenu from "./PageMainPageOptionMenu";
import logoTM from "./images/Menu.png";
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const cookies = new Cookies();

var userID = "";
var historicalGames;

class App extends React.Component {
  state = {
    landscapeMode: true,
    sizeImage: 1,
    sizeFont: 24,
    smallSizeFont: 15,
    page: 0,
    historicalData: false,
    language: 1,
    hashValue: "",
    codeValue: "",
    roundValue: "0",
    questionValue: "0",
    advancedSettings: [0, 0, 1, 1],
    actualClipboard: clipboard,
    wrongCode: false,
    youWin: false,
    winSolo: 0,
    soloPlay: false,
    askSolo: false,
    dailyText: "",
    socialTXT: "",
    finalTab: [],
    actualCopySocialImg: shareImg
  };

  game = {
    idPartie: 0,
    color: 0,
    hash: "",
    m: 0,
    d: 0,
    n: 4,
    code: "111",
    par: 0,
    fake: [0, 0, 0, 0, 0, 0],
    ind: [0, 0, 0, 0, 0, 0],
    law: [0, 0, 0, 0, 0, 0],
    crypt: [0, 0, 0, 0, 0, 0],
    sortedInd: [0, 0, 0, 0, 0, 0]
  };

  componentDidMount() {
    document.title = "Turing Machine";
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    userID = cookies.get("user");
    var hData = cookies.get("histData", { doNotParse: true });
    if (hData === undefined) {
      historicalGames = [];
    } else {
      historicalGames = JSON.parse(hData);
      if (historicalGames.length > 0) {
        this.setState({
          historicalData: true
        });
      }
    }
    if (userID === undefined) {
      userID = this.generateUUID();
    }
    var d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 24 * 400 * 1000);
    cookies.set("user", userID, {
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
      expires: d
    });
  }

  updateHistoricalData() {
    var d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 24 * 400 * 1000);
    cookies.set("histData", JSON.stringify(historicalGames), {
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
      expires: d
    });
    this.setState({
      historicalData: true
    });
  }

  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
    ) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  swapLanguage() {
    if (this.state.language === 0) {
      this.setState({ language: 1 });
    } else {
      this.setState({ language: 0 });
    }
  }

  resize() {
    var sizex = window.innerWidth;
    var sizey = window.innerHeight;
    if (sizex < sizey) {
      this.setState({
        sizeImage: Math.min(sizex * 0.8, sizey / 2),
        sizeFont: Math.max(sizex * 0.06, 20),
        smallSizeFont: Math.max(sizex * 0.04, 14),
        landscapeMode: sizex < sizey ? false : true
      });
    } else {
      this.setState({
        sizeImage: Math.min(sizex / 2, sizey - 130),
        sizeFont: Math.max(sizex * 0.03, 20),
        smallSizeFont: Math.max(sizex * 0.02, 14),
        landscapeMode: sizex < sizey ? false : true
      });
    }
  }

  copyToClipboard() {
    const el = document.createElement("textarea");
    el.value = "#" + this.game.hash;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({ actualClipboard: clipboardOK });
  }

  copySocialTXTToClipboard() {
    const el = document.createElement("textarea");
    el.value = this.state.socialTXT;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({ actualCopySocialImg: shareImgOK });
  }

  addGame(hash) {
    for (var i = 0; i < historicalGames.length; i++) {
      if (historicalGames[i] === hash) {
        historicalGames.splice(i, 1);
        i--;
      }
    }
    historicalGames = [hash].concat(historicalGames);
    if (historicalGames.length > 100) {
      historicalGames.pop();
    }
    this.updateHistoricalData();
  }

  shuffleIndFake() {
    for (var i = 0; i < this.game.n; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        var n = this.game.ind[i];
        this.game.ind[i] = this.game.fake[i];
        this.game.fake[i] = n;
      }
    }
  }

  sortInd() {
    this.game.sortedInd = [...this.game.ind];
    this.game.sortedInd.sort((a, b) => (a > b ? 1 : -1));
  }

  goCompetitive() {
    this.state.soloPlay = false;
    this.changePage(idPage["P_INGAME"]);
  }

  goSolo() {
    this.state.soloPlay = true;
    this.changePage(idPage["P_INGAME"]);
  }

  loadHistoricalGame(url) {
    this.state.askSolo = true;
    this.loadGame(url);
  }

  loadGame(url) {
    this.changePage(idPage["P_LOADING"]);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
      if (data.length === 0) {
        this.changePage(idPage["P_ERROR"]);
        return;
      }
      var jsonResponse = JSON.parse(data);
      if (jsonResponse["status"] === "ok") {
        this.addGame(jsonResponse["hash"]);
        this.game.idPartie = jsonResponse["idPartie"];
        this.game.color = jsonResponse["color"];
        this.game.hash = jsonResponse["hash"];
        this.game.m = jsonResponse["m"];
        this.game.d = jsonResponse["d"];
        this.game.n = jsonResponse["n"];
        this.game.code = jsonResponse["code"];
        this.game.par = jsonResponse["par"];
        this.game.fake = jsonResponse["fake"];
        this.game.ind = jsonResponse["ind"];
        this.game.law = jsonResponse["law"];
        this.game.crypt = jsonResponse["crypt"];
        if (this.game.m > 0) {
          this.game.par = Math.ceil(this.game.par * 1.5);
        }
        if (this.game.m == 1) {
          this.shuffleIndFake();
        }
        if (this.game.m == 2) {
          this.sortInd();
        }
        if (this.state.dailyText != "") {
          Moment.locale("en");
          this.state.dailyText = Moment.unix(jsonResponse["curDate"]).format(
              traduction[this.state.language]["DATEFORMAT"]
          );
        }
        if (this.state.askSolo) this.changePage(idPage["P_ASKSOLO"]);
        else this.changePage(idPage["P_INGAME"]);
      } else {
        this.changePage(idPage["P_ERROR"]);
      }
    });
    xhr.addEventListener("error", () => {
      this.changePage(idPage["P_ERROR"]);
    });
    xhr.addEventListener("abort", () => {
      this.changePage(idPage["P_ERROR"]);
    });
    xhr.open(
        "GET",
        "https://www.pcspace.com/tl/api.php?uuid=" + userID + "&" + url
    );
    xhr.send();
  }

  setData(win) {
    var solo = "0";
    if (this.state.soloPlay) solo = "1";
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
    });
    xhr.open(
        "GET",
        "https://www.pcspace.com/tl/recordSolo.php?i=" +
        this.game.idPartie +
        "&m=" +
        this.game.m +
        "&r=" +
        this.state.roundValue +
        "&q=" +
        this.state.questionValue +
        "&w=" +
        win +
        "&s=" +
        solo
    );
    xhr.send();
  }

  quickGame() {
    if (this.state.hashValue.length > 0) {
      this.state.askSolo = true;
      this.loadGame("h=" + this.state.hashValue.toUpperCase());
    } else {
      this.loadGame("s=0");
    }
  }

  gameOfTheDay() {
    this.state.askSolo = true;
    let time =
        Math.floor(new Date().getTime() / 1000.0) -
        new Date().getTimezoneOffset() * 60;
    this.state.dailyText = "_";
    this.loadGame("s=1&curDate=" + time);
  }

  hashGame() {
    this.state.askSolo = true;
    this.loadGame("h=" + this.state.hashValue.toUpperCase());
  }

  playAdvanced() {
    this.state.soloPlay = this.state.advancedSettings[0] === 1;
    this.loadGame(
        "m=" +
        this.state.advancedSettings[1] +
        "&d=" +
        this.state.advancedSettings[2] +
        "&n=" +
        (this.state.advancedSettings[3] + 4)
    );
  }

  changePage(newPage) {
    this.setState({
      page: newPage,
      actualClipboard: clipboard,
      hashValue: "",
      codeValue: "",
      roundValue: "0",
      questionValue: "0",
      wrongCode: false,
      youWin: false,
      winSolo: 0,
      actualCopySocialImg: shareImg
    });
    if (newPage === 0) {
      this.state.advancedSettings = [0, 0, 1, 1];
      this.state.soloPlay = false;
      this.state.askSolo = false;
      this.state.dailyText = "";
      this.state.socialTXT = "";
      this.state.finalTab = [];
    }
  }

  handleChange(value) {
    value = value.replace("#", "");
    value = value.replace(" ", "");
    this.setState({ hashValue: value });
  }

  handleChangeCode(value) {
    value = value.replace(" ", "");
    this.setState({ codeValue: value });
  }

  testCode() {
    if (this.state.codeValue == this.game.code) {
      this.changePage(idPage["P_SOLUTION"]);
      this.setState({ youWin: true });
      this.setData(2);
    } else {
      this.setState({ wrongCode: true });
      this.setData(0);
    }
  }

  testCodeSoloVictory(nbRounds, nbQuestions, socialTXT, finalTab) {
    this.state.roundValue = nbRounds;
    this.state.questionValue = nbQuestions;
    this.state.socialTXT = socialTXT;
    this.state.finalTab = finalTab;
    var roundMachine = Math.ceil(this.game.par / 3);
    var win = 0; // 0 : défaite, 1 : tie, 2 : victory
    if (this.state.roundValue < roundMachine) {
      win = 2;
      this.state.socialTXT =
          this.state.socialTXT + traduction[this.state.language]["SOCIALWIN"];
    } else {
      if (this.state.roundValue == roundMachine) {
        if (this.state.questionValue < this.game.par) {
          win = 2;
          this.state.socialTXT =
              this.state.socialTXT + traduction[this.state.language]["SOCIALWIN"];
        }
        if (this.state.questionValue == this.game.par) {
          win = 1;
          this.state.socialTXT =
              this.state.socialTXT + traduction[this.state.language]["SOCIALWIN"];
        }
      }
    }
    if (win === 0) {
      this.state.socialTXT =
          this.state.socialTXT + traduction[this.state.language]["SOCIALLOSE"];
    }
    this.changePage(idPage["P_SOLUTION"]);
    this.setState({ youWin: true, winSolo: win });
    this.setData(win);
  }

  testCodeSolo() {
    if (this.state.codeValue == this.game.code) {
      this.changePage(idPage["P_ASKSOLOPAGE2"]);
    } else {
      this.setState({ wrongCode: true });
    }
  }

  clickAdvanced(column, row) {
    this.state.advancedSettings[column] = row;
    this.forceUpdate();
  }

  render() {
    return (
        <div className="App">
          {this.state.page === idPage["P_MAIN"] ? (
              <div className="header">
                <PageMainPageOptionMenu
                    language={this.props.language}
                    swapLanguage={() => this.swapLanguage()}
                />
              </div>
          ) : (
              <div className="header">
                <img
                    style={{verticalAlign: "middle"}}
                    alt="logoTM"
                    src={logoTM}
                    width="auto"
                    height="25"
                    onClick={() => this.changePage(idPage["P_MAIN"])}
                />
                <div className="burgerMenu"> _<br/>_<br/>_</div>
              </div>
          )
          }

          {this.state.page === idPage["P_MAIN"] ? (
              <PageMainPage
                  currentPage={this.state.page}
                  changePage={(newPage) => this.changePage(newPage)}
                  historicalData={this.state.historicalData}
                  language={this.state.language}
                  quickGame={() => this.quickGame()}
                  gameOfTheDay={() => this.gameOfTheDay()}
                  handleChange={(value) => this.handleChange(value)}
                  swapLanguage={() => this.swapLanguage()}
              />
          ) : null}
          {this.state.page === idPage["P_ADV"] ? (
              <PageAdvancedGame
                  currentPage={this.state.page}
                  landscapeMode={this.state.landscapeMode}
                  language={this.state.language}
                  smallSizeFont={this.state.smallSizeFont}
                  changePage={(page) => this.changePage(page)}
                  advancedSettings={this.state.advancedSettings}
                  clickAdvanced={(column, row) => this.clickAdvanced(column, row)}
                  playAdvanced={() => this.playAdvanced()}
              />
          ) : null}
          {this.state.page === idPage["P_LOADING"] ? (
              <PageLoading language={this.state.language} />
          ) : null}
          {this.state.page === idPage["P_INGAME"] ||
          this.state.page === idPage["P_SHOWQUESTION"] ? (
              <PageInGame
                  currentPage={this.state.page}
                  landscapeMode={this.state.landscapeMode}
                  changePage={(newPage) => this.changePage(newPage)}
                  language={this.state.language}
                  game={this.game}
                  dailyText={this.state.dailyText}
                  actualClipboard={this.state.actualClipboard}
                  copyToClipboard={() => this.copyToClipboard()}
                  soloPlay={this.state.soloPlay}
                  page={this.state.page}
              />
          ) : null}
          {this.state.page === idPage["P_ERROR"] ? (
              <PageError
                  currentPage={this.state.page}
                  changePage={(newPage) => this.changePage(newPage)}
                  language={this.state.language}
              />
          ) : null}
          {this.state.page === idPage["P_HIST"] ? (
              <PageHistorical
                  currentPage={this.state.page}
                  changePage={(newPage) => this.changePage(newPage)}
                  historicalGames={historicalGames}
                  loadHistoricalGame={(value) => this.loadHistoricalGame(value)}
              />
          ) : null}
          {this.state.page === idPage["P_SOLUTION"] ? (
              <PageShowSolution
                  currentPage={this.state.page}
                  landscapeMode={this.state.landscapeMode}
                  changePage={(newPage) => this.changePage(newPage)}
                  language={this.state.language}
                  game={this.game}
                  actualClipboard={this.state.actualClipboard}
                  copyToClipboard={() => this.copyToClipboard()}
                  youWin={this.state.youWin}
                  winSolo={this.state.winSolo}
                  soloPlay={this.state.soloPlay}
                  dailyText={this.state.dailyText}
                  finalTab={this.state.finalTab}
                  actualCopySocialImg={this.state.actualCopySocialImg}
                  copySocialTXTToClipboard={() => this.copySocialTXTToClipboard()}
              />
          ) : null}
          {this.state.page === idPage["P_TESTCODE"] ? (
              <PageInputCode
                  currentPage={this.state.page}
                  language={this.state.language}
                  changePage={(newPage) => this.changePage(newPage)}
                  wrongCode={this.state.wrongCode}
                  handleChangeCode={(value) => this.handleChangeCode(value)}
                  testCode={() => this.testCode()}
              />
          ) : null}
          {this.state.page === idPage["P_ASKSOLO"] ? (
              <PageAskSolo
                  currentPage={this.state.page}
                  language={this.state.language}
                  goCompetitive={() => this.goCompetitive()}
                  goSolo={() => this.goSolo()}
              />
          ) : null}
          {this.state.page === idPage["P_ASKSOLOPAGE1"] ||
          this.state.page === idPage["P_ASKSOLOPAGE2"] ||
          this.state.page === idPage["P_ASKSOLOPAGE3"] ? (
              <PageSoloPlay
                  currentPage={this.state.page}
                  page={this.state.page}
                  language={this.state.language}
                  game={this.game}
                  codeValue={this.state.codeValue}
                  roundValue={this.state.roundValue}
                  questionValue={this.state.questionValue}
                  wrongCode={this.state.wrongCode}
                  handleChangeCode={(e) => this.handleChangeCode(e)}
                  testCodeSolo={() => this.testCodeSolo()}
                  testCodeSoloVictory={(nbRounds, nbQuestions, socialTXT, finalTab) =>
                      this.testCodeSoloVictory(
                          nbRounds,
                          nbQuestions,
                          socialTXT,
                          finalTab
                      )
                  }
                  changePage={(e) => this.changePage(e)}
                  dailyText={this.state.dailyText}
              />
          ) : null}
        </div>
    );
  }
}

export default App;
