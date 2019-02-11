import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Search extends Component {
  state = {
    // The value of query will change when users type into Search box
    query: '',
    // Array to hold our book search results
    searchResults: []
  }

  updateQuery = (query) => {
    // this.updateSearchResults is set within this.setState to occur synchronously
    this.setState({ query }, () => {
      this.updateSearchResults(query)
    })
  }

  // Retrieve existing books from Book.js, return their shelf value and set it to our Searched books
  updateBook = book => {
    const existingBook = this.props.books.find(b => b.id === book.id)
    if (existingBook) {
      return {...book, shelf: existingBook.shelf}
    } else {
      return book
    }
  }

  // Update Search results with users query
  updateSearchResults = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchResults) => {
        // if searchResults returns an error or query is empty, return an empty array for searchResults
        if (searchResults.error || '') {
          return this.setState({ searchResults: [] })
        // If searchResults is error-free, map through searchResults with this.updateBook method, then set to updatedSearchResults variable
        } else {
           let updatedSearchResults = searchResults.map(book => this.updateBook(book))
           // Return searchResults which will equal updatedSearchResults
           return this.setState({ searchResults: updatedSearchResults })
        }
      })
      // else, searchResults returns empty array
    } else {
        this.setState({ searchResults: [] })
    }
}

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {
              /* The value of query will change when user types into Search box. This information is passed to updateQuery
              */
            }
            <input type="text" placeholder="Search by title or author" value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map(searchResults => (
              <li key={searchResults.id}>
                <Book book={searchResults} bookTransfer={this.props.bookTransfer}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
