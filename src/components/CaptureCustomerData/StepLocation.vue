<template>
  <div>
    <b-step-item label="Localização" icon="map-marker" value="location">
      <b-field label="Estado">
        <b-select
          placeholder="Selecione o Estado"
          v-model="selectedState"
          expanded
          :loading="loadingStates"
          :disabled="loadingStates"
          @input="getCities"
        >
          <option v-for="state of states" :key="state.id" :value="state">
            {{ state.nome }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Cidade">
        <b-select
          placeholder="Selecione a Cidade"
          v-model="selectedCity"
          expanded
          :loading="loadingCities"
          :disabled="isDisabledCities"
        >
          <option v-for="city of cities" :key="city.id" :value="city">
            {{ city.nome }}
          </option>
        </b-select>
      </b-field>
    </b-step-item>
  </div>
</template>

<script>
import * as locale from "@/services/api/locale";

export default {
  name: "StepLocation",
  data() {
    return {
      states: [],
      loadingStates: false,
      selectedState: null,
      cities: [],
      loadingCities: false,
      selectedCity: null
    };
  },
  computed: {
    isDisabledCities() {
      return !this.cities.length || this.loadingCities;
    }
  },
  watch: {
    selectedState(newState) {
      this.$emit('selectedState', newState?.sigla);
    },
    selectedCity(newCity) {
      this.$emit('selectedCity', newCity?.nome);
    },
  },
  mounted() {
    this.getStates();
  },
  methods: {
    async getStates() {
      this.loadingStates = true;
      try {
        const response = await locale.states({ orderBy: "nome" });
        this.states = response.data;
      } catch (e) {
        this.$buefy.toast.open({
          message:
            "Não foi possivel listar os estados, tente novamente mais tarde!",
          type: "is-error"
        });
      }
      this.loadingStates = false;
    },

    async getCities() {
      this.loadingCities = true;
      this.cities = [];
      this.selectedCity = null;

      try {
        const response = await locale.cities(this.selectedState.id, {
          orderBy: "nome"
        });
        this.cities = response.data;
      } catch (e) {
        this.$buefy.toast.open({
          message:
            "Não foi possivel listar as cidades, tente novamente mais tarde!",
          type: "is-error"
        });
      }
      this.loadingCities = false;
    },
  }
};
</script>
