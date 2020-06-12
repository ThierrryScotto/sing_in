<template>
 <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar dense>
      <v-toolbar-title>
        <v-btn flat :to="{name: '#' }">
          {{title}}
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(menu, index) in menus" :key='index' :to="{name: menu.route}">
         {{menu.name}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  <router-view></router-view>
  </v-card>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    title: "Sing-in",
    menus: [
    {name:"Signup", route:"Signup"},
    {name:"Login", route:"Login"},
    ]
  }),
};
</script>
