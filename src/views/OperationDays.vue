<template>
  <div class="accounts">
    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="operationDays"
      :fields="opDays.fields"
      @row-clicked="selectOpDay"
    >
      <template v-slot:table-caption>Операционные дни</template>
      <template
        v-slot:cell()="data"
      >
        <table-editable-field @input="changeOperationDaysValue($event,data)" :text="data.value"/>
      </template>
    </b-table>
    <p>
      <b-button @click="addOperationDays">Добавить запись</b-button>
    </p>

    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="opEntryOnDayItems"
      :fields="opEntry.fields"
    >
      <template v-slot:table-caption>Проводки по счету</template>
      <template
        v-slot:cell()="data"
      >
        <table-editable-field @input="changeOperationEntryValue($event,data)" :text="data.value"/>
      </template>
    </b-table>
    <p>
      <b-button @click="addAccountOperations">Добавить запись</b-button>
    </p>
  </div>
</template>

<script>

import {
  mapActions, mapState, mapGetters, mapMutations,
} from 'vuex';
import TableEditableField from '@/components/Table/TableEditableField.vue';


export default {
  name: 'OperationDays',
  components: {
    TableEditableField,
  },
  data() {
    return {
      selectedAcctOpDay: '',

      opDays: {
        fields: [
          {
            key: 'OpDate',
            label: 'Дата операционного дня',
            sortable: true,
          },
        ],
      },
      opEntry: {
        fields: [
          {
            key: 'AcctNumCr',
            label: 'Счет кредита',
            sortable: true,
          },
          {
            key: 'AcctNumDB',
            label: 'Счет дебета',
            sortable: true,
          },
          {
            key: 'Amount',
            label: 'Сумма проводки',
            sortable: true,
          },
          {
            key: 'OpDate',
            label: 'Дата',
            sortable: true,
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters('account', [
      'opEntryOnDayItems',
    ]),
    ...mapState('account', ['operationDays']),
  },
  methods: {
    ...mapMutations('account', {
      setAccountProp: 'setProp',
    }),
    ...mapActions('account', {
      addOperationDays: 'addOperationDays',
      changeOperationDaysRow: 'changeOperationDaysRow',
      addAccountOperations: 'addAccountOperations',
      changeAccountOperationRow: 'changeAccountOperationRow',
    }),
    selectOpDay({ OpDate }) {
      this.setAccountProp({
        prop: 'selectedAcctOpDay',
        value: OpDate,
      });
      this.setAccountProp({
        prop: 'selectedDate',
        value: OpDate,
      });
    },
    changeOperationDaysValue(value, data) {
      this.changeOperationDaysRow({ ...data, value });
    },
    changeOperationEntryValue(value, data) {
      this.changeAccountOperationRow({ ...data, value });
    },
  },
};
</script>

<style lang="scss" scoped>

.accounts{
  margin: 20px;
  padding: 20px;

  &__datepicker{
    width: 100px;
  }

  &__table{
    margin: 50px auto;
    cursor: pointer;
  }
}
</style>
