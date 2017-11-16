'use strict'
import { h, render } from 'preact'
import 'bulma/bulma.sass'
import App from 'components/App'

document.addEventListener('DOMContentLoaded', (evt) => {
    render(<App />, document.querySelector('#app'))
})
