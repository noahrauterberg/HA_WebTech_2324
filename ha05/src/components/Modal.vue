<script setup>
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import Tag from './Tag.vue';
///////////////////////////////////////////////
// IDs to be used for the respective DOM elements in the template
///////////////////////////////////////////////

const MODAL_ID = 'modalRoot' // for the modal's root element
const MODAL_SELECT_COLUMN_ID = 'modalSelectColumn' // for the selector in the modal's header
const MODAL_BUTTON_X_ID = 'modalButtonX'
const MODAL_INPUT_TITLE_ID = 'modalInputTitle' // for the input where users enter the task's title
const MODAL_HELPER_TITLE_ID = 'modalHelperTitle' // for the helper showing the length of entered title
const MODAL_INPUT_TEXT_ID = 'modalInputText' // for the textarea where users enter the task's description
const MODAL_DROPDOWN_TRIGGER_ID = 'modalDropdownTrigger' // for the button that toggles the tag selection dropdown
const MODAL_DROPDOWN_MENU_ID = 'modalDropdownMenu' // for the root element of the tag selection dropdown's menu
const MODAL_CHECKBOX_BASE_ID = 'modalCheckbox' // base string for the checkboxes in the dropdown, concatenate with the respective tag's name
const MODAL_BUTTON_CANCEL = 'modalButtonCancel' // for the modal's cancel button
const MODAL_BUTTON_SUBMIT = 'modalButtonSubmit' // for the modal's submit button

///////////////////////////////////////////////
// Your implementation below
///////////////////////////////////////////////

const props = defineProps(["columns", "tags"]);
const emit = defineEmits(["createTask"])

let column = ref(0);
let title = ref("");
let description = ref("");
let taskTags = ref([]);

function resetRefs() {
    column.value=0;
    title.value="";
    description.value="";
    taskTags.value=[];
}

function createTask() {
    let obj = {
        column: column.value,
        newTask: {
            title: title.value,
            text: description.value,
            tags: taskTags.value
        }
    }
    emit("createTask", obj);

    resetRefs();
}
</script>

<template>
    <div :id="MODAL_ID" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Create Task in</h1>
                <select :id="MODAL_SELECT_COLUMN_ID" class="form-select w-auto ms-3" v-model="column">
                    <option v-for="(item, index) of columns" :key="index" :value="item.id">{{ item.name }}</option>
                </select>
                <button type="button" :id="MODAL_BUTTON_X_ID" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="modalInputTitle" class="form-label">Task Title</label>
                        <input type="text" class="form-control" :id="MODAL_INPUT_TITLE_ID" aria-describedby="emailHelp" maxlength="50" v-model="title">
                        <div :id="MODAL_HELPER_TITLE_ID" class="form-text">{{ title.length }}/50 characters</div>
                    </div>
                    
                    <label for="modalInputText">Task Description</label>
                    <textarea class="form-control" :id="MODAL_INPUT_TEXT_ID" v-model="description"></textarea>
                    
                    <div class="dropdown">
                        <button :id="MODAL_DROPDOWN_TRIGGER_ID" class="btn btn-primary dropdown-toggle mt-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Select tags
                        </button>
                        <ul :id="MODAL_DROPDOWN_MENU_ID" class="dropdown-menu">
                            <li v-for="(item, index) of tags" :key="index">
                                <input class="form-check-input ms-2" type="checkbox" v-model="taskTags" :value="item" :id="MODAL_CHECKBOX_BASE_ID+item">
                                <label class="form-check-label ms-2" :for="MODAL_CHECKBOX_BASE_ID+item">
                                    <Tag :tagValue="item" />
                                </label>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" :id="MODAL_BUTTON_CANCEL" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetRefs">Cancel</button>
                <button type="button" :id="MODAL_BUTTON_SUBMIT" class="btn btn-primary" data-bs-dismiss="modal" @click="createTask">Create</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* no custom stylesheet necessary thanks to Bootstrap */
</style>