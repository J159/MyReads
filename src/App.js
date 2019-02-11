import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Main from './Main.js'
import Search from './Search.js'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  bookTransfer = (book, shelf) => {
    BooksAPI.update(book, shelf)
    book.shelf = shelf;
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <Main books={this.state.books} bookTransfer={this.bookTransfer} />)} />
        <Route exact path="/search" render={() => (
            <Search books={this.state.books} bookTransfer={this.bookTransfer} />)} />
      </div>
    )
  }
}

export default BooksApp;
