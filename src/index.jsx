'use strict'
import { h, render } from 'preact'
import App from 'components/App'

document.addEventListener('DOMContentLoaded', (evt) => {
    render(<App />, document.querySelector('#app'))
})
