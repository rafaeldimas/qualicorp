<template>
  <div id="app">
    <form-capture-customer-data/>
  </div>
</template>

<script>
import FormCaptureCustomerData from './components/FormCaptureCustomerData.vue'

export default {
  name: 'App',
  components: {
    FormCaptureCustomerData
  }
}
</script>
