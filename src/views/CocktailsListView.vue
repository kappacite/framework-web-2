<script setup>
import apiClient from '@/api/apiClient.js'
import CocktailCard from '@/components/CocktailCard.vue'
import { onMounted, ref, watch } from 'vue'
import BackgroundImage from '@/components/BackgroundImage.vue'

const cocktails = ref([])
const isReady = ref(false)
const errorMsg = ref(null)

const searchQuery = ref('')
let timer = null
let defaultList = []

const fetchDefaultCocktails = async () => {
  errorMsg.value = null
  isReady.value = false
  try {
    const response = await apiClient.get('filter.php?c=Cocktail')
    let rawList = response.data.drinks.slice(0, 60)

    defaultList = rawList
    cocktails.value = rawList
  } catch (error) {
    errorMsg.value = "Impossible de charger les cocktails. Veuillez réessayer plus tard."
    console.log(error)
  } finally {
    isReady.value = true
  }
}

const searchCocktails = async (query) => {
  if (query == '') {
    cocktails.value = defaultList
    errorMsg.value = null
    return
  }

  isReady.value = false
  errorMsg.value = null
  
  try {
    const response = await apiClient.get('search.php?s=' + query)
    if (response.data.drinks) {
      cocktails.value = response.data.drinks
    } else {
      cocktails.value = []
      errorMsg.value = "Aucun cocktail trouvé."
    }
  } catch (error) {
    cocktails.value = []
    errorMsg.value = "Erreur de recherche."
    console.log(error)
  } finally {
    isReady.value = true
  }
}

watch(searchQuery, (newVal) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    searchCocktails(newVal)
  }, 500)
})

onMounted(() => {
  fetchDefaultCocktails()
})
</script>

<template>
  <BackgroundImage>Cocktails</BackgroundImage>
  
  <div class="search-bar-container">
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Rechercher un cocktail..." 
      class="search-input"
    />
  </div>
  
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

.search-bar-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px 0 20px;
  width: 100%;
  box-sizing: border-box;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 15px 25px;
  border-radius: 30px;
  border: 1px solid #d4af37;
  background-color: #0f0f0f;
  color: #fff;
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  outline: none;
}

.search-input:focus {
  border-color: #f1c40f;
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
