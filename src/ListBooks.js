import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveToBookshelf: PropTypes.func.isRequired,
  }

  render() {
    const { books, onMoveToBookshelf } = this.props

    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const read = books.filter(book => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Currently Reading" books={currentlyReading} onMoveToBookshelf={onMoveToBookshelf} />
          <BookShelf title="Want to Read" books={wantToRead} onMoveToBookshelf={onMoveToBookshelf} />
          <BookShelf title="Read" books={read} onMoveToBookshelf={onMoveToBookshelf} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
