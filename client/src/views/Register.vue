<template>
  <v-container>
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
        v-model="lastName"
        :counter="10"
        :rules="lastNameRules"
        label="Sobrenome"
        required
      ></v-text-field>

      <v-text-field
        v-model="document"
        :counter="11"
        :rules="documentRules"
        label="CPF"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="sex"
        :items="items"
        :rules="[v => !!v || 'Este campo é obrigatório']"
        label="Sexo"
        required
      ></v-select>

      <v-btn
        :disabled="!valid"
        color="secondary"
        class="mr-4"
        @click="create"
      >
        Criar
      </v-btn>

      <v-btn
        to="/"
        color="warning"
        @click="resetValidation"
      >
        Cancelar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import controller from "../server/api"

  export default {
    data: () => ({
      valid: true,
      name: '',
      lastName: '',
      document: '',
      email: '',
      sex: null,
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 10) || 'Name deve ser válido',
      ],
      lastNameRules: [
        v => !!v || 'Sobrenome é obrigatório',
        v => (v && v.length <= 10) || 'Sobrenome deve ser válido',
      ],
      documentRules: [
        v => !!v || 'CPF é obrigatório',
        v => (v && v.length <= 11) || 'CPF deve ser válido',
      ],
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      items: [
        'Masculino',
        'Feminino',
      ],
    }),

    methods: {
      async create () {
        if (!this.name)
          this.checkFields('nome')
        else if (!this.lastName)
          this.checkFields('sobrenome')
        else if (!this.document)
          this.checkFields('CPF')
        else if (!this.email)
          this.checkFields('email')
        else if (!this.sex)
          this.checkFields('sexo')
        else {
          let student = {
            name: this.name,
            lastName: this.lastName,
            document: this.document,
            email: this.email,
            sex: this.sex,
          }
          await controller.registerStudent(student)
            .then(success => {
              let res = success.data

              if (res.success) {
                alert('Usuário criado com sucesso')
                this.cleanField();
              } else alert(res.error)
            }).catch(err => {
              alert("Algo deu errado!")
            })
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      checkFields (field) {
        alert(`O campo ${field} é pbrigatório`)
      },
      cleanField() {
        this.$refs.form.reset()
      }
    },
  }
</script>
