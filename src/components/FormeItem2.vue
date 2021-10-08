<template>
  <section class="">
    <div class="container">
      <div class="row">
        <div class="col">
          <form class="row g-3">
            <h3>Detalhes do atendimento</h3>
            <div class="">
              <label
                for="nameComplete"
                class="form-label"
              >Especialidade principal*</label>
              <select
                v-model="$v.profissional.hability.$model"
                class="form-select borderInput"
                aria-label=""
                :class="validationClass('hability', 'select')"
              >
                <option
                  selected
                  disabled
                  value="-1"
                >
                  Selecione a especialidade
                </option>

                <option value="Cardiologia">
                  Cardiologia
                </option>
                <option value="Dermatologia">
                  Dermatologia
                </option>
                <option value="Neurologia">
                  Neurologia
                </option>
                <option value="Oftalmologia">
                  Oftalmologia
                </option>
                <option value="Psiquiatria">
                  Psiquiatria
                </option>
                <option value="Urologia">
                  Urologia
                </option>
              </select>
              <!-- <div id="cellphone" class="form-text invalid-feedback">
                Selecione uma especialidade
              </div> -->
            </div>
            <div class="">
              <label
                for="nameComplete"
                class="form-label"
              >Informe o preço da consulta*</label>
              <div class="input-group">
                <span
                  id="basic-addon1"
                  class="input-group-text inputPrice"
                >R$</span>
                <input
                  v-model="$v.profissional.price.$model"
                  type="text"
                  class="form-control"
                  placeholder="Valor"
                  :class="validationClass('price')"
                  aria-describedby="basic-addon1"
                  @change="$v.profissional.price.$touch()"
                >
                <div
                  id="cellphone"
                  class="form-text invalid-feedback"
                >
                  Informe um preço valido!
                </div>
              </div>
            </div>
            <div class="group-card-check">
              <label
                for="pagamento"
                class="form-label"
              >Formas de pagamento da consulta*</label>
              <div class="card-check">
                <div class="form-check">
                  <input
                    id="money"
                    v-model="$v.profissional.payment.$model"
                    class="form-check-input"
                    type="checkbox"
                    value="1"
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    Em Dinheiro
                  </label>
                </div>
              </div>

              <div class="card-check">
                <div class="form-check">
                  <input
                    id="pix"
                    v-model="$v.profissional.payment.$model"
                    class="form-check-input"
                    type="checkbox"
                    value="2"
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    Pix
                  </label>
                </div>
              </div>

              <div class="card-check">
                <div class="form-check">
                  <input
                    id="card"
                    v-model="$v.profissional.cred.$model"
                    class="form-check-input"
                    type="checkbox"
                    value="3"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                  <label
                    class="form-check-label"
                    for="flexCheckDefault"
                  >
                    Cartão de crédito
                  </label>
                  <div
                    id="collapseExample"
                    class="collapse"
                    :class="{ show: validLength }"
                  >
                    <div class="card card-body">
                      <span class="mb-2">Parcelamento em</span>
                      <div class="form-check mb-2">
                        <input
                          id="flexRadioDefault1"
                          v-model="$v.profissional.parcel.$model"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          value="1x parcela"
                        >
                        <label
                          class="form-check-label"
                          for="flexRadioDefault1"
                        >
                          1x parcela
                        </label>
                      </div>
                      <div class="form-check mb-2">
                        <input
                          id="flexRadioDefault1"
                          v-model="$v.profissional.parcel.$model"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          value="2x parcelas"
                        >
                        <label
                          class="form-check-label"
                          for="flexRadioDefault1"
                        >
                          2x parcelas
                        </label>
                      </div>
                      <div class="form-check mb-2">
                        <input
                          id="flexRadioDefault1"
                          v-model="$v.profissional.parcel.$model"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          value="3x parcelas"
                        >
                        <label
                          class="form-check-label"
                          for="flexRadioDefault1"
                        >
                          3x parcelas
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="step-progress">
              <div class="background-stpg">
                <div class="fill-stpg" />
              </div>
              <div class="step-num">
                2 de 2
              </div>
            </div>
            <br>
            <btn
              :class-div="'d-grid gap-1'"
              :valor-campo="'Próximo'"
              :class-btn="'btn-primary'"
              :tela="2"
              @send-change-window="cadastroTela2"
            />
          </form>
        </div>
        <div class="col thumb">
          <img
            src="../assets/img/desktop-pagina-2.png"
            alt="Imagem Receptiva"
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import btn from './Button.vue';

