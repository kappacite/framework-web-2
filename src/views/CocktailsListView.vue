<script setup>
import apiClient from '@/api/apiClient.js'
import CocktailCard from '@/components/CocktailCard.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import { useFavoritesStore } from '@/stores/favorites.js'
import { onMounted, ref, watch } from 'vue'
import BackgroundImage from '@/components/BackgroundImage.vue'

const cocktails = ref([])
const isReady = ref(false)
const errorMsg = ref(null)

const searchQuery = ref('')
const currentFilter = ref('all')
const favoritesStore = useFavoritesStore()

let timer = null

const executeSearch = async () => {
  isReady.value = false
  errorMsg.value = null
  cocktails.value = []

  try {

    if (currentFilter.value === 'favorite') {
       let favs = favoritesStore.favorites
       if (searchQuery.value.trim() !== '') {
         favs = favs.filter(d => d.strDrink.toLowerCase().includes(searchQuery.value.toLowerCase()))
       }
       cocktails.value = favs
       if (favs.length === 0) errorMsg.value = "Aucun cocktail favori trouvé."
       isReady.value = true
       return
    }

    if (searchQuery.value.trim() === '') {
      let endpoint = 'filter.php?c=Cocktail'
      if (currentFilter.value === 'alcoholic') endpoint = 'filter.php?a=Alcoholic'
      else if (currentFilter.value === 'non-alcoholic') endpoint = 'filter.php?a=Non_Alcoholic'
      
      const response = await apiClient.get(endpoint)
      if (response.data.drinks) {
        cocktails.value = response.data.drinks.slice(0, 60)
      } else {
        errorMsg.value = "Aucun cocktail trouvé."
      }
      
    } else {
      const response = await apiClient.get('search.php?s=' + searchQuery.value)
      if (response.data.drinks) {
        let list = response.data.drinks
        
        if (currentFilter.value === 'alcoholic') {
          list = list.filter(d => d.strAlcoholic === 'Alcoholic')
        } else if (currentFilter.value === 'non-alcoholic') {
          list = list.filter(d => d.strAlcoholic === 'Non alcoholic' || d.strAlcoholic === 'Optional alcohol')
        }
        
        if (list.length > 0) {
          cocktails.value = list
        } else {
          errorMsg.value = "Aucun cocktail trouvé."
        }
      } else {
        errorMsg.value = "Aucun cocktail trouvé."
      }
    }
  } catch (error) {
    errorMsg.value = "Erreur de recherche."
    console.log(error)
  } finally {
    isReady.value = true
  }
}

watch(searchQuery, () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    executeSearch()
  }, 500)
})

watch(currentFilter, () => {
  executeSearch()
})

onMounted(() => {
  executeSearch()
})
</script>

<template>
  <BackgroundImage>Cocktails</BackgroundImage>
  
  <SearchComponent 
    v-model="searchQuery" 
    placeholder="Rechercher un cocktail..." 
    @search="executeSearch" 
  >
    <input type="radio" id="alcoholic" name="type" value="alcoholic" class="filter-radio" v-model="currentFilter">
    <label for="alcoholic" class="filter-label">Alcoolisé</label>
    
    <input type="radio" id="non-alcoholic" name="type" value="non-alcoholic" class="filter-radio" v-model="currentFilter">
    <label for="non-alcoholic" class="filter-label">Non alcoolisé</label>
    
    <input type="radio" id="all" name="type" value="all" class="filter-radio" v-model="currentFilter">
    <label for="all" class="filter-label">Tous</label>
    
    <input type="radio" id="favorite" name="type" value="favorite" class="filter-radio" v-model="currentFilter">
    <label for="favorite" class="filter-label">Favoris</label>
  </SearchComponent>
  
  <div v-if="!isReady && !errorMsg" class="status-container">
    <p class="loading">Chargement des cocktails en cours...</p>
  </div>
  <div v-else-if="errorMsg" class="status-container">
    <p class="error">{{ errorMsg }}</p>
  </div>

  <div v-else class="cocktails">
    <router-link
      v-for="cocktail in cocktails"
      :key="cocktail['idDrink']"
      :to="'/cocktails/' + cocktail['idDrink']"
      style="text-decoration: none;"
    >
      <CocktailCard
        :id="cocktail['idDrink']"
        :imageUrl="`${cocktail['strDrinkThumb']}`"
        :name="cocktail['strDrink']"
      />
    </router-link>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

h1,
h2,
h3 {
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
}

p {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
}

.cocktails {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  padding: 40px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}

.status-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  padding: 20px;
}

.loading {
  color: #d4af37;
}

.error {
  color: #e74c3c;
  border: 1px solid #e74c3c;
  padding: 15px 30px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
}
</style>
