<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/api/apiClient.js'
import BackgroundImage from '@/components/BackgroundImage.vue'
import { useFavoritesStore } from '@/stores/favorites'

const route = useRoute()
const cocktail = ref(null)
const ingredients = ref([])
const errorMsg = ref(null)
const favoritesStore = useFavoritesStore()

const isFav = computed(() => {
  if (cocktail.value) {
    return favoritesStore.isFavorite(cocktail.value.idDrink)
  }
  return false
})

const toggleFav = () => {
  if (cocktail.value) {
    favoritesStore.toggleFavorite(cocktail.value)
  }
}

const formattedInstructions = computed(() => {
  if (!cocktail.value) return []
  let text = cocktail.value.strInstructionsFR || cocktail.value.strInstructions
  if (!text) return []

  // Hacky student way to handle numbers mixed with text without regex
  for (let i = 1; i <= 15; i++) {
     text = text.split(i + '.').join('. ')
     text = text.split(i + ')').join('. ')
  }
  
  let splitArr = text.split('.')
  let res = []
  for (let item of splitArr) {
    if (item.trim() !== '') {
      res.push(item.trim())
    }
  }
  return res
})

onMounted(async () => {
  try {
    const id = route.params.id
    const response = await apiClient.get('lookup.php?i=' + id)
    if (response.data.drinks && response.data.drinks.length > 0) {
      let data = response.data.drinks[0]
      cocktail.value = data
      
      let ings = []
      for (let i = 1; i <= 15; i++) {
        let ing = data['strIngredient' + i]
        let measure = data['strMeasure' + i]
        if (ing != null && ing != '') {
          ings.push({
            name: ing,
            measure: measure ? measure.trim() : ''
          })
        }
      }
      ingredients.value = ings
    } else {
      errorMsg.value = "Cocktail introuvable."
    }
  } catch (error) {
    errorMsg.value = "Impossible de charger les détails du cocktail."
    console.log(error)
  }
})
</script>

<template>
  <div v-if="cocktail">
    <BackgroundImage>{{ cocktail.strDrink }}</BackgroundImage>
    <div class="cocktail-detail-container">
      <div class="cocktail-image-container">
        <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" class="cocktail-image" />
      </div>
      <div class="cocktail-info">
        <div class="title-container">
          <h2>{{ cocktail.strDrink }}</h2>
          <button class="favorite-btn-detail" @click="toggleFav" title="Ajouter/Retirer des favoris">
            <span v-if="isFav">❤️</span>
            <span v-else>🤍</span>
          </button>
        </div>
        <div class="tags">
          <span class="tag">{{ cocktail.strAlcoholic }}</span>
          <span class="tag">{{ cocktail.strGlass }}</span>
        </div>
        
        <div class="instructions" v-if="formattedInstructions.length > 0">
          <h3>Instructions</h3>
          <ul class="instructions-list">
            <li v-for="(step, index) in formattedInstructions" :key="index">{{ step }}</li>
          </ul>
        </div>
        
        <div class="ingredients">
          <h3>Ingrédients</h3>
          <ul>
            <li v-for="(ing, index) in ingredients" :key="index">
              <span class="measure">{{ ing.measure }}</span> <span class="name">{{ ing.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="errorMsg" class="status-container">
    <p class="error">{{ errorMsg }}</p>
  </div>
  <div v-else class="status-container">
    <p class="loading">Chargement des détails en cours...</p>
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

p, span, li {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
}

.cocktail-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .cocktail-detail-container {
    flex-direction: row;
    align-items: flex-start;
  }
}

.cocktail-image-container {
  flex: 1;
  width: 100%;
  max-width: 500px;
  border-top: 1px solid #d4af37;
  background-color: #0f0f0f;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cocktail-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.cocktail-info {
  flex: 1;
  width: 100%;
  color: #e0e0e0;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.cocktail-info h2 {
  font-size: 2.5rem;
  margin: 0;
  color: #fff;
  text-transform: uppercase;
}

.favorite-btn-detail {
  background: transparent;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tags {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tag {
  background-color: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 5px 15px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.instructions h3,
.ingredients h3 {
  color: #d4af37;
  font-size: 1.5rem;
  margin-bottom: 15px;
  border-bottom: 1px solid #222;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-family: 'Playfair Display', serif;
}

.instructions-list {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 30px;
}

.instructions-list li {
  line-height: 1.6;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #222;
  font-size: 1.1rem;
  color: #e0e0e0;
}

.instructions-list li:last-child {
  border-bottom: none;
}

.ingredients ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.ingredients li {
  padding: 10px 0;
  border-bottom: 1px solid #222;
  display: flex;
  align-items: baseline;
  font-size: 1.1rem;
}

.ingredients li:last-child {
  border-bottom: none;
}

.measure {
  color: #d4af37;
  font-weight: 400;
  margin-right: 15px;
  min-width: 80px;
}

.name {
  color: #fff;
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
