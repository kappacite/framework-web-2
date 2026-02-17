import { createRouter, createWebHistory } from 'vue-router'
import CocktailsListView from '@/views/CocktailsListView.vue'
import IngredientsListView from '@/views/IngredientsListView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'Accueil', component: HomeView},
    {path: '/cocktails/', name:'Cocktails', component: CocktailsListView},
    {path: '/ingredients/', name:'Ingredients', component: IngredientsListView } ],
})

export default router
