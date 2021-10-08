<template>
  <section class="">
    <div class="container">
      <div class="row">
        <div class="col">
          <form class="form row">
            <h3>Dados do profissional</h3>
            <div class="mb-3">
              <label
                for="nameComplete"
                class="form-label"
              >Nome completo*</label>
              <input
                id="nameComplete"
                v-model="$v.profissional.name.$model"
                type="text"
                class="form-control borderInput"
                :class="validationClass('name')"
                aria-describedby="nameComplete"
                placeholder="Digite o nome completo"
                required
              >
              <div
                id="nameComplete"
                class="invalid-feedback"
              >
                Por favor preencha o nome corretamente.
              </div>
            </div>
            <div class="mb-3">
              <label
                for="cpf"
                class="form-label"
              >CPF*</label>
              <input
                id="cpf"
                v-model="$v.profissional.cpf.$model"
                type="text"
                class="form-control borderInput"
                :class="validationClass('cpf')"
                placeholder="Digite um CPF"
                aria-describedby="cpf"
              >
              <div
                id="cpf"
                class="form-text invalid-feedback"
              >
                Preencha o CPF com corretamente
              </div>
            </div>
            <div class="mb-3">
              <label
                for="cellphone"
                class="form-label"
              >Número de celular*</label>
              <input
                id="cellphone"
                v-model="$v.profissional.cell.$model"
                v-mask="'(##) # ####-####'"
                type="text"
                class="form-control borderInput"
                placeholder="(00) 0 0000-0000"
                :class="validationClass('cell')"
                aria-describedby="cellphone"
              >
              <div
                id="cellphone"
                class="form-text invalid-feedback"
              >
                Preencha o número de celular corretamente
              </div>
            </div>
            <div class="col-6">
              <label
                class=""
                for="autoSizingInput"
              >Estado*</label>

              <select
                id="state"
                v-model="$v.profissional.state.$model"
                class="form-select"
                :class="validationClass('state', 'select')"
                required
              >
                <option
                  selected
                  disabled
                  value="-1"
                >
                  Escolha um estado
                </option>
                <option value="0">
                  Paraná
                </option>
                <option value="1">
                  Rio Grande Sul
                </option>
                <option value="2">
                  Santa Catarina
                </option>
              </select>

              <div
                id="cellphone"
                class="form-text invalid-feedback"
              >
                Selecione um estado
              </div>
            </div>
            <div class="col-6">
              <label
                class=""
                for="autoSizingInputGroup"
              >Cidade*</label>
              <select
                id="city"
                v-model="$v.profissional.city.$model"
                class="form-select"
                :class="validationClass('city', 'select')"
                required
              >
                <option
                  selected
                  disabled
                  value="-1"
                >
                  Escolha uma cidade
                </option>
                <option
                  v-for="(value, index) in city[profissional.state]"
                  :key="index"
                  :value="index"
                >
                  {{ value }}
                </option>
              </select>
              <div
                id="cellphone"
                class="form-text invalid-feedback"
              >
                Seleciona uma cidade
              </div>
            </div>
            <div class="step-progress">
              <div class="background-stpg">
                <div class="fill-stpg" />
              </div>
              <div class="step-num">
                1 de 2
              </div>
            </div>
            <br>
            <btn
              :class-div="'d-grid gap-1'"
              :valor-campo="'Próximo'"
              :class-btn="'btn-primary'"
              :tela="1"
              @send-change-window="cadastro"
            />
          </form>
        </div>
        <div class="col thumb">
          <img
            src="../assets/img/desktop-pagina-1.png"
            alt="Imagem Receptiva"
          >
        </div>
      </div>
    </div>
    <div
      id="exampleModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              {{ msg.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            {{ msg.text }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="close"
            >
              Fechar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click.prevent="close"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { mask } from 'vue-the-mask';
import btn from './Button.vue';

