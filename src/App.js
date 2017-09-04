import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import update from 'immutability-helper'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: [],
    bookshelves: [
      { title: 'Currently Reading', value: 'currentlyReading' },
      { title: 'Want to Read', value: 'wantToRead' },
      { title: 'Read', value: 'read' },
    ],
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  moveToBookshelf = (book, shelf) => {
    console.log('moving book', book.title, 'from', book.shelf || 'none', 'to', shelf)

    BooksAPI.update(book, shelf).then(() => {
      let newBook = update(book, { shelf: { $set: shelf } })
      let index = this.state.books.indexOf(book)

      if (index !== -1) {
        this.setState({
          books: update(this.state.books, {
            [index]: { $set: newBook },
          }),
        })
      } else {
        this.setState({
          books: update(this.state.books, {
            $push: [newBook],
          }),
        })
      }
    })
  }

  searchBooks = term => {
    console.log('searching for', term)

    return BooksAPI.search(term, 10).then(books => {
      if (books && 'error' in books) {
        this.setState({ searchBooks: [] })

        console.log('search for ', term, ': nothing found')
        return
      }

      console.log('found', books.length, 'books with', term)

      this.setState({ searchBooks: books })
    })
  }

  render() {
    const { books, bookshelves } = this.state

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListBooks books={books} bookshelves={bookshelves} onMoveToBookshelf={this.moveToBookshelf} />}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.searchBooks}
              onSearchBooks={this.searchBooks}
              bookshelves={bookshelves}
              onMoveToBookshelf={this.moveToBookshelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
