<template>
  <div class="box pt-6">
    <b-steps>
      <step-location />
      <step-profission />
      <step-entity />

      <template #navigation="{ previous, next }">
        <b-field grouped position="is-centered">
          <b-button
            tag="a"
            class="pagination-previous"
            icon-left="chevron-left"
            :disabled="previous.disabled"
            @click.prevent="previous.action"
          />
          <b-button
            tag="a"
            class="pagination-next"
            icon-left="chevron-right"
            :disabled="next.disabled"
            @click.prevent="next.action"
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
  name: "Steps"
};
</script>
