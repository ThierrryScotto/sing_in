<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        disabled
        v-model="student.register"
        label="Código de Registro"
        required
      ></v-text-field>

      <v-text-field
        v-model="student.name"
        :counter="10"
        :rules="nameRules"
        label="Nome"
        required
      ></v-text-field>

      <v-text-field
        v-model="student.lastName"
        :counter="10"
        :rules="lastNameRules"
        label="Sobrenome"
        required
      ></v-text-field>

      <v-text-field
        disabled
        v-model="student.document"
        :counter="11"
        label="CPF"
        required
      ></v-text-field>

      <v-text-field
        v-model="student.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="student.sex"
        :items="items"
        :rules="[v => !!v || 'Este campo é obrigatório']"
        label="Sexo"
        required
      ></v-select>

      <v-btn
        :disabled="!valid"
        color="secondary"
        class="mr-4"
        @click="edit"
      >
        Editar
      </v-btn>

      <router-link to="/" id="link">
      <v-btn
        color="warning"
        @click="resetValidation"
      >
        Cancelar
      </v-btn>
      </router-link>
    </v-form>
  </v-container>
</template>

<script>
import controller from "../server/api"

  export default {
    created() {
      this.getStudentDB(this.$route.params.id);
    },
    data: () => ({
      valid: true,
      student: {
        register: '',
        name: '',
        lastName: '',
        document: '',
        email: '',
        sex: null,
      },
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 10) || 'Name deve ser válido',
      ],
      lastNameRules: [
        v => !!v || 'Sobrenome é obrigatório',
        v => (v && v.length <= 10) || 'Sobrenome deve ser válido',
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
      async edit () {
        if (!this.student.name)
          this.checkFields('nome')
        else if (!this.student.lastName)
          this.checkFields('sobrenome')
        else if (!this.student.email)
          this.checkFields('email')
        else if (!this.student.sex)
          this.checkFields('sexo')
        else {
          await controller.editStudentRegister(this.student)
            .then( success => {
              let res = success.data

              if (res.success) {
                alert("Editado com sucesso")
                this.cleanField();
              }else {
                alert(res.error)
              }
            }).catch ( err => alert(err.data.error))
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
      },

      async getStudentDB(id) {
        await controller.getOneStudent(id).then(success => {
         let res = success.data;
         
         if (res.success) {
           this.student = res.user;
         } else {
           alert(res.error)
         }
        })
      }
    },
  }
</script>

<style scoped>
  #link {
    text-decoration:none;
  }
</style>