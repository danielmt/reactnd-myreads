import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    bookshelves: PropTypes.array.isRequired,
    onMoveToBookshelf: PropTypes.func.isRequired,
  }

  state = {
    term: '',
  }

  searchBooks = debounce(term => {
    if (term.length > 3) {
      this.props.onSearchBooks(term)
    }
  }, 400)

  updateTerm = term => {
    this.setState({ term })
    this.searchBooks(term)
  }

  render() {
    const { books, bookshelves, onMoveToBookshelf } = this.props
    const { term } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              value={term}
              onChange={event => this.updateTerm(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books &&
              books.map(book => (
                <li key={book.id}>
                  <Book book={book} bookshelves={bookshelves} onMoveToBookshelf={onMoveToBookshelf} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
