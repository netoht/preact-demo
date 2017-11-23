'use strict'
import { h } from 'preact'
import { Link } from 'preact-router/match'

const Menu = () => (
  <nav class="menu navbar is-warning">
    <div class="container">
      <div class="navbar-brand">
        <Link href="/" class="navbar-item">
          <strong>ExampleApp</strong>
        </Link>
        <Link href="/search" className="navbar-item">
          <span class="icon">
            <i class="fa fa-search"></i>
          </span>
          <span>Search</span>
        </Link>
        <Link href="/about" className="navbar-item">
        <span class="icon">
            <i class="fa fa-info"></i>
          </span>
          <span>About</span>
        </Link>
      </div>
    </div>
  </nav>
)

export default Menu
