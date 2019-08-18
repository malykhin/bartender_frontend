import 'react-hot-loader'

import React from 'react'
import { render } from 'react-dom'

import Root from './Root'

import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'

const app = document.getElementById('app')
render(<Root />, app)
