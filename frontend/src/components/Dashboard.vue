
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getProducts, getTrendingProducts } from '../api';

const skeletonProducts = ref(new Array(5));
const total_sales = reactive({
    data: null,
    error: null,
    loading: null,
})
const trending_products = reactive({
    data: null,
    error: null,
    loading: null,
})
async function fetchTotalSales(){
  total_sales.error = total_sales.data= null
  total_sales.loading = true
  try {
    await getProducts().then((response)=>{
        for(const product of response.data){
            total_sales.data += product.Price * product.QuantitySold;
        }
    });
  }
  finally {
    total_sales.loading = false
  }
}

async function fetchTrendingProducts(){
  trending_products.error = trending_products.data= null
  trending_products.loading = true
  try {
    await getTrendingProducts().then((response)=>{
        trending_products.data = response.data;
    });
  }
  finally {
    trending_products.loading = false
  }
}
onMounted(()=>{
    fetchTrendingProducts();
    fetchTotalSales();
});
</script>
<template>
    <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-borderh-20 flex justify-between">
        <div class="flex flex-col justify-between">
            <div>
                <p class="block text-primary font-medium mb-4">Total Sales</p>
            </div>
            <div>
                <ProgressSpinner class="!w-10 !h-10" v-if="total_sales.loading"/>
                <p v-if="total_sales.error">Error</p>
                <p v-if="total_sales.data" class="text-surface-900 dark:text-surface-0 font-medium !text-xl">{{ parseFloat(total_sales.data).toFixed(2) }} DH</p>
            </div>
        </div>
        <div>
            <i class="pi pi-shopping-cart text-blue-500 dark:text-blue-200 !text-xl" />
        </div>
    </div>
    <div class="my-4">
        <p class="text-surface-500 dark:text-surface-300 font-bold mb-4">trending Products</p>
    </div>
    <DataTable v-if="trending_products.loading" :value="skeletonProducts" tableStyle="min-width: 50rem">
        <Column style="width: 5%;" field="ProductID" header="ID">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column style="width: 20%;" field="ProductName" header="Name">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column style="width: 20%;" field="Category" header="Category">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column style="width: 20%;" field="Price" header="Price">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column style="width: 20%;" field="QuantitySold" header="Sold">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
    </DataTable>
    <DataTable v-if="!trending_products.loading" :value="trending_products.data" tableStyle="min-width: 50rem">
        <template #empty>
            <p class="text-center">
            There is no products to show
            </p>
        </template>
        <Column style="width: 5%;" field="ProductID" header="ID">
        </Column>
        <Column style="width: 20%;" field="ProductName" header="Name"></Column>
        <Column style="width: 20%;" field="Category" header="Category"></Column>
        <Column style="width: 20%;" field="Price" header="Price"></Column>
        <Column style="width: 20%;" field="QuantitySold" header="Sold"></Column>
    </DataTable>
</template>