<template>
  <div class="container-sm container-color">
    <h1>{{ msg }}</h1>
    <formitems v-if="getChangeComponent.tela === 0" />
    <formeItems2 v-else-if="getChangeComponent.tela === 1" />
    <review v-else-if="getChangeComponent.tela === 2" />
    <reviewFinal v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import formitems from './Form.vue';
import formeItems2 from './FormeItem2.vue';
import review from './ReviewRegister.vue';
import reviewFinal from './FormeItem3.vue';

export default {
  name: 'Form',
  components: {
    formitems,
    formeItems2,
    review,
    reviewFinal,
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getChangeComponent']),
  },
  mounted() {
    console.log(this.getChangeComponent);
  },
};
</script>

<!-- Ad,d "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-color {
  position: relative;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  width: 70%;
  height: auto;
  background-color: #ffffff;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  padding: 2em 6em 2em 6em;
  h1 {
    position: relative;
    text-align: left;
    font-family: Comfortaa Bold;
    color: #483698;
    padding: 1em 0 0 0.3em;
  }
}

@media (max-width: 1080px) {
  .container-color {
    position: relative;
    background-color: #ffffff;
    width: 100%;
    height: 100vh;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    flex-direction: row;
    align-items: center; /* padding-left: 20px; */
    /* padding-right: 20px; */
    top: -10%;
    padding: 0;
    h1 {
      position: relative;
      margin-top: 1em;
      text-align: left;
      font-family: Comfortaa Bold;
      color: #483698;
      padding: 1.3em 0 0 0.4em;
    }
  }
}
</style>
