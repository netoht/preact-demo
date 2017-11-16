'use strict'
import { h } from 'preact'
import { Link } from 'preact-router/match'

const Menu = () => (
    <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
    </ul>
)

export default Menu
