<template>
  <div class="Define">
    <div class="font">
      <a
        v-if="getChangeComponent.tela > 0"
        @click.prevent="back"
      >
        <i class="bi bi-chevron-left img" />
      </a>
    </div>

    <div class="container-sm back" />
    <forme
      msg="Sobre o profissional"
      class="forme"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import forme from '@/components/ComponentForm.vue';

export default {
  components: {
    forme,
  },
  computed: { ...mapGetters(['getChangeComponent']) },

  methods: {
    back() {
      const tela = this.getChangeComponent.tela - 1;
      if (this.getChangeComponent.tela === 0) {
        this.$store.commit('changeComponent', {
          tela: this.getChangeComponent.tela,
          edit: true,
          back: 0,
        });
      } else {
        this.$store.commit('changeComponent', {
          tela,
          edit: true,
          back: 1,
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import url('../assets/css/fonts.css');

.Define {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1fr;
  height: 100vh;
  background-color: #ffe766;
  font-family: Open Sans;
  padding: 0 0 2em 0;
  .font {
    position: relative;
  }
  .img {
    position: absolute;
    top: 30px;
    left: 30px;
    font-weight: bold;
  }
}
@media (max-width: 1080px) {
  .Define {
    display: block;
    width: 1fr;
    height: 100vh;
    font-family: Open Sans;
    padding: 0 0 2em 0;
    .font {
      position: relative;
    }
    .img {
      position: absolute;
      top: 30px;
      left: 30px;
      font-weight: bold;
    }
    .back {
      background-color: #ffe766;
      margin-bottom: 0px;
      /* border-radius: 0px; */
      padding: 15%;
      flex-direction: row;
    }
    .forme {
      margin-bottom: 1em;
    }
  }
}
</style>
