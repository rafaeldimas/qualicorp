<template>
  <div class="box pt-6">
    <b-steps v-model="step">
      <step-location @selectedState="selectedState" @selectedCity="selectedCity" />
      <step-profission />
      <step-entity />

      <template #navigation="{ previous, next }">
        <b-field grouped position="is-centered">
          <b-button
            class="pagination-previous"
            icon-left="chevron-left"
            :disabled="previous.disabled"
            @click.prevent="canChangeStep(previous.action)"
          />
          <b-button
            class="pagination-next"
            icon-left="chevron-right"
            :disabled="next.disabled"
            @click.prevent="canChangeStep(next.action)"
          />
        </b-field>
      </template>
    </b-steps>
  </div>
</template>

<script>
import StepEntity from "@/components/CaptureCustomerData/StepEntity.vue";
import StepLocation from "@/components/CaptureCustomerData/StepLocation.vue";
import StepProfission from "@/components/CaptureCustomerData/StepProfission.vue";

export default {
  components: { StepLocation, StepProfission, StepEntity },
  name: "Steps",
  data() {
    return {
      step: 'location',
      state: null,
      city: null,
    };
  },
  computed: {
    hasLocation() {
      return !!this.state && !!this.city;
    },
  },
  methods: {
    canChangeStep(stepAction) {
      const verifyCanStep = {
        'location': () => this.hasLocation,
        'profission': () => true,
        'entity': () => true,
      };

      const stepErrorMessage = {
        'location': 'É preciso preencher os dados de localização antes de passar para a próxima etapa.',
        'profission': '',
        'entity': '',
      };

      verifyCanStep[this.step]()
        ? stepAction()
        : this.$buefy.toast.open({
          duration: 5000,
          message: stepErrorMessage[this.step],
          type: 'is-warning',
        });
    },
    selectedState(state) {
      this.state = state;
    },
    selectedCity(city) {
      this.city = city;
    },
  },
};
</script>
