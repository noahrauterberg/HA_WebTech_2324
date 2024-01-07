<script setup>
    const props = defineProps(["columns"]);
    import Column from './Column.vue';
</script>

<template>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4" v-for="(item, index) of columns" :key="index">
            <Column 
            :item="item"/>
        </div>
    </div>
</template>

<style scoped>

</style>