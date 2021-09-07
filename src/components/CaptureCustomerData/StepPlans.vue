<template>
  <div>
    <b-step-item label="Planos" icon="school" value="plans">
      <b-table
        :data="plans"
        :columns="columns"
        default-sort="price"
        :loading="loadingPlans"
      />
    </b-step-item>
  </div>
</template>

<script>
import { plans } from '@/services/api/qualicorp';

export default {
    name: 'StepPlans',
    props: {
      paramsStepPlans: Object
    },
    data() {
      return {
        plans: [],
        loadingPlans: false,
        columns: [
          {
            field: 'name',
            label: 'Nome',
          },
          {
            field: 'operator',
            label: 'Operadora',
          },
          {
            field: 'price',
            label: 'Preço',
          },
          {
            field: 'level',
            label: 'Nível',
          },
        ],
      };
    },
    watch: {
      paramsStepPlans(newParamsStepPlans, oldParamsStepPlans) {
        if (
          JSON.stringify(newParamsStepPlans) !== JSON.stringify(oldParamsStepPlans) &&
          !!newParamsStepPlans.entidade &&
          !!newParamsStepPlans.uf &&
          !!newParamsStepPlans.cidade &&
          !!newParamsStepPlans.datanascimento
        ) {
          this.getPlans();
        }
      },
    },
    methods: {
      async getPlans() {
        this.loadingPlans = true;
        try {
          const response = await plans(this.paramsStepPlans);
          this.plans = response.data.planos.map((plan) => ({
            name: plan.plano,
            operator: plan.operadora,
            price: (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })).format(plan?.precos?.total || 0),
            level: plan.nivel,
          }));
        } catch (e) {
          this.$buefy.toast.open({
            message: "Não foi possivel listar as planos, tente novamente mais tarde!",
            type: "is-error"
          });
        }
        this.loadingPlans = false;
      },
    },
}
</script>
