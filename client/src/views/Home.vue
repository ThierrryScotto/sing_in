<template>
  <v-data-table
    :headers="headers"
    :items="studens"
    sort-by="register"
    class="elevation-1"
    locale="pt-BR"
    item-key="register"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>GRUPO A</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="on">
              <v-btn to="/register" color="red" dark class="mb-2" >Cadastrar aluno</v-btn>
          </template>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">

      <router-link :to="{ name:'Edit', params: { id: item.register }}" id="link">
        <v-icon
          small
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </router-link>

      <v-icon
        small
        @click="deleteStudent(item)"
      >
        mdi-delete
      </v-icon>

    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import controller from "../server/api"

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Registro Acadêmico',
          align: 'start',
          sortable: false,
          value: 'register',
        },
        { text: 'Nome', value: 'name' },
        { text: 'Sobrenome', value: 'lastName' },
        { text: 'CPF', value: 'document' },
        { text: 'Email', value: 'email' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      studens: [],
    }),

    created () {
      this.initialize();
    },

    updated() {
      this.initialize();
    },

    methods: {
      initialize () {
        controller.getStudents()
          .then(success => {
            
            let res = success.data;
            if (res.success) {
              this.studens = res.users;
            } else alert(res.error)
          }).catch(err => {
          })
      },

      deleteStudent (item) {
        confirm('Você tem certeza que deseja excluir este aluno?') && this.delete(item)
      },

      delete (item) {
        controller.deleteStudent(item.register).then(success => {
          let res = success.data;

          if (res.success) {
            alert('Usuário deletado com sucesso')
          } else {
            alert(res.error)
          }
        })
      },
    },
  }
</script>

<style scoped>
  #link {
    text-decoration:none;
  }
</style>