export default {
  components: {
    btn,
  },
  directives: { mask },
  data() {
    return {
      profissional: {
        name: '',
        cpf: '',
        cell: '',
        state: '-1',
        city: '-1',
      },
      state: {
        0: 'Paraná',
        1: 'Rio Grande do Sul',
        2: 'Santa Carina',
      },
      city: [
        {
          0: 'Londrina',
          1: 'Maringá',
        },
        {
          0: 'Pelotas',
          1: 'Porto Alegre',
        },
        {
          0: 'Florianópolis',
          1: 'Joinville',
        },
      ],
      msg: { title: '', text: '' },
    };
  },
  computed: {
    ...mapGetters([
      'getChangeComponent',
      'getRegisterProfisional',
      'getGuardaState',
    ]),
  },
  validations: {
    profissional: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(48),
      },
      cpf: {
        required,
        minLength: minLength(11),
      },
      cell: { required, minLength: minLength(16) },
      state: { required, minLength: minLength(4) },
      city: { required, minLength: minLength(4) },
    },
  },
  mounted() {
    this.goback();
    if (this.getChangeComponent?.edit === false) {
      this.profissional = { ...this.getRegisterProfisional };
      Object.values(this.state).filter((x, i) => {
        // console.log(this.profissional.state);
        if (x === this.profissional.state) {
          this.profissional.state = i;
        }
        return i;
      });

      Object.values(this.city[this.profissional.state]).filter((x, i) => {
        if (x === this.profissional.city) {
          this.profissional.city = i;
        }
        return i;
      });
    }
  },
  methods: {
    goback() {
      if (
        this.getChangeComponent?.edit === false
        || this.getChangeComponent?.back > 0
      ) {
        console.log('tese');
        this.profissional = { ...this.getGuardaState };
        Object.values(this.state).filter((x, i) => {
          // console.log(this.profissional.state);
          if (x === this.profissional.state) {
            this.profissional.state = i;
          }
          return i;
        });
      }
    },
    validationClass(idName, select = null) {
      const field = this.$v.profissional[idName];
      let ret;
      if (select === null) {
        if (field) ret = { 'is-invalid': field.$invalid && field.$dirty };
        if (!field?.$invalid && field?.$dirty) {
          ret = { 'is-valid': true };
        }
      } else {
        //
        if (field) ret = { 'is-invalid': field.$invalid && field.$dirty };
        if (field?.$invalid && field?.$dirty) {
          ret = { 'is-valid': true };
        }
      }

      return ret;
    },
    toggle() {
      const test = document.querySelector('#exampleModal');
      test.classList.add('show');
      test.removeAttribute('style');
      test.setAttribute('style', 'display: block');
      test.setAttribute('role', 'dialog');
    },
    close() {
      const test = document.querySelector('#exampleModal');
      test.classList.remove('show');
      test.removeAttribute('style');
      test.setAttribute('style', 'display: none;');
      test.setAttribute('role', 'dialog');
    },
    cadastro(tela) {
      let parcela;
      const idState = this.profissional?.state;
      if (this.getChangeComponent?.edit === false) {
        console.log('entrou');

        if (this.profissional !== null) {
          console.log('entrou 1');
          if (this.profissional.payment?.length > 0) {
            parcela = this.profissional.payment.forEach(
              (element) => element === 3,
            );
          }

          if (
            this.profissional.hability !== ''
            && (this.profissional.price < '30'
              || this.profissional.price > '350')
            && this.profissional.payment.length !== 0
            && this.profissional.name !== ''
            && this.profissional.cpf !== ''
            && this.profissional.cell !== ''
            && (this.profissional.state !== ''
              || this.profissional.state !== '-1')
            && (this.profissional.city !== '' || this.profissional.city !== '-1')
          ) {
            this.profissional.state = this.state[idState];
            this.profissional.city = this.city[idState][this.profissional.city];

            if (parcela !== '') {
              this.$store.commit('guardaState', { save: this.profissional });

              this.$store.commit('changeComponent', { tela, edit: false });
              if (this.getChangeComponent?.edit) {
                this.$store.commit('changeComponent', { tela, edit: true });
              }

              this.$v.$reset();
            }
          }
        }
      } else if (
        this.getChangeComponent?.edit === true
        && this.getChangeComponent?.back === 1
      ) {
        console.log('aaa');
        if (this.profissional !== null) {
          if (
            this.profissional.name !== ''
            && this.profissional.cpf !== ''
            && this.profissional.cell !== ''
            && (this.profissional.state !== ''
              || this.profissional.state !== '-1')
            && (this.profissional.city !== '' || this.profissional.city !== '-1')
          ) {
            this.profissional.state = this.state[idState];
            this.profissional.city = this.city[idState][this.profissional.city];

            this.$store.commit('guardaState', { save: this.profissional });
            this.$store.commit('changeComponent', { tela, edit: true });
          }
        }
      } else if (this.$v.$invalid && this.$v.$error && this.$v.$dirty) {
        if (this.profissional !== null) {
          if (
            this.profissional.name !== ''
            && this.profissional.cpf !== ''
            && this.profissional.cell !== ''
            && (this.profissional.state !== ''
              || this.profissional.state !== '-1')
            && (this.profissional.city !== '' || this.profissional.city !== '-1')
          ) {
            this.profissional.state = this.state[idState];
            this.profissional.city = this.city[idState][this.profissional.city];
            this.$store.commit('guardaState', {
              save: this.profissional,
            });
            this.$store.commit('changeComponent', { tela, edit: true });
          }
        } else {
          this.msg.title = 'Erro!';
          this.msg.text = 'Preencha os dados corretamente';

          const test = document.querySelector('#exampleModal');
          test.classList.add('show');
          test.removeAttribute('style');
          test.setAttribute('style', 'display: block');
          test.setAttribute('role', 'dialog');
        }
      } else {
        this.msg.title = 'Erro!';
        this.msg.text = 'Preencha os dados corretamente';

        this.toggle();
      }
    },
  },
};
</script>
<style scoped lang="scss">
section {
  position: relative;
  margin-top: 2em;
  text-align: left;

  h3 {
    font-family: Open Sans SemiBold;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .thumb {
    display: block;
    vertical-align: middle !important;
    width: 100%;
    height: 100%;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .step-progress {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin-top: 2em;
    margin-bottom: 2em;
    padding: 1em auto 1em auto;
    .background-stpg {
      width: 80%;
      height: 20px;
      background-color: rgb(128, 128, 128, 0.1);
      border-radius: 5px;
      z-index: 2;
      .fill-stpg {
        width: 50%;
        height: 20px;
        background-color: #483698;
        color: rgb(255, 255, 255);
        text-align: center;
        border-radius: 5px;
        z-index: 3;
      }
    }
    .step-num {
      width: 20%;
      height: 20px;
      font-size: 1em;
      font-family: Comfortaa Bold;
      color: #483698;
      text-align: center;
    }
  }

  select {
    border-color: #483698;
  }

  input {
    border-color: #483698;
  }
}

@media (max-width: 1080px) {
  section {
    position: relative;
    margin-top: 1em;
    text-align: left;

    h3 {
      font-family: Open Sans SemiBold;
      margin-bottom: 1em;
    }

    .thumb {
      display: none;
    }

    .step-progress {
      position: relative;
      margin-top: 1em;
      margin-bottom: 1em;
      display: flex;
      justify-content: space-between;
      align-content: space-between;
      padding: 1em auto 1em auto;
      .background-stpg {
        width: 80%;
        height: 20px;
        background-color: rgb(128, 128, 128, 0.1);
        border-radius: 5px;
        z-index: 2;
        .fill-stpg {
          width: 50%;
          height: 20px;
          background-color: #483698;
          color: rgb(255, 255, 255);
          text-align: center;
          border-radius: 5px;
          z-index: 3;
        }
      }
      .step-num {
        width: 20%;
        height: 20px;
        font-size: 1em;
        font-family: Comfortaa Bold;
        color: #483698;
        text-align: center;
      }
    }

    select {
      border-color: #483698;
    }

    input {
      border-color: #483698;
    }
  }
}
</style>
