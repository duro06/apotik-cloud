<template>
  <div>
    <div class="row text-weight-bold">
      A. Penjualan
    </div>
    <div class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">Penjualan</div>
      <div class="col-6 text-right text-green">{{formatDouble( laporan?.penjualanP)}}</div>
    </div>
    <div class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">Retur Penjualan</div>
      <div class="col-6 text-right text-green">{{formatDouble( laporan?.returPenjualanP)}}</div>
    </div>
    <div class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">Penjualan Bersih</div>
      <div class="col-6 text-right text-green">{{formatDouble( laporan?.penjualanBersih)}}</div>
    </div>
    <div class="row text-weight-bold q-mt-sm">
      B. Harga Pokok Penjualan (HPP)
    </div>
    <div class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">HPP</div>
      <div class="col-6 text-right text-negative">{{formatDouble( laporan?.hpp)}}</div>
    </div>
    <div class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">Laba kotor</div>
      <div class="col-6 text-right text-green">{{formatDouble( laporan?.penjualanBersih - laporan?.hpp)}}</div>
    </div>
    <div class="row text-weight-bold q-mt-sm">
      C. Pengeluaran
    </div>
    <div v-if="laporan?.masterBeban?.length">
      <div v-for="beban in laporan?.masterBeban" :key="beban" class="row items-center justify-between" style="border-bottom: 1px solid black;">
        <div class="col-6">{{beban?.nama}}</div>
        <div class="col-6 text-right text-negative">{{formatDouble( beban?.total)}}</div>
      </div>

    </div>
    <div class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">Total Pengeluaran</div>
      <div class="col-6 text-right text-negative">{{formatDouble( laporan?.totBeban)}}</div>
    </div>
    <div v-if="laporan?.labaRugi>0" class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">Laba Bersih</div>
      <div class="col-6 text-right text-greed">{{formatDouble( laporan?.labaRugi)}}</div>
    </div>
    <div v-if="laporan?.labaRugi<=0" class="row items-center justify-between" style="border-bottom: 1px solid black;">
      <div class="col-6">Rugi</div>
      <div class="col-6 text-right text-negative">{{formatDouble( laporan?.labaRugi)}}</div>
    </div>
  </div>
</template>
<script setup>
import { formatDouble } from 'src/modules/formatter'

defineProps({
  laporan: { type: Object, default: () => {} }
})
</script>
