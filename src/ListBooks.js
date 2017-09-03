import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    bookshelves: PropTypes.array.isRequired,
    onMoveToBookshelf: PropTypes.func.isRequired,
  }

  render() {
    const { bookshelves, onMoveToBookshelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {bookshelves.map(bookshelf => (
            <BookShelf title={bookshelf.title} key={bookshelf.value}
                       books={this.props.books[bookshelf.value]}
                       bookshelves={bookshelves}
                       onMoveToBookshelf={onMoveToBookshelf} />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
