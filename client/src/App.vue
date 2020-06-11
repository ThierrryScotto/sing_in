<template>
 <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn flat :to="{name: 'Home' }">
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
  </v-card>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    title: "Sing-in",
    menus: [
    {name:"Home", route:"Home"},
    {name:"Singup", route:"Singup"},
    {name:"Login", route:"Login"},
    ]
  }),
};
</script>