export default {
  components: { btn },
  mixins: [validationMixin],
  data() {
    return {
      profissional: {
        hability: '-1',
        price: '',
        payment: [],
        parcel: '',
        cred: '',
      },
      arrayValidation: { error: false, dirty: false },
    };
  },
  computed: {
    ...mapGetters(['getGuardaState', 'getChangeComponent']),
    validLength() {
      return this.profissional.payment?.forEach((element) => element === 3);
    },
    validPrice1() {
      return this.$v.profissional.price.$model === ''
        ? { 'is-invalid': true }
        : { 'is-valid': true };
    },
  },

  validations: {
    profissional: {
      hability: { required, minLength: minLength(5) },
      price: { required, minLength: minLength(4) },
      payment: {
        required,
      },
      parcel: { required },
      cred: { required },
    },
  },
  mounted() {
    this.profissional = { ...this.getGuardaState };
    if (this.getChangeComponent?.edit === true) {
      this.profissional.hability = '';
      this.profissional.price = '';
      this.profissional.payment = [];
      this.profissional.parcel = '';
      this.profissional.cred = '';
    }
  },
  methods: {
    validationClass(idName, typeTag) {
      const field = this.$v.profissional[idName];
      let ret;
      if (typeTag === '') {
        if (field) ret = { 'is-invalid': field.$invalid && field.$dirty };
        if (!field?.$invalid && field?.$dirty) {
          ret = { 'is-valid': true };
        }
      } else {
        ///
        if (field) ret = { 'is-invalid': field.$invalid && field.$dirty };

        if (field?.$invalid && field?.$dirty) {
          ret = { 'is-valid': true };
        }
      }
      return ret;
    },
    cadastroTela2(tela) {
      if (this.profissional !== null) {
        console.log(this.profissional.cred === '');
        if (this.profissional.cred === '') {
          this.profissional.parcel = '';
          console.log(1);
          this.arrayValidation.error = true;
          this.arrayValidation.dirty = true;
        } else {
          console.log(2);

          this.arrayValidation.error = this.$v.$error;
          this.arrayValidation.dirty = this.$v.$dirty;
        }
      }
      if (this.getChangeComponent.edit === false) {
        if (this.profissional !== null) {
          const parcela = this.profissional.payment.forEach(
            (element) => element === 3,
          );
          if (
            this.profissional.hability !== ''
            && this.profissional.price !== ''
            && (this.profissional.price < '30'
              || this.profissional.price > '350')
            && this.profissional.payment.length !== 0
            && this.profissional.name !== ''
            && this.profissional.cpf !== ''
            && this.profissional.cell !== ''
            && this.profissional.state !== ''
            && this.profissional.city !== ''
          ) {
            if (parcela !== '') {
              this.$store.commit('registerProfisional', {
                profissional: this.profissional,
              });
              this.$store.commit('changeComponent', { tela, edit: true });
              this.$v.$reset();
            }
          }
        }
      } else if (
        this.$v.$invalid
        && this.arrayValidation.error
        && this.arrayValidation.dirty
      ) {
        console.log('test');
        if (this.profissional !== null) {
          const parcela = this.profissional.payment.forEach(
            (element) => element === 3,
          );

          console.log(
            this.profissional.hability !== ''
              && this.profissional.price !== ''
              && (this.profissional.price < '30'
                || this.profissional.price > '350')
              && this.profissional.payment.length !== 0
              && this.profissional.name !== ''
              && this.profissional.cpf !== ''
              && this.profissional.cell !== ''
              && this.profissional.state !== ''
              && this.profissional.city !== '',
          );

          if (
            this.profissional.hability !== ''
            && this.profissional.price !== ''
            && (this.profissional.price < '30'
              || this.profissional.price > '350')
            && this.profissional.payment.length !== 0
            && this.profissional.name !== ''
            && this.profissional.cpf !== ''
            && this.profissional.cell !== ''
            && this.profissional.state !== ''
            && this.profissional.city !== ''
          ) {
            // this.$v.$reset();
            // this.$store.commit('registerProfisional', { profissional: this.profissional });
            // this.$store.commit('changeComponent', { tela, edit: true });

            if (parcela !== '') {
              this.$v.$reset();
              this.$store.commit('registerProfisional', {
                profissional: this.profissional,
              });
              this.$store.commit('changeComponent', { tela, edit: true });

              this.$store.commit('changeComponent', { tela, edit: true });
            }
          }
        }
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

  .group-card-check {
    padding: 0 0.5em 0 0.5em;

    .card-check {
      position: relative;
      margin-top: 10px;
      width: 1fr;
      height: auto;
      background-color: rgb(0, 0, 0, 0.03);
      padding: 1em;
      font-weight: bold;
      border-bottom: 2px solid rgb(0, 0, 0, 0.04);
      border-radius: 10px;
      .collapse {
        .card,
        .card-body {
          position: relative;
          width: 100%;
          height: auto;
          text-align: left;
          background-color: transparent;
          border: none;
          padding: 0;
        }
      }
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
        width: 100%;
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

  .inputPrice {
    background-color: #483698;
    color: white;
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

    .group-card-check {
      padding: 0 0.5em 0 0.5em;

      .card-check {
        position: relative;
        margin-top: 10px;
        width: 1fr;
        height: auto;
        background-color: rgb(0, 0, 0, 0.03);
        padding: 1em;
        font-weight: bold;
        border-bottom: 2px solid rgb(0, 0, 0, 0.04);
        border-radius: 10px;
        .collapse {
          .card,
          .card-body {
            position: relative;
            width: 100%;
            height: auto;
            text-align: left;
            background-color: transparent;
            border: none;
            padding: 0;
          }
        }
      }
    }

    .step-progress {
      position: relative;
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
          width: 100%;
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

    .inputPrice {
      background-color: #483698;
      color: white;
    }
  }
}
</style>
