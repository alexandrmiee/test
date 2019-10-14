<template>
  <div @dblclick="editable=!editable">
    <b-form-input
      v-show="editable"
      v-bind="$attrs"
      v-model="data"
      @keyup.enter="editable=!editable"
      @input="$emit('input', $event)"
    ></b-form-input>
    <div class="mt-2" v-show="!editable">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'TableEditableField',
  props: {
    text: {
      type: [String, Number],
      required: false,
    },
  },
  data() {
    return {
      editable: false,
      data: this.text,
    };
  },
};
</script>

<style>

</style>
