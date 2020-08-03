<template>
  <div class="home">
    <tou />
    
    <div class="main_body">
          <sort />
          <hotSale />
        <newGood />
        <indexSofa />
    </div>
      <footer1 />
      
  </div>
</template>

<script>

import tou from '@/components/header'
import hotSale from '@/components/hotSale'
import sort from '@/components/sort'
import indisplay from '@/components/indisplay'
import newGood from '@/components/newGood'
import footer1 from '@/components/footer1'
import indexSofa from '@/components/indexSofa'
export default {
  name: 'Home',
  components: {
    tou,
    hotSale,
    sort,
    indisplay,
    newGood,
    footer1,
    indexSofa
  }
}
</script>
<style scoped>
.main_body{width:1200px;margin:0 auto}
</style>
