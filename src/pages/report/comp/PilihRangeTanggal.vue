<template>
  <q-dialog>
    <q-card class="full-width">
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="col-auto">
            <q-btn
            label="Bulan Ini"
            :flat="periode!=='bulan'"
            :push="periode==='bulan'"
            :color="periode==='bulan'?'primary':''"
            no-caps
            @click="bulan"
            />
          </div>
          <div class="col-auto">
            <q-btn
            label="Range Tanggal"
            :flat="periode==='bulan'"
            :push="periode!=='bulan'"
            :color="periode!=='bulan'?'primary':''"
            no-caps
            @click="pilihRange"
            >
            <MenuTanggal @selected="selected"/>
          </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { date } from 'quasar'
import { defineAsyncComponent, ref } from 'vue'

const emits = defineEmits(['gantiPeriode'])

const MenuTanggal = defineAsyncComponent(() => import('src/pages/report/comp/MenuTanggal.vue'))

const periode = ref('bulan')
const from = ref(date.formatDate(Date.now(), 'YYYY-MM-01'))
const to = ref(date.formatDate(Date.now(), 'YYYY-MM-31'))

function bulan () {
  periode.value = 'bulan'
  from.value = date.formatDate(Date.now(), 'YYYY-MM-01')
  to.value = date.formatDate(Date.now(), 'YYYY-MM-31')
  const temp = {
    periode: periode.value,
    from: from.value,
    to: to.value
  }
  emits('gantiPeriode', temp)
}
function pilihRange () {
  periode.value = 'range'
}
function selected (val) {
  from.value = val.from
  to.value = val.to
  const temp = {
    periode: periode.value,
    from: from.value,
    to: to.value
  }
  emits('gantiPeriode', temp)
  // console.log('val', val)
}
</script>
