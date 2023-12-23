<script setup>
    import { ref } from 'vue';
    import Tag from './Tag.vue';

    const props = defineProps(["task"]);
    const fullDesc = ref(false);
    const toggleText= () => { fullDesc.value = !fullDesc.value }
</script>

<template>
    <div class="card">
        <div class="card-header">
            {{ task.title }}
        </div>
        <div class="card-body" @click="toggleText">
            <p class="card-text">
                <div v-if="fullDesc">{{ task.text }}</div>
                <div class="text-truncate" v-else>{{ task.text }}</div>
            </p>
        </div>
        <div class="card-footer">
            <div v-for="(tag, index) of task.tags" :key="index">
                <Tag :tag="tag" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card-footer {
        display: flex;
        flex-wrap: wrap;
    }
</style>