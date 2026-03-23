import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  // load from localStorage if exists
  const favorites = ref(JSON.parse(localStorage.getItem('favorite_cocktails') || '[]'))

  const toggleFavorite = (cocktail) => {
    const index = favorites.value.findIndex(f => f.idDrink === cocktail.idDrink)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(cocktail)
    }
  }

  const isFavorite = (idDrink) => {
    return favorites.value.some(f => f.idDrink === idDrink)
  }

  // save to localStorage on change
  watch(favorites, (newVal) => {
    localStorage.setItem('favorite_cocktails', JSON.stringify(newVal))
  }, { deep: true })

  return { favorites, toggleFavorite, isFavorite }
})
