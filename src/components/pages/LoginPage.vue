<template>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
                class="absolute inset-0 bg-gradient-to-r from-pink-400 via-red-400 to-violet-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16">

                <div class="max-w-md mx-auto">
                    <div>
                        <h1 class="text-2xl font-semibold">Login</h1>
                    </div>
                    <div class="divide-y divide-gray-200">
                        <form class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <p v-if="Object.keys(validationErrors).length != 0" class='text-center '>
                                <small class='text-red-500'>Incorrect Email or Password</small>
                            </p>
                            <div class="relative">
                                <input autocomplete="off" v-model="email" id="email" name="email" type="email"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Email address" />
                                <label htmlFor="email"
                                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email
                                    Address</label>
                            </div>
                            <div class="relative">
                                <input autocomplete="off" v-model="password" id="password" name="password" type="password"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Password" />
                                <label htmlFor="password"
                                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                            </div>
                            <div class="relative">
                                <button
                                :disabled="isSubmitting"
                                @click="loginAction()" 
                                type="button"
                                class="w-full bg-[linear-gradient(to_right,#ef508b,#d64a8b,#8b208a,#71237d)] inline-block rounded-lg px-6 py-2 text-sm font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">Login</button>
                            <p class="text-center mt-1 text-sm">Don't have account? 
                                <router-link class="text-theme-primary-500" to="/register">Register here </router-link>
                            </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            validationErrors: {},
            isSubmitting: false,
        };
    },
    created() {
        if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
            this.$router.push('/dashboard')
        }
    },
    methods: {
        loginAction() {
            this.isSubmitting = true
            let payload = {
                email: this.email,
                password: this.password,
            }
            axios.post('/auth/login', payload)
                .then(response => {
                    localStorage.setItem('token', response.data.accessToken)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    this.$router.push('/dashboard')
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
                    return response
                })
                .catch(error => {
                    this.isSubmitting = false
                    if (error.response.data.errors != undefined) {
                        this.validationErrors = error.response.data.errors
                    }
                    if (error.response.data.error != undefined) {
                        this.validationErrors = error.response.data.error
                    }
                    return error
                });
        }
    },
};
</script>