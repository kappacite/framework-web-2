<script setup>
import BackgroundImage from '@/components/BackgroundImage.vue'
</script>

<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/cocktails">Cocktails</router-link>
    <router-link to="/ingredients">Ingredients</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 20px;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav > * {
  text-decoration: none;
  color: #e0e0e0;
  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  font-weight: 400;
  transition: color 0.3s ease;
}

nav > *:hover {
  color: #d4af37;
}
</style>
