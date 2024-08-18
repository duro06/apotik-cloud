<!-- @format -->

<template>
  <q-page class="flex column flex-center">
    <q-card
      flat
      bordered
      class="card-login"
    >
      <q-card-section>
        <div
          class="text-center"
          style="margin-top: 30px"
        >
          <q-avatar>
            <img src="~assets/logos/logo.png">
          </q-avatar>
          <div class="text-h6 text-white">
            Halaman Login
          </div>
          <div class="text-white">
            Silahkan Anda Login Terlebih Dahulu
          </div>
        </div>
        <q-form
          ref="myForm"
          class="q-pa-md"
          style="margin-top: 70px; z-index: 1"
          @submit="onSubmit"
        >
          <app-input
            v-model="form.email"
            dense
            label="email"
            validator="email"
            icon="email"
          />
          <app-input
            v-model="form.password"
            dense
            type="password"
            label="password"
            icon="key"
            class="q-mt-sm"
          />

          <div style="margin-top: 50px">
            <app-btn
              type="submit"
              :loading="storeAuth.loading"
              class="full-width"
              label="Login"
            />
          </div>
          <div style="margin-top: 10px; z-index: 10">
              <q-btn
                :loading="storeAuth.loading"
                class="full-width"
                color="white"
                rounded
                @click="loginGoogle"
              >
              <img src="~assets/logos/google.png"
              ratio="16/9"
              height="20px"
              >
            </q-btn>
            </div>
        </q-form>
      </q-card-section>
      <div
        class="absolute-bottom q-pa-lg text-grey-4"
        style="z-index: 1"
      >
        <q-separator />
        <div class="">
          Aplikasi E-ACHY ini tidak di perjualbelikan secara bebas tanpa seizin dari
          pembuatnya.
        </div>
        <div class="q-mt-lg text-right f-14">
          E-ACHY Cloud Versi BETA
        </div>
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { base } from 'src/boot/axios'

const storeAuth = useAuthStore()
const $q = useQuasar()

const myForm = ref(null)
const form = ref({
  email: '',
  password: '',
  device_name: $q.platform.is.name + '-' + $q.platform.is.platform
})

function onSubmit () {
  storeAuth.login(form.value).then(() => {
    window.location.reload()
  })
}
function loginGoogle () {
  const redirect = base + '/auth/google/redirect'
  window.open(redirect, '_blank')
  console.log('login google', base)
}
</script>

<style lang="scss" scoped>
.card-login {
  width: 360px;
  min-height: 600px;
  overflow: hidden;
  position: relative;
  &::before {
    content: '';
    width: 360px;
    height: 200px;
    position: absolute;
    border-top-left-radius: 384px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 168%;
    border-bottom-left-radius: 4%;
    border-top-style: groove;
    border-bottom: ridge;
    background: linear-gradient(-45deg, $secondary, $primary);
    overflow: hidden;
  }

  &::after {
    content: '';
    width: 784px;
    height: 555px;
    position: absolute;
    top: 288px;
    left: -70px;
    border-width: thick;
    border-top-width: thick;
    border-right-width: thick;
    border-bottom-width: thick;
    border-left-width: thick;
    border-top-style: groove;
    border-top-left-radius: 723%;
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0%;
    border-bottom-left-radius: 12%;
    background: linear-gradient(-45deg, $secondary, $primary);
    overflow: hidden;
  }
}

@media (max-width: 800px) {
  .card-login {
    width: 100vw;
    height: 100vh;
    border-radius: 0px;
    &::before {
      width: 100vw;
    }
  }
}
</style>
