<template>
  <div>
    <b-step-item label="Entidade" icon="domain" value="entity">
      <b-field label="Entidade">
        <b-select
          placeholder="Selecione a Entidade"
          v-model="selectedEntity"
          expanded
          :loading="loadingEntity"
          :disabled="loadingEntity"
        >
          <option v-for="entity of entities" :key="entity.NomeFantasia" :value="entity.NomeFantasia">
            {{ entity.RazaoSocial }}
          </option>
        </b-select>
      </b-field>
    </b-step-item>
  </div>
</template>

<script>
import { entities } from '@/services/api/qualicorp';

export default {
    name: 'StepEntity',
    props: {
      state: String,
      city: String,
      profission: String,
    },
    data() {
      return {
        entities: [],
        loadingEntity: false,
        selectedEntity: null,
      };
    },
    watch: {
      profission(newProfission, oldProfission) {
        if (newProfission !== oldProfission && !!newProfission) {
          this.getEntities();
        }
      },
      selectedEntity(newEntity) {
        this.$emit('selectedEntity', newEntity);
      },
    },
    methods: {
      async getEntities() {
        this.loadingEntity = true;
        try {
          const response = await entities(this.profission, this.state, this.city);
          this.entities = response.data;
        } catch (e) {
          this.$buefy.toast.open({
            message: "Não foi possivel listar as entidades, tente novamente mais tarde!",
            type: "is-error"
          });
        }
        this.loadingEntity = false;
      },
    },
}
</script>
