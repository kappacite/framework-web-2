<script setup>
const props = defineProps({
  id: Number,
  name: String,
  imageUrl: String,
})
</script>

<template>
  <div class="ingredient-card">
    <div class="ingredient-image"><img :src="imageUrl" alt="Ingredient Image" /></div>
    <div class="ingredient-details">
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.ingredient-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.ingredient-card:hover {
  transform: translateY(-5px);
}

.ingredient-image {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.ingredient-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5));
  transition: transform 0.4s ease;
}

.ingredient-card:hover .ingredient-image img {
  transform: scale(1.08);
}

.ingredient-details {
  width: 100%;
  background-color: #0a0a0a;
  padding: 20px 10px;
  box-sizing: border-box;
  border-top: 1px solid #222;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.ingredient-card:hover .ingredient-details {
  border-top-color: #d4af37;
  background-color: #0f0f0f;
}

.ingredient-details p {
  color: #e0e0e0;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.ingredient-card:hover .ingredient-details p {
  color: #fff;
}
</style>
