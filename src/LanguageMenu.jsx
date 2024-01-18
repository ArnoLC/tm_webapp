import {Component} from "react";
import "./styles.css";
import "./css/LanguageMenu.css";

import traduction from "./traduction";

class LanguageMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggle: false};
    }

    toggleLanguage() {
        this.setState({isToggle: !this.state.isToggle});
    }

    swapLanguage(langCode){
        this.props.swapLanguage(langCode);
        this.setState({isToggle: false});

    }

    render() {
        return (
            <div className="lang-switch">
                <a id="imageDropdown" onClick={() => this.toggleLanguage()}>
                    { traduction[this.props.language]["LANG"] }
                </a>
                <div id="lang-list" className="lang-list" style={{display: this.state.isToggle ? 'block' : 'none'}}>
                    {this.props.language!==0?(<a onClick={() => this.swapLanguage(0)}>{traduction[0]["LANG"]}</a>):null}
                    {this.props.language!==1?(<a onClick={() => this.swapLanguage(1)}>{traduction[1]["LANG"]}</a>):null}
                    {this.props.language!==2?(<a onClick={() => this.swapLanguage(2)}>{traduction[2]["LANG"]}</a>):null}
                    {this.props.language!==3?(<a onClick={() => this.swapLanguage(3)}>{traduction[3]["LANG"]}</a>):null}
                    {this.props.language!==4?(<a onClick={() => this.swapLanguage(4)}>{traduction[4]["LANG"]}</a>):null}
                    {this.props.language!==5?(<a onClick={() => this.swapLanguage(5)}>{traduction[5]["LANG"]}</a>):null}
                    {this.props.language!==6?(<a onClick={() => this.swapLanguage(6)}>{traduction[6]["LANG"]}</a>):null}
                    {this.props.language!==7?(<a onClick={() => this.swapLanguage(7)}>{traduction[7]["LANG"]}</a>):null}
                    {this.props.language!==8?(<a onClick={() => this.swapLanguage(8)}>{traduction[8]["LANG"]}</a>):null}
                    {this.props.language!==9?(<a onClick={() => this.swapLanguage(9)}>{traduction[9]["LANG"]}</a>):null}
                    {this.props.language!==10?(<a onClick={() => this.swapLanguage(10)}>{traduction[10]["LANG"]}</a>):null}
                    {this.props.language!==11?(<a onClick={() => this.swapLanguage(11)}>{traduction[11]["LANG"]}</a>):null}
                    {this.props.language!==12?(<a onClick={() => this.swapLanguage(12)}>{traduction[12]["LANG"]}</a>):null}
                    {this.props.language!==13?(<a onClick={() => this.swapLanguage(13)}>{traduction[13]["LANG"]}</a>):null}
                    {/*this.props.language!==14?(<a onClick={() => this.swapLanguage(14)}>{traduction[14]["LANG"]}</a>):null*/}
                    {this.props.language!==15?(<a onClick={() => this.swapLanguage(15)}>{traduction[15]["LANG"]}</a>):null}
                    {this.props.language!==16?(<a onClick={() => this.swapLanguage(16)}>{traduction[16]["LANG"]}</a>):null}
                    {this.props.language!==17?(<a onClick={() => this.swapLanguage(17)}>{traduction[17]["LANG"]}</a>):null}
                </div>
            </div>
        );
    }
}

export default LanguageMenu;
