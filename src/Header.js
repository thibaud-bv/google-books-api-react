import './Header.css';
import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Header">
                <header className="App-header">
                    <p>
                        {this.props.title}
                    </p>
                    <input type='text'
                        placeholder={'🔎 Rechercher'}
                        maxLength="80"
                        onChange={this.props.handleChange}></input>
                </header>
            </div>
        );
    }
}
export default Header;