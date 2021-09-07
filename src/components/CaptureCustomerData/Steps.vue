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
        @selectedBirthdate="selectedBirthdate"
      />

      <step-entity
        :state="state"
        :city="city"
        :profission="profission"
        @selectedEntity="selectedEntity"
      />

      <step-plans
        :paramsStepPlans="paramsStepPlans"
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
import format from 'date-fns/format';
import StepEntity from "@/components/CaptureCustomerData/StepEntity.vue";
import StepLocation from "@/components/CaptureCustomerData/StepLocation.vue";
import StepProfission from "@/components/CaptureCustomerData/StepProfission.vue";
import StepPlans from '@/components/CaptureCustomerData/StepPlans.vue';

export default {
  components: { StepLocation, StepProfission, StepEntity, StepPlans },
  name: "Steps",
  data() {
    return {
      step: 'location',
      state: null,
      city: null,
      profission: null,
      birthdate: null,
      entity: null,
    };
  },
  computed: {
    hasLocation() {
      return !!this.state && !!this.city;
    },
    hasProfission() {
      return !!this.profission;
    },
    hasBirthdate() {
      return !!this.birthdate;
    },
    hasEntity() {
      return !!this.entity;
    },
    paramsStepPlans() {
      return {
        entidade: this.entity,
        uf: this.state,
        cidade: this.city,
        datanascimento: this.birthdate ? [format(this.birthdate, 'yyyy-MM-dd')] : null
      };
    },
  },
  methods: {
    canChangeStep(stepAction) {
      const verifyCanStep = {
        'location': () => this.hasLocation,
        'profission': () => this.hasProfission && this.hasBirthdate,
        'entity': () => this.hasEntity,
        'plans': () => true,
      };

      const stepErrorMessage = {
        'location': 'É preciso preencher os dados de localização antes de passar para a próxima etapa.',
        'profission': 'É preciso informar a profissão e a data de nascimento antes de passar para a próxima etapa.',
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
    selectedBirthdate(birthdate) {
      this.birthdate = birthdate;
    },
    selectedEntity(entity) {
      this.entity = entity;
    },
  },
};
</script>
