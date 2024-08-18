<template>
  <!-- persistent -->
  <q-menu
    position="left"
    transition-show="jump-right"
    transition-hide="jump-left"
    fit
    :offset="[6,7]"
    style=" min-height: 450px;"
  >
    <q-card style=" max-width: fit-content; min-height: 450px;">
      <q-bar>
        <q-btn
          v-close-popup
          class="text-right"
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section
        horizontal
        class="row items-start no-wrap"
        style="padding:2px;"
      >
        <q-card-section class="q-pb-sm text-center text-subtitle2">
          <div
            class="text-primary"
          >
            <q-date
              v-model="rangeDate"
              range
            />
            <q-btn
              v-close-popup
              flat
              label="Close"
              @click="rangeSelected"
            />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script setup>
import { ref } from 'vue'

const emits = defineEmits(['selected'])

const rangeDate = ref({ from: null, to: null })

const rangeSelected = () => {
  console.log('range', rangeDate.value)

  emits('selected', rangeDate.value)
}

</script>
