<template>
  <div>
    <div class="row">
      <div class="col-md-4 form-group" v-for="(product, index) in products" v-bind:key="index">
        <q-card class="my-card" style="margin: 1% 4% 1% 1%;">
          <img :src="product.image" alt="colombia_logo" class="cursor-pointer" />

          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2">{{ product.description }}</div>
            <p>
              <span class="us">US$</span>
              <span class="price">{{ product.price.split('.')[0] }}</span>
              <span class="decimal">{{ product.price.split('.')[1] }}</span>
            </p>

            <div style="text-align:right;">
              <q-btn color="primary" @click="showForm(product)">
                <q-icon left name="add" />
                <q-icon left name="payment" />

                <q-tooltip>
                  Pagar con Tarjeta de crédito
                </q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
          </q-card-section>
        </q-card>
      </div>
    </div>

    <credit-card-form ref="$form" />
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'

import CreditCardForm from 'src/components/credit-card/CreditCardForm.vue'

import { api } from 'src/boot/axios'

const products = ref([])

const $form = ref(null)

const showForm = (product) => {
  $form.value?.show(product)
}

products.value = [
  {
    uuid: 'uuid',
    name: 'Producto prueba',
    description: 'Lorem ipsum',
    image: "/src/assets/pc.webp",
    price: '10.99',
    value_delivery: '1.50',
    total: '20.99'
  },
  {
    uuid: 'uuid',
    name: 'Producto prueba',
    description: 'Lorem ipsum',
    image: "/src/assets/pc.webp",
    price: '10.99',
    value_delivery: '1.50',
    total: '20.99'
  },
  {
    uuid: 'uuid',
    name: 'Producto prueba',
    description: 'Lorem ipsum',
    image: "/src/assets/pc.webp",
    price: '10.99',
    value_delivery: '1.50',
    total: '20.99'
  },
  {
    uuid: 'uuid',
    name: 'Producto prueba',
    description: 'Lorem ipsum',
    image: "/src/assets/pc.webp",
    price: '10.99',
    value_delivery: '1.50',
    total: '20.99'
  },
  {
    uuid: 'uuid',
    name: 'Producto prueba',
    description: 'Lorem ipsum',
    image: "/src/assets/pc.webp",
    price: '10.99',
    value_delivery: '1.50',
    total: '20.99'
  }
]

const loadProducts = async () => {
  const { data } = await api.get('http://localhost:3000/products')
  products.value = data
  console.log(data)
}

onMounted(() => {
  loadProducts()
})

</script>

<style>
.us {
  top: -.25em;
  font-size: 20px;
  position: relative;
}

.price {
  font-size: 35px;
}

.decimal {
  top: -1.25em;
  position: relative;
}
</style>