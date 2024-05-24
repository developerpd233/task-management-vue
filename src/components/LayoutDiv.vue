<template>
  <div class="">
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Only for TEST</span>
            <img class="h-8 w-auto" src="/logo.svg" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link class="text-sm font-semibold leading-6 text-gray-900" to="/dashboard">My Tasks </router-link>
        </div>
        <PopoverGroup class="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover class="relative">
            <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Hello, {{ user.name }}
              <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel
                class="absolute right-0 top-full z-10 mt-3 overflow-hidden rounded-xl  bg-theme-danger-50 hover:bg-theme-danger-200 shadow-lg ring-1 ring-gray-900/5">
                <div class="py-2 px-4 cursor-pointer">
                  <div
                    class="group relative flex items-center gap-x-2 rounded-lg p-0 text-sm leading-6 bg-theme-danger-50 hover:bg-theme-danger-200">
                    <div
                      class="flex h-8 w-8 flex-none items-center justify-center rounded-lg">
                      <component :is="ArrowLeftEndOnRectangleIcon"
                        class="h-6 w-6 text-theme-danger-600" aria-hidden="true" />
                    </div>
                    <div class="flex-auto">
                      <a @click="logoutAction()" class="block font-semibold text-gray-900">
                        Logout
                        <span class="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

        </PopoverGroup>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-10" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Only for TEST</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                  <DisclosureButton
                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Profile
                    <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                  </DisclosureButton>
                </Disclosure>
                <a href="#"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
                <a href="#"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
              </div>
              <div class="py-6">
                <a href="#"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                  in</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    <slot></slot>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import { FwbDropdown } from 'flowbite-vue'


import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import { ChevronDownIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/20/solid'

const mobileMenuOpen = ref(false)

</script>
<script>
import axios from 'axios';
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  name: 'LayoutDiv',
    data() {
        return {
            user: {},
        };
    },
  created() {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null) {
      this.$router.push('/')
    } else {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    logoutAction() {
      axios.get('/auth/logout', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then((r) => {
          localStorage.setItem('token', "")
          localStorage.setItem('user', "")
          this.$router.push('/')
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
          return r
        })
        .catch((e) => {
          return e
        });
    }
  },
};
</script>