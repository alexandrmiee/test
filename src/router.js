import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

const viewImporter = name => () => import(`./views/${name}.vue`);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'accounts',
      component: viewImporter('Accounts'),
    },
    {
      path: '/opdays',
      name: 'opdays',
      component: viewImporter('OperationDays'),
    },
    {
      path: '/operations',
      name: 'operations',
      component: viewImporter('Operations'),
    },
  ],
});
