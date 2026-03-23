<script setup>
import apiClient from '@/api/apiClient.js'
import IngredientCard from '@/components/IngredientCard.vue'
import { onMounted, ref, watch } from 'vue'
import BackgroundImage from '@/components/BackgroundImage.vue'

const ingredients = ref([])
const isReady = ref(false)
const errorMsg = ref(null)

const searchQuery = ref('')
let timer = null
let defaultList = []

const fetchDefaultIngredients = async () => {
  errorMsg.value = null
  isReady.value = false
  try {
    const response = await apiClient.get('list.php?i=list')
    
    let formatted = []
    let ix = 0
    for (let item of response.data.drinks.slice(0, 60)) {
      formatted.push({
        idIngredient: ix,
        strIngredient: item.strIngredient1,
        imageUrl: 'https://www.thecocktaildb.com/images/ingredients/' + item.strIngredient1 + '.png'
      })
      ix++
    }

    defaultList = formatted
    ingredients.value = formatted
  } catch (error) {
    errorMsg.value = "Impossible de charger les ingrédients."
    console.log(error)
  } finally {
    isReady.value = true
  }
}

const searchIngredients = async (query) => {
  if (query == '') {
    ingredients.value = defaultList
    errorMsg.value = null
    return
  }

  isReady.value = false
  errorMsg.value = null
  
  try {
    const response = await apiClient.get('search.php?i=' + query)
    if (response.data.ingredients) {
      let found = []
      let ix = 0
      for (let item of response.data.ingredients) {
        found.push({
          idIngredient: item.idIngredient || ix,
          strIngredient: item.strIngredient,
          imageUrl: 'https://www.thecocktaildb.com/images/ingredients/' + item.strIngredient + '.png'
        })
        ix++
      }
      ingredients.value = found
    } else {
      ingredients.value = []
      errorMsg.value = "Aucun ingrédient trouvé."
    }
  } catch (error) {
    ingredients.value = []
    errorMsg.value = "Erreur de recherche."
    console.log(error)
  } finally {
    isReady.value = true
  }
}

watch(searchQuery, (newVal) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    searchIngredients(newVal)
  }, 500)
})

onMounted(() => {
  fetchDefaultIngredients()
})
</script>

<template>
  <BackgroundImage>Ingredients</BackgroundImage>

  <div class="search-bar-container">
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Rechercher un ingrédient..." 
      class="search-input"
    />
  </div>
  
  <div v-if="!isReady && !errorMsg" class="status-container">
    <p class="loading">Chargement des ingrédients en cours...</p>
  </div>
  <div v-else-if="errorMsg" class="status-container">
    <p class="error">{{ errorMsg }}</p>
  </div>

  <div v-else class="ingredients">
    <router-link
      v-for="ingredient in ingredients"
      :key="ingredient['idIngredient']"
      :to="'/ingredients/' + encodeURIComponent(ingredient['strIngredient'])"
      style="text-decoration: none;"
    >
      <IngredientCard
        :id="ingredient['idIngredient']"
        :imageUrl="`https://www.thecocktaildb.com/images/ingredients/${ingredient['strIngredient']}.png`"
        :name="ingredient['strIngredient']"
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

.ingredients {
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
