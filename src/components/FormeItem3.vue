<template>
  <section
    v-if="resetState"
    class=""
  >
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- -->
          <div class="row infos">
            <div class="title-txt">
              Nome Completo
            </div>
            <div class="desc-txt">
              {{ listProfisional.name }}
            </div>
          </div>
          <!-- -->
          <div class="row infos">
            <div class="title-txt">
              CPF
            </div>
            <div class="desc-txt">
              {{ listProfisional.cpf }}
            </div>
          </div>
          <!-- -->
          <div class="row infos">
            <div class="title-txt">
              Número do Celular ou Telefone
            </div>
            <div class="desc-txt">
              {{ listProfisional.cell }}
            </div>
          </div>
          <!-- -->
          <div class="row infos">
            <div class="title-txt">
              Estado/Cidade
            </div>
            <div class="desc-txt">
              {{ listProfisional.state }}/ {{ listProfisional.city }}
            </div>
          </div>
          <!-- -->
          <div class="row infos">
            <div class="title-txt">
              Especialidade Principal
            </div>
            <div class="desc-txt">
              {{ listProfisional.hability }}
            </div>
          </div>
          <!-- -->
          <div class="row infos">
            <div class="title-txt">
              Preço da Consulta
            </div>
            <div class="desc-txt">
              R$ {{ listProfisional.price }}
            </div>
          </div>
          <!-- -->
          <div class="row infos">
            <div class="title-txt">
              Formas de Pagamento da Consulta
            </div>
            <!-- <div class="desc-txt">
              Pirocard Rapidex - 1x Débito na Conta do Pai
            </div> -->

            <div
              v-for="(value, index) in listProfisional.payment"
              :key="index"
            >
              <span
                v-if="listProfisional.payment[index] === '1'"
                class="desc-txt"
              >
                Em Dinheiro.
              </span>
              <span
                v-if="listProfisional.payment[index] === '2'"
                class="desc-txt"
              >
                Pix.
              </span>
            </div>
            <span
              v-if="listProfisional.cred"
              class="desc-txt"
            >
              Cartão de Credito - Parcelamento em
              {{ listProfisional.parcel }}
            </span>
          </div>
          <!-- FIM DOS CAMPOS -->
          <button
            class="classBtn"
            @click.prevent="excluir"
          >
            Excluir
          </button>
        </div>
        <div class="col thumb">
          <img
            src="../assets/img/desktop-pagina-3.png"
            alt="Imagem Receptiva"
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      list: [
        {
          name: 'test',
        },
        {
          name: 'test1',
        },
      ],
      listProfisional: [],
    };
  },
  computed: {
    ...mapGetters(['getRegisterProfisional']),
    validInfo() {
      if (
        this.getRegisterProfisional.cell !== ''
        || this.getRegisterProfisional.city !== ''
        || this.getRegisterProfisional.cpf !== ''
        || this.getRegisterProfisional.hability !== ''
        || this.getRegisterProfisional.name !== ''
        || this.getRegisterProfisional.parcel !== ''
        || this.getRegisterProfisional.payment.length > 0
        || this.getRegisterProfisional.price !== ''
        || this.getRegisterProfisional.state !== ''
      ) {
        return true;
      }
      return false;
    },
  },

  mounted() {
    console.log(
      this.getRegisterProfisional.hability !== ''
        && this.getRegisterProfisional.price !== ''
        && (this.getRegisterProfisional.price < '30'
          || this.getRegisterProfisional.price > '350')
        && this.getRegisterProfisional.payment.length !== 0
        && this.getRegisterProfisional.name !== ''
        && this.getRegisterProfisional.cpf !== ''
        && this.getRegisterProfisional.cell !== ''
        && this.getRegisterProfisional.state !== ''
        && this.getRegisterProfisional.city !== '',
    );
    this.listProfisional = JSON.parse(localStorage.getItem('profissional'));
    console.log(this.listProfisional);
  },
  methods: {
    ...mapActions(['resetState']),
    excluir() {
      this.listContacts = {};
      localStorage.setItem('profissional', JSON.stringify(this.listContacts));
      this.resetState();
      this.$router.go(0);
    },
  },
};
</script>
<style scoped lang="scss">
section {
  position: relative;
  margin-top: 2em;
  text-align: left;

  button {
    width: 100%;
    height: 30px;
    border-color: #fbde40;
    background-color: #fbde40;
    color: black;
    font-family: Open Sans Bold;
    border: none;
    border-radius: 100px;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .editar {
    width: 100%;
    height: auto;
    color: #483698;
    font-size: 1em;
    font-family: Comfortaa Bold;
    text-align: center !important;
  }
  .infos {
    margin-bottom: 1em;
    .title-txt {
      font-size: 1em;
      font-family: Open Sans Bold;
    }

    .desc-txt {
      font-size: 1em;
      font-family: Open Sans;
    }
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
