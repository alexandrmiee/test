import { AcctPos, OpDays, OpEntry } from '@/services/__fixture__/counters';

export default {
  namespaced: true,
  state: {
    accauntPos: AcctPos.map((item, index) => ({ ...item, index })),
    operationEntry: OpEntry.map((item, index) => ({ ...item, index })),
    operationDays: OpDays.map((item, index) => ({ ...item, index })),

    props: {
      operationDate: '',
      accountNumDebit: '',
      accountNumCredit: '',

      selectedAcctOpDay: '',

      selectedAcctNum: '',
      selectedDate: new Date().toISOString().split('T')[0],
    },
  },
  mutations: {
    setProp(state, { prop, value }) {
      state.props[prop] = value;
    },

    addAccount(state, row) {
      state.accauntPos.push(row);
    },
    changeAccountRow(state, data) {
      const { index } = data.item;
      const updatedItem = { ...state.accauntPos[index], [data.field.key]: data.value };
      state.accauntPos.splice(index, 1, updatedItem);
    },
    deleteAccountRow(state, data) {
      const index = state.accauntPos.findIndex(i => i === data.index);
      state.accauntPos.splice(index, 1);
    },

    addAccountOperations(state, row) {
      state.operationEntry.push(row);
    },
    changeAccountOperationRow(state, data) {
      const { index } = data.item;
      const updatedItem = { ...data.item, [data.field.key]: data.value };
      state.operationEntry.splice(index, 1, updatedItem);
    },
    deleteOperationRow(state, data) {
      const index = state.operationEntry.findIndex(i => i === data.index);
      state.operationEntry.splice(index, 1);
    },

    addOperationDays(state, row) {
      state.operationDays.push(row);
    },
    changeOperationDaysRow(state, data) {
      const { index } = data.item;
      const updatedItem = { ...data.item, [data.field.key]: data.value };
      state.operationDays.splice(index, 1, updatedItem);
    },
    deleteDaysRow(state, data) {
      const index = state.operationDays.findIndex(i => i === data.index);
      state.operationDays.splice(index, 1);
    },
  },
  actions: {

    addAccount({ commit, state }) {
      commit('addAccount', {
        AcctNum: '0', Balance: 0, OpDate: state.props.selectedDate, index: state.accauntPos.length,
      });
    },
    changeAccountRow({ commit }, data) {
      commit('changeAccountRow', data);
    },
    deleteAccountRow({ commit }, data) {
      console.log(data);
      commit('deleteAccountRow', data);
    },

    addAccountOperations({ commit, state }) {
      commit('addAccountOperations', {
        AcctNumCr: state.props.selectedAcctNum || '0', AcctNumDB: '0', Amount: 0, OpDate: state.props.selectedDate, index: state.operationEntry.length,
      });
    },
    changeAccountOperationRow({ commit }, data) {
      commit('changeAccountOperationRow', data);
    },
    deleteOperationRow({ commit }, data) {
      commit('deleteOperationRow', data);
    },

    addOperationDays({ commit, state }) {
      commit('addOperationDays', { OpDate: state.props.selectedDate, index: state.operationDays.length });
    },
    changeOperationDaysRow({ commit }, data) {
      commit('changeOperationDaysRow', data);
    },
    deleteDaysRow({ commit }, data) {
      commit('deleteDaysRow', data);
    },

  },
  getters: {
    operationAcctPosItems(state) {
      return state.accauntPos.filter(item => (
        (item.OpDate === state.props.operationDate)
          && (item.AcctNum === state.props.accountNumDebit
          || item.AcctNum === state.props.accountNumCredit)
      ));
    },

    opEntryOnDayItems(state) {
      return state.operationEntry.filter(item => item.OpDate === state.props.selectedAcctOpDay);
    },

    acctPosForDateItems(state) {
      return state.accauntPos.filter(item => item.OpDate === state.props.selectedDate);
    },
    accountOperaionEntryItems(state) {
      return state.operationEntry.filter(item => item.AcctNumCr === state.props.selectedAcctNum);
    },
    accountOperationsDateRange(state) {
      const today = new Date().toISOString().split('T')[0];
      return state.accauntPos.reduce((result, value) => {
        result.max = (+new Date(value.OpDate) > +new Date(result.max)) ? value.OpDate : result.max;
        result.min = (+new Date(value.OpDate) > +new Date(result.min)) ? result.min : value.OpDate;
        return result;
      },
      { min: today, max: today });
    },
  },
};
