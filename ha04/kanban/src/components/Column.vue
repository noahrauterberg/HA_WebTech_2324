<script setup>
    import TaskCard from './TaskCard.vue';
    const props = defineProps(["item"]);
</script>

<template>
    <h4 class="text-light">{{ item.name }}</h4>
    <div v-for="(item, index) of item.tasks" :key="index">
        <TaskCard 
        :task="item" />
    </div>
</template>

<style scoped>
    h4 {
        padding-top: 1.25rem;
    }
</style>