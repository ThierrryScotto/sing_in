<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Sign-up</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form"> 
                  <v-text-field
                    label="Login"
                    v-model="user.name"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    v-model="user.email"
                    prepend-icon="mdi-email"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="user.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="createUser" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import app from "../server/api"

  export default {
    data: () => ({
      user: {
        name: "",
        email: "",
        password: "",
      }
    }),

    methods: {
      createUser() {
        if (this.checkFields()) {
          app.regiterUser(this.user)
          .then(success => {
            if (success.data) 
              alert("Usuário criado com sucesso");
              this.cleanFields();
          })
        }
      },

      checkFields() {
        if (!this.user.name) {
          alert("O campo nome não pode estar vázio")
          return false;
        } else if (!this.user.email) {
          alert("O campo email não pode estar vázio");
          return false;
        } else if (!this.user.password) {
          alert("O campo password não pode estar vázio")
          return false;
        }

        return true;
      },

      cleanFields() {
        this.$refs.form.reset();
      }
    }
  }
</script>