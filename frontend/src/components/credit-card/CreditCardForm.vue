<template>
  <q-dialog persistent ref="$dialog" >
    <q-card flat bordered style="width: 100%; max-width: 1500px; height: 10%; min-height: 800px;">
      <q-scroll-area class="fit q-pr-sm">
        <q-card-section>
          <div class="row items-center no-wrap">
            <q-icon name="shopping_cart" size="md" class="q-mr-md" />
            <div class="col">
              <div class="text-h6">COMPRA DE PRODUCTO</div>
            </div>

            <q-space />

            <q-btn round flat v-close-popup icon="close" size="md" color="negative" />
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row" style="text-align: center;margin: auto;width: 50%;padding: 10px;">
            <div class="col-md-12 form-group">
              <q-card class="my-card">
                <img :src="product.image" alt="colombia_logo" class="cursor-pointer" />

                <q-card-section>
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <div class="text-h6">{{ product.name }}</div>
                      <div class="text-subtitle2">{{ product.description }}</div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-9 form-group" style="text-align:left">
                      Valor del producto:
                    </div>

                    <div class="col-md-3 form-group">
                      <p class="total">
                        ${{ new Intl.NumberFormat("en-IN").format(product.price) }}
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-9 form-group" style="text-align:left">
                      Valor de la entrega:
                    </div>

                    <div class="col-md-3 form-group">
                      <p class="total">
                        ${{ new Intl.NumberFormat("en-IN").format(product.valueDelivery) }}
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-9 form-group" style="text-align:left">
                      TOTAL:
                    </div>

                    <div class="col-md-3 form-group">
                      <p class="total">
                        ${{ new Intl.NumberFormat("en-IN").format(product.total) }}
                      </p>
                    </div>
                  </div>

                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group">
              <PaymentButton
                :price="product.price"
                :productId="product.id"
                :valueDelivery="product.valueDelivery"
              />
            </div>
          </div>

        </q-card-section>

      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

import PaymentButton from 'src/components/PaymentButton.vue'

import { maxLen, required, numeric, email } from 'src/lib/validators'

const product = ref({})

const $dialog = ref(null)
const $form = ref(null)

const creditNumber = ref(null)
const creditHolder = ref(null)
const creditMonth = ref(null)
const creditYear = ref(null)
const creditCcv = ref(null)
const emailValue = ref(null)
const address = ref(null)

const show = async (data) => {
  product.value = data
  $dialog.value?.show()
}

defineExpose({ show })
</script>


<style>
.total {
  font-size: large;
  font-weight: bold;
}
</style>
