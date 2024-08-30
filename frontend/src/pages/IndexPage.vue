<template>
  <div>
    <div class="row">
      <div class="col-md-4 form-group" v-for="(product, index) in products" v-bind:key="index">
        <q-card class="my-card" style="margin: 1% 4% 1% 1%;">
          <img :src="`${url}${product.image}`" alt="colombia_logo" class="cursor-pointer" style="height:500px"/>

          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2">{{ product.description.substring(0, 90) }} ...</div> <br>

            <div class="row">
              <div class="col-md-6 form-group">
                <span class="us">Precio</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 form-group">
                <span class="price">
                  ${{ new Intl.NumberFormat().format(product.price) }}
                </span>
              </div>
            </div> <br>

            <div class="row">
              <div class="col-md-6 form-group">
                <span class="us">Cantidad disponible</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 form-group">
                <span class="price">
                  {{ new Intl.NumberFormat().format(product.quantityAvailable) }}
                </span>
              </div>
            </div>

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

const url = ref(process.env.API_URL)

const $form = ref(null)

const showForm = (product) => {
  $form.value?.show(product)
}

const loadProducts = async () => {
  const { data } = await api.get('products')
  products.value = data
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
  font-size: 20px;
  color: brown;
}

.decimal {
  top: -1.25em;
  position: relative;
}
</style>
