<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Rechercher...'
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const updateValue = (e) => {
  emit('update:modelValue', e.target.value)
}

const onSearch = () => {
  emit('search', props.modelValue)
}
</script>

<template>

  <div class="search-section">
    <div class="search-bar-container">
      <input 
        type="text" 
        :value="modelValue" 
        @input="updateValue"
        @keyup.enter="onSearch"
        :placeholder="placeholder" 
        class="search-input"
      />
      <button class="search-button" @click="onSearch">Rechercher</button>
    </div>
    
    <div class="filters-container">
      <slot></slot>
    </div>
  </div>

</template>

<style>

.search-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 0 20px;
  width: 100%;
  box-sizing: border-box;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  gap: 10px;
}

.search-input {
  flex-grow: 1;
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

.search-button {
  padding: 0 25px;
  border-radius: 30px;
  border: none;
  background-color: #d4af37;
  color: #0f0f0f;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #f1c40f;
}

.filters-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.filter-radio {
  display: none;
}

.filter-label {
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 20px;
  border: 1px solid #d4af37;
  color: #d4af37;
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background-color: transparent;
  user-select: none;
}

.filter-radio:checked + .filter-label {
  background-color: #d4af37;
  color: #0f0f0f;
  font-weight: bold;
}

.filter-label:hover {
  background-color: rgba(212, 175, 55, 0.1);
}
</style>