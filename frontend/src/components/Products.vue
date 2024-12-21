<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getProducts } from '../api';

const skeletonProducts = ref(new Array(5));
const products = reactive({
  data: null,
  error: null,
  loading: null
})
async function fetchData(){
  products.error = products.data = null;
  products.loading   = true;
  try {
    await getProducts().then((response)=>{
        products.data = response.data;
    });
  }
  finally {
    products.loading = false;
  }
}
onMounted(fetchData);
</script>

<template>
    <p class="text-primary font-bold text-xl">Product List</p>
    <div class="my-4 bg-surface-0 dark:bg-surface-900 shadow py-4">
      <DataTable v-if="products.loading" :value="skeletonProducts" tableStyle="min-width: 50rem">
        <Column style="width: 5%;" field="ProductID" header="ID">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column field="ProductName" header="Name">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column field="Category" header="Category">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column field="Price" header="Price">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
      </DataTable>
      <DataTable v-if="!products.loading" removableSort paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :value="products.data" tableStyle="min-width: 50rem">
        <template #empty>
          <p class="text-center">
            There is no products to show
          </p>
        </template>
        <Column style="width: 5%;" sortable field="ProductID" header="ID"></Column>
        <Column field="ProductName" sortable header="Name"></Column>
        <Column field="Category" sortable header="Category"></Column>
        <Column field="Price" sortable header="price"></Column>
        <Column field="QuantitySold" sortable header="Sold"></Column>
      </DataTable>
    </div>
</template>