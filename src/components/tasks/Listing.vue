<template>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden">
            <div class="p-6 mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 sm:rounded-lg">
                <fwb-heading tag="h1" class="text-xl">My Tasks</fwb-heading>
            </div>


            <fwb-table striped>
                <fwb-table-head>
                    <fwb-table-head-cell>Title</fwb-table-head-cell>
                    <fwb-table-head-cell>Parent</fwb-table-head-cell>
                    <fwb-table-head-cell>Sub Tasks</fwb-table-head-cell>
                    <fwb-table-head-cell>Status</fwb-table-head-cell>
                    <fwb-table-head-cell>Created At</fwb-table-head-cell>
                    <fwb-table-head-cell>Updated At</fwb-table-head-cell>
                    <fwb-table-head-cell>
                        <span class="sr-only">Actions</span>
                    </fwb-table-head-cell>
                </fwb-table-head>
                <fwb-table-body>
                    <fwb-table-row v-for="task in taskListing.data" :value="task.id">
                        <fwb-table-cell>{{ task.title }}</fwb-table-cell>
                        <fwb-table-cell>{{ task.parent?.title }}</fwb-table-cell>
                        <fwb-table-cell>
                            <fwb-badge v-for="sub in task.subTasks" :value="sub.id" class="mb-1">{{ sub.title}}</fwb-badge>
                        </fwb-table-cell>
                        <fwb-table-cell>
                            <fwb-badge type="yellow" class="mb-1">{{ task.status}}</fwb-badge>
                        </fwb-table-cell>
                        <fwb-table-cell>{{ dateTime(task.created_at) }}</fwb-table-cell>
                        <fwb-table-cell>{{ dateTime(task.updated_at) }}</fwb-table-cell>
                        <fwb-table-cell class="grid grid-cols-2 gap-2">
                            <fwb-button color="yellow" square @click="showEditModal(task)">
                                <font-awesome-icon icon="edit"
                                    class="w-4 h-4 text-theme-warning-200 dark:text-theme-warning-400" />
                            </fwb-button>
                            <fwb-button color="red" square @click="showDeleteModal(task)">
                                <font-awesome-icon icon="trash"
                                    class="w-4 h-4 text-theme-danger-200 dark:text-theme-danger-400" />
                            </fwb-button>

                        </fwb-table-cell>
                    </fwb-table-row>
                </fwb-table-body>
            </fwb-table>
            <div class="flex justify-end mt-4 overflow-hidden sm:rounded-lg">
                <TailwindPagination :data="taskListing" @pagination-change-page="getResults" :itemClasses="itemClasses"
                    :activeClasses="activeClasses" />
            </div>
        </div>
    </div>

    <fwb-modal v-if="isShowEditModal" @close="closeEditModal">
        <template #header>
            <div class="flex items-center text-lg">
                Update Task
            </div>
        </template>
        <template #body>

            <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3 mb-6 md:mb-3">
                    <label for="title"
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 dark:text-gray-300">
                        title
                    </label>

                    <div class="flex">
                        <span
                            class="w-10 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-200 border-e-0 rounded-s-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <font-awesome-icon icon="underline" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </span>
                        <input autocomplete="off" v-model="title" id="title" name="title" type="text"
                            placeholder="Type task here..."
                            class="bg-gray-200 p-3 border border-gray-200 text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div v-if="validationErrors.title" class="flex flex-col">
                        <small class="text-theme-danger-500">
                            {{ validationErrors?.title[0] }}
                        </small>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                    <label for="parent_id"
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 dark:text-gray-300">
                        Parent Task
                    </label>
                    <div class="flex">
                        <span
                            class="w-10 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-200 rounded-e-0 rounded-s-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <font-awesome-icon icon="sort-numeric-up"
                                class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </span>
                        <select autocomplete="off" v-model="parent_id" name="parent_id" required
                            class="rounded-none rounded-r-lg bg-gray-200 p-3 border border-gray-200 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="parent_id">
                            <option value=""> Select Parent Task </option>

                            <option v-for="task in tasks.filter(task => task.id !== id)" :value="task.id">{{task.title}}</option>
                        </select>
                    </div>
                    <div v-if="validationErrors.parent_id" class="flex flex-col">
                        <small class="text-theme-danger-500">
                            {{ validationErrors?.parent_id[0] }}
                        </small>
                    </div>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                    <label for="status"
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 dark:text-gray-300">
                        Status
                    </label>
                    <div class="flex">
                        <span
                            class="w-10 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-200 rounded-e-0 rounded-s-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <font-awesome-icon icon="sort-numeric-up"
                                class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </span>
                        <select autocomplete="off" v-model="status" name="status" required
                            class="rounded-none rounded-r-lg bg-gray-200 p-3 border border-gray-200 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="status">
                            <option value=""> Select Status </option>
                            <option value="todo">Todo</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div v-if="validationErrors.status" class="flex flex-col">
                        <small class="text-theme-danger-500">
                            {{ validationErrors?.status[0] }}
                        </small>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeEditModal" color="alternative">
                    Cancel
                </fwb-button>
                <button :disabled="isSubmitting" @click="updateTask()" type="button"
                    class="bg-[linear-gradient(to_right,#ef508b,#d64a8b,#8b208a,#71237d)] inline-block rounded-lg p-3 text-sm font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    Update
                </button>
            </div>
        </template>
    </fwb-modal>
    <fwb-modal size="md" v-if="isShowDeleteModal" @close="closeDeleteModal" class="bg-theme-danger-400">
        <template #body>
            <svg class="text-theme-danger-600 dark:text-theme-danger-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            <p class="mb-4 text-gray-500 dark:text-gray-300 flex justify-center text-center">
                Are you sure you want to delete this item? <br>
                All the sub tasks that are related to this task will update and parent data will be removed!
            </p>
            <div class="flex justify-center items-center space-x-4">
                <fwb-button @click="closeDeleteModal" color="alternative" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No
                </fwb-button>
                <fwb-button :disabled="isSubmitting" @click="deleteTask()" type="button"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-theme-danger-600 rounded-lg hover:bg-theme-danger-700 focus:ring-4 focus:outline-none focus:ring-theme-danger-300 dark:bg-theme-danger-500 dark:hover:bg-theme-danger-600 dark:focus:ring-theme-danger-900">
                    Yes, Delete
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';
import { TailwindPagination } from 'laravel-vue-pagination';

