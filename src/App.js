import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import update from 'immutability-helper'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    searchBooks: [],
    bookshelves: [
      { title: 'Currently Reading', value: 'currentlyReading' },
      { title: 'Want to Read', value: 'wantToRead' },
      { title: 'Read', value: 'read' },
    ],
  }

  searching = false

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      let currentlyReading = [],
        wantToRead = [],
        read = []

      for (let book of books) {
        switch (book.shelf) {
          case 'currentlyReading':
            currentlyReading.push(book)
            break
          case 'wantToRead':
            wantToRead.push(book)
            break
          case 'read':
            read.push(book)
            break
          default:
            console.log('Unsupported book shelf: ', book.shelf)
        }
      }

      this.setState({
        books: update(this.state.books, {
          currentlyReading: { $set: currentlyReading },
          wantToRead: { $set: wantToRead },
          read: { $set: read },
        }),
      })
    })
  }

  moveToBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let newBook = update(book, { shelf: { $set: shelf } })

      this.setState({
        books: update(this.state.books, {
          [book.shelf]: { $set: this.state.books[book.shelf].filter(b => b.id !== book.id) },
          [shelf]: { $push: [newBook] },
        }),
      })
    })
  }

  searchBooks = term => {
    if (!this.searching) {
      this.searching = true

      console.log('searching for', term)

      BooksAPI.search(term, 10).then(books => {
        if (books && 'error' in books) {
          console.log('nothing found')
          return
        }

        console.log('found', books.length, 'books')

        this.setState({
          searchBooks: books,
        })

        this.searching = false
      })
    }
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
