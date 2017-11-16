'use strict'
import { h } from 'preact'
import { Link } from 'preact-router/match'

const Menu = () => (
  <nav class="navbar is-warning">
    <div class="container">
      <div class="navbar-brand">
        <Link href="/" class="navbar-item">
          <strong>ExampleApp</strong>
        </Link>
        <Link href="/search" className="navbar-item">
          <i class="fa fa-search" aria-hidden="true"></i> Search
        </Link>
        <Link href="/about" className="navbar-item">
          <i class="fa fa-info" aria-hidden="true"></i> About
        </Link>
      </div>
    </div>
  </nav>
)

export default Menu
