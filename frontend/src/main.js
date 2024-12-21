import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import { Avatar, Badge, Button, Column, DataTable, Menu, ProgressSpinner, Skeleton } from 'primevue';
import { router } from './router';
import Chart from 'primevue/chart';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});

app.component('Button', Button);
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Menu', Menu);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Skeleton', Skeleton);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Chart', Chart);
app.use(router);
app.mount('#app');