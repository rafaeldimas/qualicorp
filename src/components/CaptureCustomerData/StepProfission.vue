<template>
  <div>
    <b-step-item label="Profissão" icon="briefcase" value="profission">
      <b-field label="Profissão">
        <b-select
          placeholder="Selecione a Profissão"
          v-model="selectedProfission"
          expanded
          :loading="loadingProfission"
          :disabled="loadingProfission"
        >
          <option v-for="profission of profissions" :key="profission.profissao" :value="profission.profissao">
            {{ profission.profissao }}
          </option>
        </b-select>
      </b-field>
    </b-step-item>
  </div>
</template>

<script>
import { profissions } from '@/services/api/qualicorp';

export default {
    name: 'StepProfisssion',
    props: {
      location: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        profissions: [],
        loadingProfission: false,
        selectedProfission: null,
        "entidade": "CAASP",
        "uf": "SP",
        "cidade": "São Paulo",
        "datanascimento": ["1987-09-16"]
      };
    },
    watch: {
      location(newLocation, oldLocation) {
        if (
          JSON.stringify(newLocation) !== JSON.stringify(oldLocation) &&
          !!newLocation.state &&
          !!newLocation.city
        ) {
          this.getProfissions();
        }
      },
      selectedProfission(newProfission) {
        this.$emit('selectedProfission', newProfission);
      },
    },
    methods: {
      async getProfissions() {
        this.loadingProfission = true;
        try {
          const response = await profissions(this.location.state, this.location.city);
          this.profissions = response.data;
        } catch (e) {
          this.$buefy.toast.open({
            message: "Não foi possivel listar as profissões, tente novamente mais tarde!",
            type: "is-error"
          });
        }
        this.loadingProfission = false;
      },
    },
}
</script>
