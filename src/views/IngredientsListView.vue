<script setup>
import apiClient from '@/api/apiClient.js'
import IngredientCard from '@/components/IngredientCard.vue'
import { onMounted, ref } from 'vue'
import BackgroundImage from '@/components/BackgroundImage.vue'

let ingredients = ref([])

const fetchIngredients = async () => {
  try {
    const response = await apiClient.get('list.php?i=list')
    const rawList = response.data['drinks'].slice(0, 60)

    const formattedIngredients = rawList.map((item, index) => ({
      idIngredient: index,
      strIngredient: item.strIngredient1,
      imageUrl: `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}.png`,
    }))

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = resolve
        img.onerror = resolve
      })
    }

    await Promise.all(formattedIngredients.map((ing) => loadImage(ing.imageUrl)))

    ingredients.value = formattedIngredients
    isReady.value = true
  } catch (error) {
    console.error('Error fetching ingredients:', error)
  }
}

onMounted(() => {
  fetchIngredients()
})
</script>

<template>
  <BackgroundImage>Ingredients</BackgroundImage>
  <div class="ingredients">
    <IngredientCard
      v-for="ingredient in ingredients"
      :key="ingredient['idIngredient']"
      :ingredient="ingredient['idIngredient']"
      :imageUrl="`https://www.thecocktaildb.com/images/ingredients/${ingredient['strIngredient']}.png`"
      :name="ingredient['strIngredient']"
    />
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
</style>
