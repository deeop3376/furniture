<template>
  <div class="home">
    <tou />
    
    <div class="main_body">
          <sort />
          <hotSale />
    <indisplay />
    </div>
  </div>
</template>

<script>

import tou from '@/components/header'
 import hotSale from '@/components/hotSale'
import sort from '@/components/sort'
import indisplay from '@/components/indisplay'
export default {
  name: 'Home',
  components: {
    tou,
    hotSale,
    sort,
    indisplay
  }
}
</script>
<style scoped>
.main_body{width:90%;margin:0 auto}
</style>
