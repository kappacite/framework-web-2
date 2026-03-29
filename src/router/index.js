import { createRouter, createWebHistory } from 'vue-router'
import CocktailsListView from '@/views/CocktailsListView.vue'
import IngredientsListView from '@/views/IngredientsListView.vue'
import HomeView from '@/views/HomeView.vue'
import CocktailDetailView from '@/views/CocktailDetailView.vue'
import IngredientDetailView from '@/views/IngredientDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Accueil', component: HomeView },
    { path: '/cocktails/', name: 'Cocktails', component: () => import('@/views/CocktailsListView.vue') },
    { path: '/cocktails/:id', name: 'CocktailDetail', component: () => import('@/views/CocktailDetailView.vue'), props: true },
    { path: '/ingredients/', name: 'Ingredients', component: () => import('@/views/IngredientsListView.vue') },
    { path: '/ingredients/:name', name: 'IngredientDetail', component: () => import('@/views/IngredientDetailView.vue'), props: true }],
})

export default router
