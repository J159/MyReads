import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Search extends Component {
  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.updateSearchResults(query);
  }

  updateSearchResults = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchResults) => {
        if (searchResults.error) {
          return this.setState({ searchResults: [] })
        } else {
           return this.setState({ searchResults })
        }
      })
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map(searchResults => (
              <li key={searchResults.id}>
                <Book book={searchResults} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
