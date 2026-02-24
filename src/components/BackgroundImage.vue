<script setup></script>

<template>
  <div class="background">
    <p><slot></slot></p>
    <img src="/src/img/background-ingredients.jpg" alt="Background" />
  </div>
</template>

<style scoped>
.background {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-bottom: 1px solid #333;
}

.background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(3px);
  transform: scale(1.1);
}


.background p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #f5f5f5;
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  letter-spacing: 4px;
  font-weight: 400;
  text-transform: uppercase;
  z-index: 2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}
</style>
