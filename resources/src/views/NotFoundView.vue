<script setup>
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';

</script>

<template>

  <section class="text-center flex flex-col justify-center items-center h-96">
    <i class="pi pi-exclamation-triangle text-yellow-500  mb-5"style="font-size: 8rem"></i>
    <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl mb-5">This page does not exist</p>
    <RouterLink
      to="/"
      ><Button label="Go Home"/></RouterLink
    >
  </section>
</template>
