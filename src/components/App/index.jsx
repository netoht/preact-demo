'use strict'
import Router from 'preact-router'
import { h, render } from 'preact'
import { Link } from 'preact-router/match'
import createHistory from 'history/createHashHistory'
import Menu from '../Menu'
import Home from '../Home'
import About from '../About'
import Search from '../Search'
import './App.css'
import './App.sass'
import '../../assets/images/favicon.png'

const App = (props) => (
  <div>
    <Menu />
    <main class="container is-fullhd">
      <Router history={createHistory()}>
        <Home path='/' />
        <About path='/about' />
        <Search path='/search' />
      </Router>
    </main>
  </div>
)

export default App
