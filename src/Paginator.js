import './Paginator.css';
import React from "react";

class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Paginator">
                <footer className="App-paginator">
                    <p className='btn' onClick={this.props.previousPage}>⇚</p>
                    <p>{this.props.page}/{this.props.last_page}</p>
                    <p className='btn' onClick={this.props.nextPage}>⇛</p>
                </footer>
            </div>
        );
    }
}
export default Paginator;