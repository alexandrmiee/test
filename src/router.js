import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

const viewImporter = name => () => import(`./views/${name}.vue`);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'counters',
      component: viewImporter('Counters'),
    },
    // {
    //   path: "/modules",
    //   name: "modules",
    //   component: viewImporter("Modules")
    // },
    // {
    //   path: "/control",
    //   name: "control",
    //   component: viewImporter("Control")
    // }
  ],
});
