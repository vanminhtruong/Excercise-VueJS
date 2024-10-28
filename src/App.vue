<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <header>
      <div class="wrapper">
        <h1>7 bài tập đang ở trong các đường link của router, xin hãy truy cập</h1>
      </div>
    </header>
    <RouterView/>
  </div>
</template>

<style scoped>
  h1{
    text-align: center;
  }
</style>
