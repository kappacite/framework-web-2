<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  id: [Number, String],
  name: String,
  imageUrl: String,
})

const favoritesStore = useFavoritesStore()
const isFav = computed(() => favoritesStore.isFavorite(props.id))

const toggleFav = () => {
  favoritesStore.toggleFavorite({
    idDrink: props.id,
    strDrink: props.name,
    strDrinkThumb: props.imageUrl
  })
}
</script>

<template>
  <div class="cocktail-card">
    <div class="favorite-btn" @click.prevent="toggleFav" title="Ajouter/Retirer des favoris">
      <span v-if="isFav">❤️</span>
      <span v-else>🤍</span>
    </div>
    <div class="cocktail-image"><img :src="imageUrl" loading="lazy" alt="Cocktail Image" /></div>
    <div class="cocktail-details">
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.cocktail-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.15);
  background: rgba(0, 0, 0, 0.8);
}

.cocktail-card:hover {
  transform: translateY(-5px);
}

.cocktail-image {
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

.cocktail-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5));
  transition: transform 0.4s ease;
}

.cocktail-card:hover .cocktail-image img {
  transform: scale(1.08);
}

.cocktail-details {
  width: 100%;
  background-color: #0a0a0a;
  padding: 20px 10px;
  box-sizing: border-box;
  border-top: 1px solid #222;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.cocktail-card:hover .cocktail-details {
  border-top-color: #d4af37;
  background-color: #0f0f0f;
}

.cocktail-details p {
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

.cocktail-card:hover .cocktail-details p {
  color: #fff;
}
</style>
