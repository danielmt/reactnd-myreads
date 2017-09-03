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
    }
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      let currentlyReading = [],
          wantToRead = [],
          read = []

      for (let book of books) {
        switch(book.shelf) {
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
          currentlyReading: {$set: currentlyReading},
          wantToRead: {$set: wantToRead},
          read: {$set: read},
        })
      })
    })
  }

  moveToBookshelf = (book, shelf) => {
    console.log('should move ', book.title, 'to', shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onMoveToBookshelf={this.moveToBookshelf} />
        )} />
        <Route path="/search" render={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
