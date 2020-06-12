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
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
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
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import api from "../server/api"
import storage from "../storage/storage"

  export default {
    data: () => ({
      user: {
        email: "",
        password: "",
      }
    }),

    methods: {
      login() {
        if (!this.user.email)
          return this.messageField("email")
        else if (!this.user.password)
          return this.messageField("password")
        else {
          api.checkLogin(this.user)
            .then( response => {
              let login = response.data;

              if (login.success) {
                window.isLoged = true;
                alert("You are loged");

                this,setStorage(login);
              } else {
                alert(login.error)
              }
            }).catch( err => {
              alert("There was some error")
              console.log(err)
            })
        }
      },

      messageField(field) {
        alert(`O campo ${field} deve ser preenchido`);
      },

      setStorage(login) {
        storage.setUser(login);
      }
    }
  }
</script>