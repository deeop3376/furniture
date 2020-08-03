<template>
  <div class="home">
    <tou />
    
    <div class="main_body">
          <sort />
          <hotSale />
    <!-- <indisplay /> -->
    <newGood />
    </div>
  </div>
</template>

<script>

import tou from '@/components/header'
import hotSale from '@/components/hotSale'
import sort from '@/components/sort'
import indisplay from '@/components/indisplay'
import newGood from '@/components/newGood'
export default {
  name: 'Home',
  components: {
    tou,
    hotSale,
    sort,
    indisplay,
    newGood
  }
}
</script>
<style scoped>
.main_body{width:1200px;margin:0 auto}
</style>
