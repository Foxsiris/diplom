<template>
  <div class="admin_wrapper">
    <div class="left_menu">
      <v-btn variant="outlined" class="menuButton" @click="showaddUser" v-if="role == 'Admin'">
        Добавить пользователя
      </v-btn>
      <v-btn variant="outlined" class="menuButton" @click="showaddFactory">
        Добавить данные о заводе
      </v-btn>
      <v-btn variant="outlined" class="menuButton"  id='longText' @click="showaddSource">
        Добавить новый источник выбросов
      </v-btn>
      <v-btn variant="outlined" class="menuButton"   @click="showPolutantt">
          Полютанты
      </v-btn>
    </div>
    <div class="right_main">
      <div v-if="showAddUser">
        <AddUsers/>
      </div>
      <div v-if="showAddFactory">
        <add-factory/>
      </div>
      <div v-if="showAddSource">
       <add-new-source-factory/>
      </div>
      <div v-if="showPolutant">
        <Polutant/>
      </div>
    </div>

  </div>
</template>

<script>

import AddUsers from "@/components/addUsers.vue";
import {th} from "vuetify/locale";
import AddFactory from "@/components/addFactory.vue";
import AddNewSourceFactory from "@/components/addNewSourceFactory.vue";
import Polutant from "@/components/Polutant.vue";

export default {
  name: "Admin",
  components: {Polutant, AddNewSourceFactory, AddFactory, AddUsers},
  data(){
    return{
      showAddUser: false,
      showAddFactory: false,
      showAddSource: false,
      showPolutant: false,
      role:null,
    }
  },
  methods:{
    showaddUser(){
      this.showAddUser = true;
      this.showAddFactory = false;
      this.showAddSource = false;
      this.showPolutant = false;
    },
    showaddFactory(){
      this.showAddUser = false;
      this.showAddFactory = true;
      this.showAddSource = false;
      this.showPolutant = false;
    },
    showaddSource(){
      this.showAddUser = false;
      this.showAddFactory = false;
      this.showAddSource = true;
      this.showPolutant = false;
    },
    showPolutantt(){
      this.showAddUser = false;
      this.showAddFactory = false;
      this.showAddSource = false;
      this.showPolutant = true;
    }
  },
  mounted() {
    this.role = localStorage.getItem('role')
  }
}
</script>

<style scoped>
.admin_wrapper{
  display: grid;
  grid-template-columns: 300px 2fr;
}
.left_menu{
  display:flex;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: rgba(119, 136, 153, 0.2);
}
.right_main{
  height: 600px;
}
.menuButton{
  margin: 15px;
}

#longText{
  font-size: 10px;
}

</style>