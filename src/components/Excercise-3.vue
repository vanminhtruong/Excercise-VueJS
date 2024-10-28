<script setup>
    import { ref } from "vue";
    const fontSize = ref(16);
</script>

<template>
    <div>
        <label for="font-size-input">Enter Font Size Yours(px):</label>
        <input
          id="font-size-input"
          type="number"
          v-model="fontSize"
          min="10"
          max="100"
        />
        <p :style="{ fontSize: fontSize + 'px' }">
          This text will change its font size based on your input yours.
        </p>
    </div>
</template>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 20px auto;
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
  }

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    padding: 4px;
    margin-bottom: 16px;
  }

  p {
    transition: font-size 0.3s ease;
  }
</style>