<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-white text-dark">
      <q-toolbar class="q-px-md q-py-xs bg-secondary text-white">
        <strong>Wompi</strong>
      </q-toolbar>

      <q-toolbar class="flex-center q-pa-md" style="min-height: auto;">
        <div class="row items-center q-gutter-x-md" style="width: 100%; max-width: 1024px">

          <div class="column">
            <div class="text-subtitle1 text-bold">Productos</div>
            <div class="text-body2">&nbsp;</div>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <footer class="bg-primary text-white q-py-lg" style="margin-top: 80px">
      <q-toolbar class="flex-center">
        <q-card flat bordered class="row bg-white text-dark rounded-borders q-pa-xl" style="width: 100%; max-width: 1024px; margin-top: -80px">
          <div class="col-12 col-sm-11 row">
            <div class="column text-body2">
              <div class="text-h6 text-primary">
                <img src="~/assets/logo.svg" alt="colombia_logo" class="cursor-pointer" />
              </div>

            </div>
          </div>
          <div class="col-12 col-sm-1 flex justify-center">
          </div>
        </q-card>
      </q-toolbar>
    </footer>

    <footer class="bg-secondary text-dark q-px-md q-py-sm">
    </footer>

  </q-layout>
</template>

<script setup>
</script>
