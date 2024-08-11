<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="dark?'':'page-light'"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const $q = useQuasar()

const dark = computed(() => {
  return $q.dark.isActive
})

</script>
