import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'

class Main extends Component {
  render() {
    console.log(this.props.books);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf name="Currently Reading" books={this.props.books.filter(book => book.shelf === "currentlyReading")}
              bookTransfer={this.props.bookTransfer}/>
            <Shelf name="Want to Read" books={this.props.books.filter(book => book.shelf === "wantToRead")}
              bookTransfer={this.props.bookTransfer}/>
            <Shelf name="Read" books={this.props.books.filter(book => book.shelf === "read")}
              bookTransfer={this.props.bookTransfer}/>
          </div>
        </div>
        {/* Search Button */}
        <div className="open-search">
          <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div>
    )
  }
}

export default Main;
