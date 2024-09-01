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
                        <span>
                          US$
                        </span>
                        {{ product.price }}
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-9 form-group" style="text-align:left">
                      Valor de la entrega:
                    </div>

                    <div class="col-md-3 form-group">
                      <p class="total">
                        <span>
                          US$
                        </span>
                        {{ product.value_delivery }}
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-9 form-group" style="text-align:left">
                      TOTAL:
                    </div>

                    <div class="col-md-3 form-group">
                      <p class="total">
                        <span>
                          US$
                        </span>
                        {{ product.total }}
                      </p>
                    </div>
                  </div>

                </q-card-section>
              </q-card>
            </div>
          </div>
          <q-form ref="$form" @submit="submit">
            <div class="row">
              <div style="width:100%;">
                <q-input dense v-model="emailValue" label="Correo electrónico *" lazy-rules :rules="[required, email]" />
              </div>
            </div>

            <div class="row">
              <div style="width:100%;">
                <q-input dense v-model="address" label="Dirección *" lazy-rules :rules="[required]" />
              </div>
            </div>

            <div class="row">
              <div style="width:100%">
                <q-input dense v-model="creditNumber" label="Número de la tarjeta *" lazy-rules :rules="[required, numeric]" />
              </div>
            </div>

            <div class="row">
              <div style="width:100%">
                <q-input dense v-model="creditHolder" label="Titular de la tarjeta *" lazy-rules :rules="[required]" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-3 form-group">
                <q-input dense v-model="creditMonth" label="Mes *" lazy-rules :rules="[required, numeric, maxLen(2)]" />
              </div> <div class="col-md-1">&nbsp;</div>

              <div class="col-md-3 form-group">
                <q-input dense v-model="creditYear" label="Año *" lazy-rules :rules="[required, numeric, maxLen(4)]" />
              </div> <div class="col-md-1 form-group">&nbsp;</div>

              <div class="col-md-3 form-group">
                <q-input dense v-model="creditCcv" label="CVV *" lazy-rules :rules="[required, numeric, maxLen(3)]" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 form-group">
                <q-btn unelevated no-caps size="15px" style="width:100%" type="submit" icon="save" label="Realizar compra" color="primary" />
              </div>
            </div>
          </q-form>
        </q-card-section>

      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

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

const checkout = new WidgetCheckout({
  currency: 'COP',
  amountInCents: 2490000,
  reference: 'sk8-438k4-xmxm392-sn2m',
  publicKey: 'pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf',
  signature: {integrity : '727a49e47b8be25da69b52222e544a9d1d77f4085a0c266ef4116315e65a911d'},
  redirectUrl: 'https://transaction-redirect.wompi.co/check', // Opcional
  taxInCents: { // Opcional
    vat: 1900,
    consumption: 800
  },
  customerData: { // Opcional
    email:'lola@gmail.com',
    fullName: 'Lola Flores',
    phoneNumber: '3040777777',
    phoneNumberPrefix: '+57',
    legalId: '123456789',
    legalIdType: 'CC'
  },
  shippingAddress: { // Opcional
    addressLine1: "Calle 123 # 4-5",
    city: "Bogota",
    phoneNumber: '3019444444',
    region: "Cundinamarca",
    country: "CO"
  }
})

const submit = () => {
  checkout.open(function (result) {
    var transaction = result.transaction;
    console.log("Transaction ID: ", transaction.id);
    console.log("Transaction object: ", transaction);
  });
}

const show = async (data) => {
  product.value = data
  $dialog.value?.show()
}

// const submit = async (row) => {
//   const success = await $form?.value.validate()

//   if (!success) return
// }

defineExpose({ show })
</script>


<style>
.total {
  font-size: large;
  font-weight: bold;
}
</style>