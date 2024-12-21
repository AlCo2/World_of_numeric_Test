<script setup>
import { ref, onMounted, reactive } from "vue";
import { getCategoriesAnalyses, getProducts } from "../api";
import { scales } from "chart.js";

onMounted(() => {
    fetchCategoriesAnalyses();
    fetchProductAnalyses();
});

const categoires = reactive({
  data: null,
  error: null,
  loading: null
})
const products = reactive({
  data: null,
  error: null,
  loading: null
})

async function fetchCategoriesAnalyses(){
    categoires.error = categoires.data = null;
    categoires.loading   = true;
    try {
        await getCategoriesAnalyses().then((response)=>{
            categoires.data = setCategoriesData(response.data);
    });
    }
    finally {
        categoires.loading = false;
    }
}

async function fetchProductAnalyses(){
    products.error = products.data = null;
    products.loading   = true;
    try {
        await getProducts().then((response)=>{
            products.data = setProductData(response.data);
        })
    }
    finally {
        products.loading = false;
    }
}

const setCategoriesData = (categoires) => {
    return {
        labels: ['Electronics', 'Home & Kitchen', 'Books', 'Clothing', 'Sports & Outdoors'],
        datasets: [
            {
                data: [categoires['Electronics'], categoires['Home & Kitchen'], categoires['Books'], categoires['Clothing'], categoires['Sports & Outdoors']],
            }
        ]
    };
};

const setProductData = (products) => {
    let titles = [];
    let prices = [];
    for (const product of products)
    {
        titles.push(product.ProductName);
        prices.push(product.QuantitySold);
    }
    return {
        labels: titles,
        datasets: [
            {
                label: 'Sales',
                data: prices,
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1,
            }
        ], 
    };
};
</script>
<template>
    <p class="text-primary font-bold text-xl my-4">Analytics</p>
    <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-borderh-20 flex justify-center items-center">
        <ProgressSpinner v-if="products.loading"/>
        <div v-if="products.data" class="overflow-auto">
            <Chart class="w-[50rem]" type="bar" :data="products.data"/>
        </div>
        <div v-if="!products.loading && !products.data">
            <p>there is no data to show</p>
        </div>
    </div>
    <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-borderh-20 flex justify-center items-center my-4">
        <ProgressSpinner v-if="categoires.loading"/>
        <div v-if="categoires.data">
            <Chart type="pie" :data="categoires.data" class="w-full md:w-[30rem]" />
        </div>
        <div v-if="!categoires.loading && !categoires.data">
            <p>there is no categories statistique to show</p>
        </div>
    </div>
</template>