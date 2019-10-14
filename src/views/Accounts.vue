<template>
  <div class="accounts">
    <datepicker
      class="accounts__datepicker"
      v-model="dateFilter"
      :min="dateRange.min"
      :max="dateRange.max"
      :dayStr="dayStr"
      :scrollbarProps="{isMobile: false}"
      :popperProps="popperProps"
    />
    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="acctPosItems"
      :fields="acctPos.fields"
      @row-clicked="selectAccRow"
    >
      <template v-slot:table-caption>Счета с остатками на дату</template>
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


import { Datepicker } from '@livelybone/vue-datepicker';
import { AcctPos, OpEntry } from '@/services/__fixture__/counters';

export default {
  name: 'Accounts',
  components: {
    Datepicker,
  },
  data() {
    return {
      dayStr: ['7', '1', '2', '3', '4', '5', '6'],
      popperProps: {
        placement: 'bottom-start',
        positionFixed: true,
      },

      dateFilter: '2019-07-12', // new Date().toISOString().split('T')[0]
      selectedAcctNum: null,
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
      return AcctPos.filter(item => item.OpDate === this.dateFilter);
    },
    opEntryItems() {
      return OpEntry.filter(item => item.AcctNumCr === this.selectedAcctNum);
    },
    dateRange() {
      return AcctPos.reduce((result, value) => {
        result.max = (+new Date(value.OpDate) > +new Date(result.max)) ? value.OpDate : result.max;
        result.min = (+new Date(value.OpDate) > +new Date(result.min)) ? result.min : value.OpDate;
        return result;
      },
      { min: this.dateFilter, max: this.dateFilter });
    },
  },
  watch: {
    dateFilter() {
      this.selectedAcctNum = '';
    },
  },
  methods: {
    selectAccRow({ AcctNum }) {
      this.selectedAcctNum = AcctNum;
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
