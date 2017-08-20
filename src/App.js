import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      let currentlyReading = [],
          wantToRead = [],
          read = [];

      books.map(book => {
        switch(book.shelf) {
        case 'currentlyReading':
          currentlyReading.push(book);
          break;
        case 'wantToRead':
          wantToRead.push(book);
          break;
        case 'read':
          read.push(book);
          break;
        default:
          console.log('Unsupported book shelf: ', book.shelf)
        }
      });

      this.setState({ currentlyReading, wantToRead, read });
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks currentlyReading={ this.state.currentlyReading }
                     wantToRead={ this.state.wantToRead }
                     read={ this.state.read }
                   />
          )}/>
        <Route path="/search" render={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
