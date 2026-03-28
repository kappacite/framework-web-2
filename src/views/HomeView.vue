<script setup>
import BackgroundImage from '@/components/BackgroundImage.vue'
</script>

<template>
  <BackgroundImage>Accueil</BackgroundImage>
  
  <div class="cards-container">
    <router-link to="/cocktails" class="nav-card">
      <div class="card-content">
        <h2>Cocktails</h2>
        <p>Découvrez notre sélection de recettes, des classiques intemporels aux créations originales.</p>
      </div>
    </router-link>
    
    <router-link to="/ingredients" class="nav-card">
      <div class="card-content">
        <h2>Ingrédients</h2>
        <p>Explorez notre dictionnaire d'ingrédients et trouvez l'inspiration pour votre prochain mélange.</p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 80px 20px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-card {
  text-decoration: none;
  background-color: rgba(26, 26, 26, 0.8);
  border: 1px solid #d4af37;
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 80%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.2);
  border-color: #f1c40f;
  background-color: rgba(30, 30, 30, 0.95);
}

.nav-card:hover::before {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-content h2 {
  font-family: 'Playfair Display', serif;
  color: #d4af37;
  font-size: 2.8rem;
  margin: 0 0 20px 0;
  letter-spacing: 2px;
  transition: color 0.3s ease;
  text-transform: uppercase;
}

.nav-card:hover .card-content h2 {
  color: #f1c40f;
}

.card-content p {
  font-family: 'Lato', sans-serif;
  color: #e0e0e0;
  font-size: 1.25rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
  transition: color 0.3s ease;
}

.nav-card:hover .card-content p {
  color: #ffffff;
}
</style>
