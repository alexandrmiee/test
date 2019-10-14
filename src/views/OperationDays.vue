<template>
  <div class="accounts">
    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="opDaysItems"
      :fields="opDays.fields"
      @row-clicked="selectOpDay"
    >
      <template v-slot:table-caption>Операционные дни</template>
    </b-table>
    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="opEntryItems"
      :fields="opEntry.fields"
    >
      <template v-slot:table-caption>Проводки по счету</template>
    </b-table>
  </div>
</template>

<script>


import { OpDays, OpEntry } from '@/services/__fixture__/counters';

export default {
  name: 'OperationDays',
  data() {
    return {
      selectedAcctOpDay: '',

      opDays: {
        fields: [
          {
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
    opDaysItems() {
      return OpDays;
    },
    opEntryItems() {
      return OpEntry.filter(item => item.OpDate === this.selectedAcctOpDay);
    },
  },
  methods: {
    selectOpDay({ OpDate }) {
      this.selectedAcctOpDay = OpDate;
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
