<template>

    <!-- <div class="py-6"> -->
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 text-gray-900 dark:text-gray-100">
                <form class="w-full">
                    <div class="flex flex-wrap -mx-3">
                        <div class="w-full px-3 mb-6 md:mb-3">
                            <label for="title"
                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 dark:text-gray-300">
                                title
                            </label>

                            <div class="flex">
                                <span
                                    class="w-10 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-200 border-e-0 rounded-s-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <font-awesome-icon icon="underline"
                                        class="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
                        <div class="w-full md:w-5/12 px-3 mb-6 md:mb-3">
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

                                    <option v-for="task in tasks" :value="task.id">{{ task.title }}</option>
                                </select>
                            </div>
                            <div v-if="validationErrors.parent_id" class="flex flex-col">
                                <small class="text-theme-danger-500">
                                    {{ validationErrors?.parent_id[0] }}
                                </small>
                            </div>
                        </div>
                        <div class="w-full md:w-5/12 px-3 mb-6 md:mb-3">
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
                        <div class="w-full md:w-2/12 px-3 mb-6 md:mb-3 mt-5">
                            <button :disabled="isSubmitting" @click="createTask()" type="button"
                                class="w-full bg-[linear-gradient(to_right,#ef508b,#d64a8b,#8b208a,#71237d)] inline-block rounded-lg p-3 text-sm font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import { useToast } from "vue-toastification";

export default {
    setup() {
        const toast = useToast();
        return { toast }
    },

    props: ['tasks'],
    name: 'TaskCreate',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            title: '',
            parent_id: '',
            status: '',
            validationErrors: {},
            isSubmitting: false,
        };
    },
    methods: {
        createTask() {
            this.isSubmitting = true
            let payload = {
                title: this.title,
                status: this.status,
                parent_id: this.parent_id,
            }
            axios.post('/tasks', payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
                .then(response => {
                    this.$emit("refetchAllTasks");
                    this.isSubmitting = false
                    this.title = '';
                    this.status = '';
                    this.parent_id = '';
                    this.validationErrors = {};
                    this.toast.success(response.data.message, {
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
                    this.isSubmitting = false
                    if (error.response.data.errors != undefined) {
                        this.validationErrors = error.response.data.errors
                    }
                    return error
                });
        }
    },
};
</script>