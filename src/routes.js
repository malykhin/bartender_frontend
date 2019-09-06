import Machine from './modules/Machine/Machine'
import Recipes from './modules/Recipes/Recipes'
import Liquids from './modules/Liquids/Liquids'

export default [
  { name: 'Recipes', path: '/', component: Recipes, icon: 'book', exact: true },
  { name: 'Liquids', path: '/liquids', component: Liquids, icon: 'shopping-cart' },
  { name: 'Machine', path: '/machine', component: Machine, icon: 'cog' },
]
