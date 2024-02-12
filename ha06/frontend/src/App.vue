<script setup>
import { ref, onMounted } from 'vue'
import Board from './components/Board.vue'
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'

const tags = ref([])
const columns = ref([])
const modalRef = ref(null)

const title = 'My Kanban Board'

/**
 * Calls the showModal() function in Modal.vue, assuming the component is registered and referenced.
 * DO NOT MODIFY.
 */
function showModal(task = null, columnId = null) {
    if (modalRef.value) {
        modalRef.value.showModal(task, columnId)
    }
}

/**
 * Calls showModal() in editing mode.
 * DO NOT MODIFY.
 * @param taskId
 */
function triggerEdit(taskId) {
    for (let column of columns.value) {
        const index = column.tasks.findIndex(t => t.id === taskId)
        if (index > -1) {
            const task = column.tasks[index]
            showModal(task)
            return
        }
    }
}

////////////////////////////////////////////////////////////////
// API calls below, only modify the content of the functions, not their signature! //
////////////////////////////////////////////////////////////////

const apiUrl = "http://localhost:3000/api";

function updateColumns(response) {
    if (response.status == 200) {
        loadColumns();
    }
}

async function loadTags() {
    let response = await fetch(apiUrl+"/tags", {method: "GET"});
    let data = await response.json();
    tags.value = data;
    console.log(tags.value);
}

async function loadColumns() {
    let response = await fetch(apiUrl+"/columns", {method: "GET"});
    let data = await response.json();
    columns.value = data;
    console.log(columns.value);
}

async function createTask(columnId, taskTitle, taskText, taskTags) {
    const newTask = {
        column: columnId,
        title: taskTitle,
        text: taskText,
        taskTags: taskTags
    };
    console.log(JSON.stringify(newTask));
    let response = await fetch(`${apiUrl}/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTask)
    });
    updateColumns(response);
}

async function editTask(taskId, taskTitle, taskText, taskTags) {
    let response = await fetch(apiUrl+"/tasks/"+taskId, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: {
            title: taskTitle,
            text: taskText,
            taskTags: taskTags
        }
    });
    updateColumns(response);
}

async function deleteTask(taskId) {
    let response = await fetch(apiUrl+"/tasks/"+taskId, {
        method: "DELETE",
    });
    updateColumns(response);
}

async function moveTask(taskId, newColumnId) {
    let response = await fetch(apiUrl+"/move-task/"+taskId, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            newColumnId: newColumnId
        })
    });
    updateColumns(response);
}

onMounted(() => {
    // DO NOT MODIFY
    loadTags()
    loadColumns()
})
</script>

<template>
    <!-- DO NOT MODIFY -->
    <Header :title="title" @show-modal="showModal" />
    <Board :columns="columns" @move-task="moveTask" @trigger-edit="triggerEdit" @delete-task="deleteTask"/>
    <Modal :tags="tags" :columns="columns" ref="modalRef" @create-task="createTask" @edit-task="editTask"/>
</template>