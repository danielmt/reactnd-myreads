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
    bookshelf: {},
    searchBooks: [],
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      let bookshelf = {}
      for (let book of books) {
        bookshelf[book.id] = book.shelf
      }

      this.setState({ books, bookshelf })
    })
  }

  moveToBookshelf = (book, shelf) => {
    console.log('moving book', book.title, 'from', book.shelf || 'none', 'to', shelf)

    return BooksAPI.update(book, shelf).then(() => {
      let newBook = update(book, { shelf: { $set: shelf } })
      let index = this.state.books.indexOf(book)

      if (index !== -1) {
        this.setState({
          books: update(this.state.books, {
            [index]: { $set: newBook },
          }),
        })
      } else {
        let searchIndex = this.state.searchBooks.indexOf(book)

        this.setState({
          books: update(this.state.books, {
            $push: [newBook],
          }),
          searchBooks: update(this.state.searchBooks, {
            [searchIndex]: { $set: newBook },
          }),
        })
      }

      this.setState({
        bookshelf: update(this.state.bookshelf, {
          [newBook.id]: { $set: newBook.shelf },
        }),
      })
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

      const { bookshelf } = this.state
      let newBooks = books.map(book => {
        book.shelf = bookshelf[book.id] || 'none'
        return book
      })

      this.setState({ searchBooks: newBooks })
    })
  }

  render() {
    const { books, searchBooks } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBooks books={books} onMoveToBookshelf={this.moveToBookshelf} />} />
        <Route
          path="/search"
          render={() => <SearchBooks books={searchBooks} onSearchBooks={this.searchBooks} onMoveToBookshelf={this.moveToBookshelf} />}
        />
      </div>
    )
  }
}

export default BooksApp
