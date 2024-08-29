<template>
  <q-form ref="$form" @submit="submit">
    <div class="row">
      <div style="width:100%;">
        <q-input dense v-model="emailValue" label="Correo electrónico *" lazy-rules :rules="[required, email]" />
      </div>
    </div>

    <q-btn unelevated no-caps size="15px" style="width:100%" type="submit" icon="save" label="Realizar compra" color="primary" />
  </q-form>
</template>

<script setup>
import { api } from 'src/boot/axios'

import { ref } from 'vue'

import { PUBLIC_KEY, CURRENCY, INTEGRITY_KEY, PENDING } from 'src/constants/globalVariables'

import { maxLen, required, numeric, email } from 'src/lib/validators'

import { Notify } from 'quasar'

const props = defineProps({ price: String, productId: Number, valueDelivery: String })

const emailValue = ref(null)

const submit = async () => {
  try {
    const { data } = await api.post('http://127.0.0.1:3000/payments/start-payment', {
      email: emailValue.value,
      status: PENDING,
      value: props.price,
      valueDelivery: props.valueDelivery,
      productId: props.productId
    });

    await generateModalWompi(data.paymentId);
  } catch (err) {
    Notify.create({ type: 'error', message: err.response.data.error })
  }
}

const generateModalWompi = async (reference) => {

  const price = parseInt(`${props.price}00`)

  const signature = await generateSignature(
    reference,
    price
  )

  const params = {
    currency: CURRENCY,
    amountInCents: price,
    reference: reference,
    publicKey: PUBLIC_KEY,
    signature: {
      integrity : signature
    },
    redirectUrl: 'https://transaction-redirect.wompi.co/check', // Opcional
    taxInCents: { // Opcional
      vat: 1900,
      consumption: 800
    },
    customerData: { // Opcional
      email: emailValue.value,
      fullName: 'Lola Flores',
      phoneNumber: '3040777777',
      phoneNumberPrefix: '+57',
      legalId: '123456789',
      legalIdType: 'CC'
    }
  }

  const checkout = await new WidgetCheckout(params)

  console.log('checkout', checkout)

  checkout.open(function (result) {
    var transaction = result.transaction;
    console.log("Transaction ID: ", transaction.id);
    console.log("Transaction object: ", transaction);
  })
}

const generateSignature = async (reference, price) => {

  let signature = `${reference}${price}${CURRENCY}${INTEGRITY_KEY}`

  const encondedText = new TextEncoder().encode(signature);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // "37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5"
  
  return hashHex
}
</script>
