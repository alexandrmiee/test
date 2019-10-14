<template>
  <div class="accounts">
    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="operationEntry"
      :fields="opEntry.fields"
      @row-clicked="selectOpDayRow"
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

    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="operationAcctPosItems"
      :fields="acctPos.fields"
    >
      <template v-slot:table-caption>Счет с остатками</template>
      <template
        v-slot:cell()="data"
      >
        <table-editable-field @input="changeAccountValue($event,data)" :text="data.value"/>
      </template>
    </b-table>
    <p>
      <b-button @click="addAccount">Добавить запись</b-button>
    </p>
  </div>
</template>

<script>
import {
  mapActions, mapState, mapGetters, mapMutations,
} from 'vuex';
import TableEditableField from '@/components/Table/TableEditableField.vue';

export default {
  name: 'Accounts',
  components: {
    TableEditableField,
  },
  data() {
    return {
      OpDate: '',
      AcctNumDB: '',
      AcctNumCr: '',
      acctPos: {
        fields: [
          {
            key: 'AcctNum',
            label: 'Номер счета',
            sortable: true,
          },
          {
            key: 'Balance',
            label: 'Остаток',
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
      'operationAcctPosItems',
    ]),
    ...mapState('account', ['operationEntry']),
  },
  methods: {
    ...mapMutations('account', {
      setAccountProp: 'setProp',
    }),
    ...mapActions('account', {
      addAccount: 'addAccount',
      changeAccountRow: 'changeAccountRow',
      addAccountOperations: 'addAccountOperations',
      changeAccountOperationRow: 'changeAccountOperationRow',
    }),
    selectOpDayRow({ OpDate, AcctNumDB, AcctNumCr }) {
      this.setAccountProp({
        prop: 'operationDate',
        value: OpDate,
      });
      this.setAccountProp({
        prop: 'accountNumDebit',
        value: AcctNumDB,
      });
      this.setAccountProp({
        prop: 'accountNumCredit',
        value: AcctNumCr,
      });
      this.setAccountProp({
        prop: 'selectedDate',
        value: OpDate,
      });
    },
    changeAccountValue(value, data) {
      this.changeAccountRow({ ...data, value });
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
  user-select: none;

  &__datepicker{
    width: 100px;
  }

  &__table{
    margin: 50px auto;
    cursor: pointer;
  }
}
</style>
