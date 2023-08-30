import './Body.css';
import React from "react";

class Body extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.books.length == 0 && this.props.input != "") {
            return (
                <div className="Body">
                    <p className='background'>{this.props.input}</p>
                    <div className="NoResultYet">
                        <p className="solo">No books written by "{this.props.input}"</p>
                    </div>
                </div>
            );
        }
        if (this.props.input == "") {
            return (
                <div className="Body">
                <p className='background'>Go ahead and search!</p>
                    <div className="NoResultYet">
                        <p className="solo">Go ahead and search!</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="Body">
                <p className='background'>{this.props.input}</p>
                {this.props.books.map(book =>
                (
                    
                    <div className="book">
                        <a target="_blank" href={book.link}>{book.title}</a>
                        <p>{book.authors}</p>
                        <p>{book.description}</p>
                        <img src={book.image}></img>
                    </div>
                )
                )}
            </div>
        );
    }
}
export default Body;