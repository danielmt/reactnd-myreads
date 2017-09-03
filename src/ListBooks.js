import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    onMoveToBookshelf: PropTypes.func.isRequired,
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.props.books
    const { onMoveToBookshelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Currently Reading"
                     books={currentlyReading}
                     onMoveToBookshelf={onMoveToBookshelf} />
          <BookShelf title="Want to Read"
                     books={wantToRead}
                     onMoveToBookshelf={onMoveToBookshelf} />
          <BookShelf title="Read"
                     books={read}
                     onMoveToBookshelf={onMoveToBookshelf} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
