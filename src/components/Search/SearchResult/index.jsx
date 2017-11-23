'use strict'
import { h } from 'preact'

const SearchResult = () => (
  <div class="field is-grouped container box">

    <div class="columns is-desktop">

      {/* First column */}
      <div class="column">

        <div class="field">
          <label class="label">RFC Number</label>
          <div class="control">
            <input class="input" type="text" value="C575401" readOnly />
          </div>
        </div>

        <div class="is-divider" data-content="OR"></div>

        <div class="field">
          <label class="label">Planned Start Date</label>
          <div class="control">
            <input class="input" type="date" value="C575401" readOnly />
          </div>
        </div>

      </div>
    </div>

  </div>
)

export default SearchResult
