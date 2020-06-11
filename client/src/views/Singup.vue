<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Nome"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Senha"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Lembre-me?"
      required
    ></v-checkbox>

    <v-btn
      color="success"
      class="mr-4"
      @click="validate"
    >
      Logar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Cancelar
    </v-btn>
    <Home v-if="logado"/>
  </v-form>
</template>

<script>

import storage from "../utils/util"
import Home from "../views/Home"

  export default {
    components: {
      Home
    },
    data: () => ({
      logado: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      checkbox: false,
    }),

    created() {
      let {name, password, check} = storage.checkUser();
      console.log(name)
      console.log(password)

      if (name && password) {
        this.name = name;
        this.password = password;
        this.checkbox = check
        this.validate()
        this.name = "";
        this.password = "";
        this.checkbox = check
      }
    },

    methods: {
      validate () {
        let msg = storage.validUser(this.name, this.password, this.checkbox);
        if (msg) {
          this.logado = true
        } else {
          alert("Usuário ou senha errados")
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>