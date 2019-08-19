import Machine from './modules/Machine/Machine'
import Receipts from './modules/Receipts/Receipts'
import Slots from './modules/Slots/Slots'
import Liquids from './modules/Liquids/Liquids'

export default [
  { name: 'Receipts', path: '/', component: Receipts, icon: 'book', exact: true },
  { name: 'Liquids', path: '/liquids', component: Liquids, icon: 'shopping-cart' },
  { name: 'Slots', path: '/slots', component: Slots, icon: 'settings' },
  { name: 'Machine', path: '/machine', component: Machine, icon: 'cog' },
]
