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
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
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
            $splice: [[searchIndex, 1]],
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
