<template>
  <h2>Admin</h2>
  <div class="admin_wrapper">
    <div class="left_menu">
      <v-btn variant="outlined" class="menuButton" @click="showaddUser">
        Добавить пользователя
      </v-btn>
      <v-btn variant="outlined" class="menuButton" @click="showaddFactory">
        Добавить данные о заводе
      </v-btn>
    </div>
    <div class="right_main">
      <div v-if="showAddUser">
        <AddUsers/>
      </div>
      <div v-if="showAddFactory">
        <add-factory/>
      </div>
    </div>

  </div>
</template>

<script>

import AddUsers from "@/components/addUsers.vue";
import {th} from "vuetify/locale";
import AddFactory from "@/components/addFactory.vue";

export default {
  name: "Admin",
  components: {AddFactory, AddUsers},
  data(){
    return{
      showAddUser: false,
      showAddFactory: false
    }
  },
  methods:{
    showaddUser(){
      this.showAddUser = true;
      this.showAddFactory = false;
    },
    showaddFactory(){
      this.showAddUser = false;
      this.showAddFactory = true;
    },
  }
}
</script>

<style scoped>
.admin_wrapper{
  display: grid;
  grid-template-columns: 300px 2fr;
}
.left_menu{
  border: 1px solid black;
  height: 600px;
  display:flex;
  flex-direction: column;
  gap: 10px;
}
.right_main{
  border: 1px solid black;
  height: 600px;
}
.menuButton{
  margin: 15px;
}

</style>