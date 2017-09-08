import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveToBookshelf: PropTypes.func.isRequired,
  }

  render() {
    const { book, onMoveToBookshelf } = this.props

    const bookshelves = [
      { title: 'Currently Reading', value: 'currentlyReading' },
      { title: 'Want to Read', value: 'wantToRead' },
      { title: 'Read', value: 'read' },
      { title: 'None', value: 'none' },
    ]

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf || ''} onChange={event => onMoveToBookshelf(book, event.target.value)}>
              <option value="" disabled>
                Move to...
              </option>
              {bookshelves.map(bookshelf =>
                <option value={bookshelf.value} key={bookshelf.value}>
                  {bookshelf.title}
                </option>
              )}
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {book.authors && book.authors.join(', ')}
        </div>
      </div>
    )
  }
}

export default Book
