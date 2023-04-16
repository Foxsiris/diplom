<template>
  <div class="wrapper_all">
    <div class="header">
      <div>
        <v-col cols="auto">
          <v-btn elevation="12" size="small" rounded="lg"
                 v-if="user.role =='admin'"
                 @click="showMoadlWindow"
          >Расчет</v-btn>
        </v-col>
      </div>
      <div>
        <v-col cols="auto">
          <v-btn elevation="12" size="small" rounded="lg" v-if="user.role !='admin'">Войти</v-btn>
        </v-col>
      </div>
      <div>
        <v-col cols="auto">
          <v-btn elevation="12" size="small" rounded="lg"
                 v-if="user.role !='admin'"
                 @click="showMoadlRegister"
          >Зарегистрироваться</v-btn>
        </v-col>
      </div>
    </div>
    <div class="map_wrapper">
      <Map/>
    </div>
    <div class="wrapper_info">

      <div :class="[user.admin ? 'diagramm_wrapper' : 'noInfo' ]">
        <Diagrams :admin="user.role"/>
      </div>
      <div class="info_wrapper" v-if="user.role =='admin'">
        <info/>
      </div>
    </div>
  </div>
    <Modal :show-modal-parent="showModal" v-on:changeFlag = 'changeFlag'/>
    <register :show-modal-register="showModalRegister" v-on:changeFlagRegister="changeFlagRegister"/>
</template>

<script>
import Map from "@/components/Map.vue";
import Diagrams from "@/components/Diagrams.vue";
import Info from "@/components/Info.vue";
import {useCollection} from "vuefire";
import { collection ,getDocs } from 'firebase/firestore';
import {db} from "@/main";
import Modal from "@/components/Modal.vue";
import {th} from "vuetify/locale";
import Register from "@/components/register.vue";
export default {
  name: "Main",
  components: {Register, Modal, Map,Diagrams,Info},
  data(){
    return{
      user:{
        id:1,
        role:'admin',
        admin: true,
      },
      showModal:false,
      showModalRegister:false,
    }
  },
  methods:{
    async returnData() {
      const testData = await getDocs(collection(db, 'Users'))
      testData.forEach(el=>{
        console.log(el.id," => ", el.data());
      })
    },
    showMoadlWindow(){
      this.showModal = true
    },
    showMoadlRegister(){
      this.showModalRegister = true
    },
    changeFlag(data){
      this.showModal = data
    },
    changeFlagRegister(data){
      this.showModalRegister = data
    },
  },
  mounted() {

  }
}
</script>

<style scoped>
.header{
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  gap: 10px;
}

button{

}
.wrapper_all{
  margin: 25px;
}

.wrapper_info{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.map_wrapper{
  width: 100%;
  height: 800px;
  margin-bottom: 30px;
}
.diagramm_wrapper{
  width: 50%;
  height: 60vh;
}



.info_wrapper{
  width: 50%;
  height: 30vh;
}

.noInfo{
  width: 100%;
  height: 60vh;
}
.hystmodal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center; /* см. ниже */
  align-items: center;
  z-index: 99;
  /* Чтобы окно не прилипало к границе
  браузера установим отступы */
  padding:30px 0;
}
.hystmodal__window {
  background: #fff;

  /* Установим по умолчанию ширину 600px
  но она будет не больше ширины браузера */
  width: 600px;
  max-width: 100%;

  /* Заготовка для будущих анимаций */
  transition: transform 0.15s ease 0s, opacity 0.15s ease 0s;
  transform: scale(1);
}

</style>