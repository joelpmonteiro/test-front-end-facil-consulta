<template>
  <div :class="classDiv">
    <button
      type="submit"
      class="btn "
      :class="classBtn"
      @click.prevent="$emit('send-change-window', tela)"
    >
      {{ valorCampo }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    classDiv: {
      type: String,
      required: true,
    },
    valorCampo: {
      type: String,
      required: true,
    },
    tela: {
      type: Number,
      required: true,
    },
    classBtn: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
button {
  border-radius: 100px;
  margin-bottom: 1em;
}
.btn-primary {
  border-color: #483698;
  background-color: #483698;
}
.btn-secondary {
  border-color: #fbde40;
  background-color: #fbde40;
  color: black;
}
</style>
