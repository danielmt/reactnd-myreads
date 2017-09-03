import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    bookshelves: PropTypes.array.isRequired,
    onMoveToBookshelf: PropTypes.func.isRequired,
  }

  render() {
    const { book, bookshelves, onMoveToBookshelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={event => onMoveToBookshelf(book, event.target.value)}>
              <option value="none" disabled>
                Move to...
              </option>
              {bookshelves.map(bookshelf => (
                <option value={bookshelf.value} key={bookshelf.value}>
                  {bookshelf.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book
