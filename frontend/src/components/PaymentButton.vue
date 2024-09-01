<template>
  <q-form ref="$form" @submit="submit">
    <q-btn :disabled="props.quantityAvailable <= 0" unelevated no-caps size="15px" style="width:100%" type="submit" icon="save" label="Realizar compra" color="primary">
      <q-tooltip v-if="props.quantityAvailable <= 0">
        NO PUEDE REALIZAR LA COMPRA, YA QUE EL PRODUCTO SE ENCUENTRA AGOTADO
      </q-tooltip>
    </q-btn>
  </q-form>
</template>

<script setup>
import { api } from 'src/boot/axios'

import { ref } from 'vue'

import { PUBLIC_KEY, CURRENCY, INTEGRITY_KEY, PENDING } from 'src/constants/globalVariables'

import { Notify } from 'quasar'

import { useRouter } from 'vue-router'

import { sha256, sha224 } from 'js-sha256';

const props = defineProps({ price: String, productId: Number, valueDelivery: String, quantityAvailable: Number })

const $router = useRouter()

const submit = async () => {
  try {
    const { data } = await api.post('payments/start-payment', {
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
    }
  }

  const checkout = await new WidgetCheckout(params)

  checkout.open(async function (result) {
    var transaction = result.transaction;

    const newData = {
      data: {
        transaction: transaction,
      },
    };

    try {
      const { data } = await api.post('payments/listening-payment', newData)
      $router.push(`payment/${data.paymentWompiId}/verify`)
    } catch(error) {
      console.log(error)
    }
  })
}

const generateSignature = async (reference, price) => {

  let signature = `${reference}${price}${CURRENCY}${INTEGRITY_KEY}`

  return sha256(signature)

  // const encondedText = new TextEncoder().encode(signature);
  // const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);

  // const hashArray = Array.from(new Uint8Array(hashBuffer));
  // const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // console.log(sha256(signature))
  // console.log(hashHex)

  // return hashHex
}
</script>
