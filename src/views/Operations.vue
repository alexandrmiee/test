<template>
  <div class="accounts">
    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="opEntryItems"
      :fields="opEntry.fields"
      @row-clicked="selectOpDayRow"
    >
      <template v-slot:table-caption>Проводки по счету</template>
    </b-table>

    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="acctPosItems"
      :fields="acctPos.fields"
    >
      <template v-slot:table-caption>Счет с остатками</template>
    </b-table>
  </div>
</template>

<script>
import { AcctPos, OpEntry } from '@/services/__fixture__/counters';

export default {
  name: 'Accounts',
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
    acctPosItems() {
      return AcctPos.filter(item => (
        (item.OpDate === this.OpDate)
          && (item.AcctNum === this.AcctNumDB
          || item.AcctNum === this.AcctNumCr)
      ));
    },
    opEntryItems() {
      return OpEntry;
    },
  },
  methods: {
    selectOpDayRow({ OpDate, AcctNumDB, AcctNumCr }) {
      this.OpDate = OpDate;
      this.AcctNumDB = AcctNumDB;
      this.AcctNumCr = AcctNumCr;
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
