import { createRouter, createWebHistory } from 'vue-router'
import CocktailsListView from '@/views/CocktailsListView.vue'
import IngredientsListView from '@/views/IngredientsListView.vue'
import HomeView from '@/views/HomeView.vue'
import CocktailDetailView from '@/views/CocktailDetailView.vue'
import IngredientDetailView from '@/views/IngredientDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'Accueil', component: HomeView},
    {path: '/cocktails/', name:'Cocktails', component: CocktailsListView},
    {path: '/cocktails/:id', name:'CocktailDetail', component: CocktailDetailView, props: true},
    {path: '/ingredients/', name:'Ingredients', component: IngredientsListView },
    {path: '/ingredients/:name', name:'IngredientDetail', component: IngredientDetailView, props: true} ],
})

export default router
