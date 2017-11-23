'use strict'
import { h } from 'preact'

const SearchToolbar = () => (
  <div class="field is-grouped container box">
  <p class="control is-expanded">
    <input class="input" type="text" placeholder="Search a RFC, for example: C575401" />
  </p>
  <p class="control">
    <a class="button is-info">
      <span class="icon">
        <i class="fa fa-search"></i>
      </span>
      <span>Search</span>
    </a>
  </p>
  </div>
)

export default SearchToolbar
