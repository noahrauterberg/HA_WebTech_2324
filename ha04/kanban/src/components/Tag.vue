<script setup>
    const { tag } = defineProps(["tag"]);
    var color;
    switch (tag) {
        case "Feature":
        case "Bug":
            color = "primary";
            break;
        case "In concept":
        case "Shelved":
        case "Abandoned":
            color = "secondary";
            break;
        case "Assigned":
            color = "success";
            break;
        case "Client request":
            color = "warning";
            break;
        case "Urgent":
            color = "danger";
            break;
        default:
            color = "light";
            break;
    }
    const badgeClass = `badge bg-${color}`;
</script>

<template>
    <span :class="badgeClass">{{ tag }}</span>
</template>

<style scoped>
    span {
        margin-left: 0.5rem;
    }
</style>