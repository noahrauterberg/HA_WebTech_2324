<script setup>
    const props = defineProps(["title"]);
</script>

<template>
  <nav class="navbar bg-light">
    <div class="container-fluid">
      <a class="navbar-brand fw-semibold" href="#">
        <img src="../../favicon.ico" alt="Icon" width="24px" height="24px" class="d-inline-block align-text-top">
        {{ title }}
      </a>
    </div>
  </nav>
</template>

<style scoped>

</style>