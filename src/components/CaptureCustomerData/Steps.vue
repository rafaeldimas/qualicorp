<template>
  <div class="box pt-6">
    <b-steps v-model="step">
      <step-location
        @selectedState="selectedState"
        @selectedCity="selectedCity"
      />

      <step-profission
        :location="{state, city}"
        @selectedProfission="selectedProfission"
      />

      <step-entity
        :state="state"
        :city="city"
        :profission="profission"
        @selectedEntity="selectedEntity"
      />

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
      profission: null,
      entity: null,
      "entidade": "CAASP",
      "uf": "SP",
      "cidade": "São Paulo",
      "datanascimento": ["1987-09-16"]
    };
  },
  computed: {
    hasLocation() {
      return !!this.state && !!this.city;
    },
    hasProfission() {
      return !!this.profission;
    },
    hasEntity() {
      return !!this.entity;
    },
  },
  methods: {
    canChangeStep(stepAction) {
      const verifyCanStep = {
        'location': () => this.hasLocation,
        'profission': () => this.hasProfission,
        'entity': () => this.hasEntity,
      };

      const stepErrorMessage = {
        'location': 'É preciso preencher os dados de localização antes de passar para a próxima etapa.',
        'profission': 'É preciso informar a profissão antes de passar para a próxima etapa.',
        'entity': 'É preciso informar a entidade antes de passar para a próxima etapa.',
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
    selectedProfission(profission) {
      this.profission = profission;
    },
    selectedEntity(entity) {
      this.entity = entity;
    },
  },
};
</script>
