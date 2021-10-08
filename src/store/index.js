import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initialState = {
  changeComponent: { tela: 0, edit: true, back: 0 },
  profissional: {
    name: '',
    cpf: '',
    cell: '',
    state: '',
    city: '',
    hability: '',
    price: '',
    payment: [],
    parcel: '',
    cred: '',
  },
  save: {},
};

export default new Vuex.Store({
  state: {
    changeComponent: { tela: 0, edit: true },
    profissional: {
      name: '',
      cpf: '',
      cell: '',
      state: '',
      city: '',
      hability: '',
      price: '',
      payment: [],
      parcel: '',
      cred: '',
    },
    save: {},
  },
  mutations: {
    changeComponent(state, payload) {
      console.log(payload);
      state.changeComponent = payload;
    },
    registerProfisional(state, { profissional }) {
      console.log(profissional);
      state.profissional = { ...profissional };
    },
    guardaState(state, { save }) {
      state.save = { ...save };
    },
    resetState(state) {
      Object.keys(state).forEach((key) => delete state[key]);
      Object.assign(state, initialState);
    },
  },
  actions: {
    resetState({ commit }) {
      commit('resetState');
    },
  },
  getters: {
    getChangeComponent: (state) => state?.changeComponent,
    getGuardaState: (state) => state?.save,
    getRegisterProfisional: (state) => state?.profissional,
  },
  modules: {
  },
});
