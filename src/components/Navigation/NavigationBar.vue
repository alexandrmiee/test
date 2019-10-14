<template>
  <b-navbar toggleable="lg" type="dark" variant="info" tabs>
    <b-navbar-brand>Test</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Счета</b-nav-item>
        <b-nav-item to="opdays">Операционные дни</b-nav-item>
        <b-nav-item to="control">Операции</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {
  BNavbar,
  BCollapse,
  BNavbarNav,
  BNavbarToggle,
  BNavbarBrand,
} from 'bootstrap-vue';

export default {
  name: 'NavigationBar',
  components: {
    BNavbar,
    BCollapse,
    BNavbarNav,
    BNavbarToggle,
    BNavbarBrand,
  },
};
</script>
