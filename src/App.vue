<template>
  <div id="app" class="hero is-fullheight has-background-grey-lighter">
    <div class="hero-body">
      <div class="container">
        <form-capture-customer-data-steps/>
      </div>
    </div>
  </div>
</template>

<script>
import FormCaptureCustomerDataSteps from '@/components/CaptureCustomerData/Steps.vue'

export default {
  name: 'App',
  components: {
    FormCaptureCustomerDataSteps
  }
}
</script>
