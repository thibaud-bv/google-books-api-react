import Header from './Header.js';
import Body from './Body.js';
import React from "react";
import axios from 'axios';
import { flushSync } from 'react-dom';
import Paginator from './Paginator.js';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.newrequest = this.newrequest.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.state = {
      input: "", // current searched author
      books: [], // current displayed books
      page: 1, // current page
      last_page: "?", // last page
      nb_books_per_page: 10 // number of books per page
    };
  }

  /**
   * Handles changes in the author search
   * @param {*} e change event
   */
  handleChange(e) {
    flushSync(() => {
      this.setState({
        page: 1 // get back to first page to avoid problems
      })
    })
    this.setState({
      input: e.target.value,
      books: []
    });
    this.newrequest(e.target.value, this.state.page);
  }

  /**
   * Decrements the page number if possible
   */
  previousPage() {
    var tmp_page = this.state.page <= 1
      ? 1 // page can't be below one
      : this.state.page - 1; // go back one page
    this.setState({
      page: tmp_page
    });
    this.newrequest(this.state.input, tmp_page);
  }

  /**
   * Increments the page number if possible
   */
  nextPage() {
    var tmp_page = this.state.page >= this.state.last_page
      ? this.state.last_page // page can't go above last_page
      : this.state.page + 1; // go to next page
    this.setState({
      page: tmp_page
    });
    this.newrequest(this.state.input, tmp_page);
  }

  /**
   * Truncates a book entry
   * @param {*} book the book
   * @param {*} entry the entry to truncate
   * @param {int} maxlength the maximum length the text should have
   * @param {string} text_end what the end should be
   * @returns {string} The truncated text
   */
  shorten_txt(book, entry, maxlength, text_end) {
    return book["volumeInfo"][entry] // Check if there is an entry
      ? book["volumeInfo"][entry].length > maxlength // Check if the entry's text is longer than maxlength
        ? book["volumeInfo"][entry].slice(0, maxlength) + text_end // Cut the text short
        : book["volumeInfo"][entry] // Text isn't too long, leave it whole
      : `No ${entry}` // If there is no description
  }

  /**
   * Makes a new request to the books google api
   * @param {str} input // searched author
   * @param {int} page // page to search for
   */
  newrequest(input, page) {
    var tmp_books = [];
    if (input != "") {
      //request for the new input
      let requete = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${input}&startIndex=${(page - 1) * this.state.nb_books_per_page}`;
      axios.get(requete)
        .then((response) => {
          // la réponse (JSON) est présente dans le response.data.items;
          this.setState({ last_page: Math.ceil(parseInt(response.data["totalItems"]) / this.state.nb_books_per_page) });
          console.log(parseInt(response.data["totalItems"]));
          response.data.items.forEach((book) => {
            tmp_books.push({
              title: this.shorten_txt(book, "title", 50, "..."),
              authors: this.shorten_txt(book, "authors", 1, " et al."),
              description: this.shorten_txt(book, "description", 50, "..."),
              image:
                book["volumeInfo"]["imageLinks"]
                  ? book["volumeInfo"]["imageLinks"]["smallThumbnail"]
                  : "https://upload.wikimedia.org/wikipedia/commons/d/d6/Question_book-2.svg", // image for books without images
              link:
                book["volumeInfo"]["previewLink"]
                  ? book["volumeInfo"]["previewLink"]
                  : "#", // just in case, it shouldn't happen
            });
          });
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    } else {
      this.setState({
        page: "1",
        last_page: "?"
      })
    }
    this.setState({ books: tmp_books });
  }
  render() {
    return (
      <div className="App">
        <Header title='API de recherche Google' handleChange={this.handleChange} />
        <Body books={this.state.books} input={this.state.input} />
        <Paginator previousPage={this.previousPage} nextPage={this.nextPage} page={this.state.page} last_page={this.state.last_page == 0 ? "?" : this.state.last_page} />
      </div>
    );
  }
}

export default App;