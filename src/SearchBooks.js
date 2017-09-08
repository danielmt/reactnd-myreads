import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    currentBooks: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onMoveToBookshelf: PropTypes.func.isRequired,
  }

  state = {
    term: '',
    didSearch: false,
    searching: false,
  }

  searchBooks = debounce(term => {
    if (term.length > 2) {
      this.setState({ searching: true })
      this.props.onSearchBooks(term).then(() => {
        this.setState({ didSearch: true, searching: false })
      })
    }
  }, 400)

  updateTerm = term => {
    this.setState({ term })
    this.searchBooks(term)
  }

  moveToBookshelf = (book, shelf) => {
    this.setState({ searching: true })
    this.props.onMoveToBookshelf(book, shelf).then(() => {
      this.setState({ searching: false })
    })
  }

  render() {
    const { books, currentBooks } = this.props
    const { term, didSearch, searching } = this.state

    return (
      <div className="search-books">
        <div className={searching ? 'search-books-bar search-books-bar-loading' : 'search-books-bar'}>
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
          {books.length > 0 &&
            <ol className="books-grid">
              {books.map(
                book =>
                  currentBooks.indexOf(book.id) < 0 &&
                  <li key={book.id}>
                    <Book book={book} onMoveToBookshelf={this.moveToBookshelf} />
                  </li>
              )}
            </ol>}
          {books.length === 0 && didSearch && <div className="search-books-no-match">Your search did not match any books.</div>}
        </div>
      </div>
    )
  }
}

export default SearchBooks
