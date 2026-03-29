<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/api/apiClient.js'
import BackgroundImage from '@/components/BackgroundImage.vue'

const route = useRoute()
const ingredient = ref(null)
const errorMsg = ref(null)

onMounted(async () => {
  try {
    let name = route.params.name
    
    let searchRes = await apiClient.get('search.php?i=' + name)
    if (searchRes.data.ingredients) {
      let iid = searchRes.data.ingredients[0].idIngredient
      
      let response = await apiClient.get('lookup.php?iid=' + iid)
      if (response.data.ingredients) {
        ingredient.value = response.data.ingredients[0]
      }
    } else {
      errorMsg.value = "Ingrédient introuvable."
    }
  } catch (error) {
    errorMsg.value = "Impossible de charger les détails de l'ingrédient."
    console.log(error)
  }
})
</script>

<template>
  <div v-if="ingredient">
    <BackgroundImage>{{ ingredient.strIngredient }}</BackgroundImage>
    <div class="ingredient-detail-container">
      <div class="ingredient-image-container">
        <img 
          :src="'https://www.thecocktaildb.com/images/ingredients/' + ingredient.strIngredient + '.png'" 
          :alt="ingredient.strIngredient" 
          class="ingredient-image" 
        />
      </div>
      <div class="ingredient-info">
        <h2>{{ ingredient.strIngredient }}</h2>
        <div class="tags">
          <span class="tag" v-if="ingredient.strType">{{ ingredient.strType }}</span>
          <span class="tag" v-if="ingredient.strAlcohol == 'Yes'">Alcoolisé</span>
          <span class="tag" v-if="ingredient.strAlcohol == 'No'">Sans alcool</span>
          <span class="tag" v-if="ingredient.strABV !== null">{{ ingredient.strABV }}%</span>
        </div>
        
        <div class="description" v-if="ingredient.strDescription">
          <h3>Description</h3>
          <p>{{ ingredient.strDescription }}</p>
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

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
}

p, span {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
}

.ingredient-detail-container {
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
  .ingredient-detail-container {
    flex-direction: row;
    align-items: flex-start;
  }
}

.ingredient-image-container {
  flex: 1;
  width: 100%;
  max-width: 500px;
  border-top: 1px solid #d4af37;
  background-color: #0f0f0f;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ingredient-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.ingredient-info {
  flex: 1;
  width: 100%;
  color: #e0e0e0;
}

.ingredient-info h2 {
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 20px;
  color: #fff;
  text-transform: uppercase;
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

.description h3 {
  color: #d4af37;
  font-size: 1.5rem;
  margin-bottom: 15px;
  border-bottom: 1px solid #222;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-family: 'Playfair Display', serif;
}

.description p {
  line-height: 1.6;
  font-size: 1.1rem;
  white-space: pre-line;
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
