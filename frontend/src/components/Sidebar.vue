<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const items = ref([
    {
        separator: true
    },
    {
        label: 'Dashboard',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-book',
                link: '/'
            },
            {
                label: 'Analytics',
                icon: 'pi pi-chart-line',
                link: '/analytics'
            },
            {
                label: 'Products',
                icon: 'pi pi-cart-minus',
                link: '/products'
            },
            
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
            },
            {
                label: 'Messages',
                icon: 'pi pi-inbox',
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
            }
        ]
    },
    {
        separator: true
    }
]);
</script>
<template>
    <div class="card flex justify-left">
        <Menu :model="items" class="w-full md:w-60">
            <template #start>
                <p class="inline-flex items-center gap-1 px-2 py-2 font-bold">
                    WorldOfNumeric
                </p>
            </template>
            <template #submenulabel="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <RouterLink :to="item.link?item.link:''">
                    <a class="flex items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>    
                    </a>
                </RouterLink>
            </template>
            <template #end>
                <button class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                    <Avatar image="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" class="mr-2" shape="circle" />
                    <span class="inline-flex flex-col items-start">
                        <span class="font-bold">Abdellah Lahboub</span>
                        <span class="text-sm">Admin</span>
                    </span>
                </button>
            </template>
        </Menu>
    </div>
</template>