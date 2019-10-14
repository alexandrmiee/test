<template>
  <div class="accounts">
    <datepicker
      class="accounts__datepicker"
      v-model="selectedDate"
      :min="accountOperationsDateRange.min"
      :max="accountOperationsDateRange.max"
      :dayStr="dayStr"
      :scrollbarProps="{isMobile: false}"
      :popperProps="popperProps"
    />
    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="acctPosForDateItems"
      :fields="acctPos.fields"
      @row-clicked="selectAccRow"
      @row-middle-clicked="deleteAccountRow"
    >
      <template v-slot:table-caption>Счета с остатками на дату</template>
      <template
        v-slot:cell()="data"
      >
        <table-editable-field @input="changeAccountValue($event,data)" :text="data.value"/>
      </template>
    </b-table>
    <p>
      <b-button @click="addAccount">Добавить запись</b-button>
    </p>

    <b-table
      class="accounts__table"
      striped
      hover
      caption-top
      :items="accountOperaionEntryItems"
      :fields="opEntry.fields"
      @row-middle-clicked="deleteOperationRow"
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

import { Datepicker } from '@livelybone/vue-datepicker';
import TableEditableField from '@/components/Table/TableEditableField.vue';

export default {
  name: 'Accounts',
  components: {
    Datepicker,
    TableEditableField,
  },
  data() {
    return {
      dayStr: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
      popperProps: {
        placement: 'bottom-start',
        positionFixed: true,
      },
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
      'acctPosForDateItems',
      'accountOperaionEntryItems',
      'accountOperationsDateRange',
    ]),
    ...mapState('account', ['accauntPos']),
    selectedDate: {
      get() {
        return this.$store.state.account.props.selectedDate;
      },
      set(value) {
        this.$store.commit('account/setProp', { prop: 'selectedDate', value });
      },
    },
  },
  watch: {
    selectedDate() {
      this.setAccountProp({
        prop: 'selectedAcctNum',
        value: '',
      });
    },
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

      deleteAccountRow: 'deleteAccountRow',
      deleteOperationRow: 'deleteOperationRow',
      deleteDaysRow: 'deleteDaysRow',
    }),
    selectAccRow({ AcctNum }) {
      this.setAccountProp({
        prop: 'selectedAcctNum',
        value: AcctNum,
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
