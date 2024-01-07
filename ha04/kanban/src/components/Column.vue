<script setup>
    import TaskCard from './TaskCard.vue';
    const props = defineProps(["item"]);
</script>

<template>
    <h4 class="text-light pt-4">{{ item.name }}</h4>
    <div v-for="(item, index) of item.tasks" :key="index">
        <TaskCard 
        :task="item" />
    </div>
</template>

<style scoped>

</style>