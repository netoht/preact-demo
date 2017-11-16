'use strict'
import Router from 'preact-router'
import { h, render } from 'preact'
import { Link } from 'preact-router/match'
import createHistory from 'history/createHashHistory'
import Menu from '../Menu'
import Home from '../Home'
import About from '../About'
import './App.css'

const App = (props) => (
    <main>
        <h2>Basic React Boilerplate</h2>
        <Menu />
        <Router history={createHistory()}>
            <Home path="/" />
            <About path='/about' />
        </Router>
    </main>
)

export default App
