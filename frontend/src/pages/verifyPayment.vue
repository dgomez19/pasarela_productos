<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div class="row wrap justify-center items-center">
      <div class="col-md-8">

        <q-card v-if="!payment" flat class="bg-grey-3 q-pa-lg">
          <div>
            <q-spinner color="primary" size="2em" /> Cargando información del pago...
          </div>
        </q-card>

        <q-card flat class="bg-grey-3 q-pa-lg" v-if="error">
          {{ error }}
        </q-card>

        <q-card v-if="payment">
          <q-banner class="bg-primary text-white">
            <template v-slot:avatar>
              <q-icon v-if="payment.status == STATUS_PAYMENT_APPROVED" name="check" class="text-green" />
            </template>
            <p class="text-weight-bold q-mb-none">
              EL PAGO SE ENCUENTRA EN ESTADO
              <q-badge style="text-transform: uppercase;font-weight:bold;font-size:large" rounded :label="TRADUCTION_STATUS[payment.status]" :color="COLOR_STATUS[payment.status]" />
            </p>
          </q-banner>

          <q-card-section>
            <div class="row justify-center">
              <div class="col-md-12">
                <p>Datos de la transacción</p>

                <q-markup-table flat separator="cell">
                  <tbody>
                    <tr>
                      <td>
                        <span class="text-weight-bold">NOMBRE COMPLETO</span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{ payment.name }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="text-weight-bold">CORREO</span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {{ payment.email }}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span class="text-weight-bold">VALOR PAGADO</span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        ${{ new Intl.NumberFormat().format(payment.value) }}
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </div>
            </div>

              <div class="row">
                <div class="col-md-12 form-group">
                  <q-card class="my-card">
                    <img :src="`${url}${product.image}`" alt="colombia_logo" class="cursor-pointer" />

                    <q-card-section>
                      <div class="row">
                        <div class="col-md-12 form-group">
                          <div class="text-h6">{{ product.name }}</div>
                          <div class="text-subtitle2">{{ product.description }}</div>
                        </div>
                      </div> <br>

                      <div class="row">
                        <div class="col-md-6 form-group" style="text-align:left">
                          Valor del producto:
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6 form-group price" style="text-align:left;">
                          ${{ new Intl.NumberFormat().format(product.price) }}
                        </div>
                      </div> <br>

                      <div class="row">
                        <div class="col-md-9 form-group" style="text-align:left">
                          Valor de la entrega:
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-3 form-group" style="text-align:left">
                          <p class="price">
                            ${{ new Intl.NumberFormat().format(product.valueDelivery) }}
                          </p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-9 form-group" style="text-align:left">
                          TOTAL:
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-3 form-group" style="text-align:left">
                          <p class="price">
                            ${{ new Intl.NumberFormat().format(product.total) }}
                          </p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-9 form-group" style="text-align:left">
                          CANTIDAD DISPONIBLE:
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-3 form-group" style="text-align:left">
                          <p class="price">
                            {{ new Intl.NumberFormat().format(product.quantityAvailable) }}
                          </p>
                        </div>
                      </div>

                    </q-card-section>
                  </q-card>
                </div>


            <div class="col-md-12 q-pt-lg" v-if="payment.status == STATUS_PAYMENT_APPROVED || payment.status == STATUS_PAYMENT_DECLINED">
              <q-banner dense class="bg-grey-3 primary q-mt-lg">
                <template v-slot:avatar>
                  <q-icon name="warning" color="primary" />
                </template>
                <span :class="$q.dark.isActive ? 'text-black' : ''">
                  Al correo electrónico registrado al inicio <span class="text-bold">{{ payment.email }}</span>
                  se envió el comprobante de la transacción.
                </span>
              </q-banner>
            </div>
          </div>
          </q-card-section>
        </q-card>

        <q-btn
          v-show="payment"
          :color="$q.dark.isActive ? 'light-green-14' : 'primary'"
          label="Imprimir"
          class="q-mr-sm q-mt-md q-px-md"
          :class="$q.dark.isActive ? 'text-black' : ''"
          @click="onPrint()"
        />
        <q-btn
          to="/"
          color="grey-3"
          text-color="black"
          label="Regresar al inicio"
          class="q-mt-md q-px-md"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// import moment from 'moment'

import { api } from 'src/boot/axios'

import { useRoute } from 'vue-router'

import {
  STATUS_PAYMENT_PENDING,
  STATUS_PAYMENT_APPROVED,
  STATUS_PAYMENT_DECLINED,
  STATUS_PAYMENT_ERROR,
  TRADUCTION_STATUS,
  COLOR_STATUS
} from 'src/constants/globalVariables'

const $route = useRoute()

const payment = ref(null)

const error = ref(null)

const product = ref(null)

const url = ref(process.env.API_URL)

const loadData = async () => {
  try {
    const { data } = await api.get(`payments/verify-payment/${$route.params.paymentWompiId}`)
    payment.value = data
    product.value = data.product
  } catch (err) {
    error.value = err.response.data.detail
  }
}

// const formatDate = (date) => {
//   return moment(date).format('YYYY-MM-DD hh:mm:ss')
// }

const onPrint = () => {
  print()
}

onMounted(() => loadData())

</script>