import { useToast } from "vue-toastification";
const toast = useToast();

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbBadge,
    FwbHeading,
    FwbButton,
    FwbModal
} from 'flowbite-vue'

const props = defineProps({
    tasks: [{}]
})
watch(
  () => props.tasks,
  (newValue, oldValue) => {
    getResults(pageNo.value);
  }
);

const emit = defineEmits(['refetchAllTasks'])
const taskListing = ref({});
const pageNo = ref(1)
const itemClasses = ["bg-white dark:bg-gray-800 border-gray-300 hover:bg-gray-50 first:rounded-l-lg last:rounded-r-lg"];
const activeClasses = ["bg-theme-primary-50 border-theme-primary-500 text-theme-primary-500"];
const getResults = async (page = 1) => {
    pageNo.value = page
    axios.get(`/tasks?page=${page}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then((r) => {
            taskListing.value = r.data;
            return r
        })
        .catch((e) => {
            return e
        });
}

getResults();

// let id = '';
const id = ref('')
const title = ref('')
const parent_id = ref('')
const status = ref('')
const validationErrors = ref({})
const isSubmitting = ref(false)
const isDeleting = ref(false)
let isShowEditModal = ref(false);
function closeEditModal() {
    isShowEditModal.value = false
}
function showEditModal(task) {
    id.value = task.id
    title.value = task.title
    parent_id.value = task.parent_id || ''
    status.value = task.status
    isShowEditModal.value = true
}
let isShowDeleteModal = ref(false);
function closeDeleteModal() {
    isShowDeleteModal.value = false
}
function showDeleteModal(task) {
    id.value = task.id
    isShowDeleteModal.value = true
}
const updateTask = () => {
    isSubmitting.value = true
    let payload = {
        title: title.value,
        status: status.value,
        parent_id: parent_id.value,
    }
    axios.patch(`/tasks/${id.value}`, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
            isSubmitting.value = false;
            id.value = '';
            title.value = '';
            status.value = '';
            parent_id.value = '';
            validationErrors.value = {};
            emit("refetchAllTasks");
            getResults(pageNo.value)
            closeEditModal();
            toast.success(response.data.message, {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: true,
                hideProgressBar: false,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        })
        .catch(error => {
            isSubmitting.value = false
            if (error.response.data.errors != undefined) {
                validationErrors.value = error.response.data.errors
            }
            return error
        });
}
const deleteTask = () => {
    isDeleting.value = true
    axios.delete(`/tasks/${id.value}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
            isDeleting.value = false;
            id.value = '';
            emit("refetchAllTasks");
            if(taskListing.value.data.length == 1){
                pageNo.value = pageNo.value - 1
            }
            getResults(pageNo.value)
            closeDeleteModal();
            toast.success(response.data.message, {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: true,
                hideProgressBar: false,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        })
        .catch(error => {
            isDeleting.value = false
            if (error.response.data.errors != undefined) {
                validationErrors = error.response.data.errors
            }
            return error
        });
}
const dateTime = (value) => {
    return moment(value).format('YYYY-MM-DD hh:mm:ss');
}
</script>


<script>
import axios from 'axios';
export default {
    name: 'TaskListing',
};
</script>