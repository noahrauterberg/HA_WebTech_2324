<script setup>
    const props = defineProps(["columns"]);
    import Column from './Column.vue';
</script>

<template>
    <!-- <ul>
        <li v-for="(item, index) of columns" :key="index">
			<a class="dropdown-item" href="#">{{item.name}}</a>
		</li>
    </ul> -->
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4" v-for="(item, index) of columns" :key="index">
            <Column 
            :item="item"/>
        </div>
    </div>
</template>

<style scoped>

</style>