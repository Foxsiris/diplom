<template>
  <h2>Добавить новый завод</h2>
  <select v-model="selectedFactory">
    <option v-for="factory in allFactories" v-bind:value="factory.name">{{factory.name}}</option>
  </select>
  <div class="wrapper_factory">

      <v-text-field class="inputCustom"
                    v-model="name"
                    label="Название "
      ></v-text-field>
      <v-text-field class="inputCustom"
                    v-model="x"
                    label="Кордината Х"
      ></v-text-field>
      <v-text-field class="inputCustom"
                    v-model="y"
                    label="КоординатаУ"
      ></v-text-field>
      <v-text-field class="inputCustom"
                    v-model="role"
                    label="Радиус"
      ></v-text-field>
      <v-text-field class="inputCustom"
                    v-model="role"
                    label="Радиус"
      ></v-text-field>
      <v-text-field class="inputCustom"
                    v-model="role"
                    label="Радиус"
      ></v-text-field>

    <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="addNewFactory" >Добавить</v-btn>
  </div>
</template>

<script>
import {addDoc, collection, getDocs} from "firebase/firestore";
import {db} from "@/main";
import {th} from "vuetify/locale";
export default {
  name: "addFactory",
  data(){
    return{
      name: '',
      x:'',
      y:'',
      role:'',
      allFactories:[],
      selectedFactory:'',
    }
  },
  methods:{
    addNewFactory(){
      addDoc(collection(db, 'factory'), {
        name: this.name,
        x: this.x,
        y: this.y
      });
    },
    async returnFactory() {
      const testData = await getDocs(collection(db, 'factory'))
      testData.forEach(el => {
        this.allFactories.push(el.data())
      })
    },
  },
  mounted() {
    this.returnFactory()
  }
}
</script>

<style scoped>
.inputCustom{
  width: 400px;
  height: 70px;
  margin: 10px;
}
.btn{
  margin-left: 20px;
}
h2{
  margin-left: 20px;
  margin-top: 10px;
}
.wrapper_factory{
  display: grid;
  grid-template-columns: 1fr 1fr ;
}
select{
  color: black;
}
</style>