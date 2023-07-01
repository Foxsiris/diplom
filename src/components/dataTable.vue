<template>
<!--  <label>Выберите завод : </label>-->
<!--  <select  v-model="selectedFactory" @change="selectFactory">-->
<!--    <option v-for="item in factoryAll" v-bind:value="item">{{item.name}}</option>-->
<!--  </select>-->
  <h2>Данные о выбросах заводов</h2>
  <div class="headet_table_wrapper">
    <div>Название</div>
    <div  class="clicable_title" >ТИП</div>
    <div @click='sortPol' class="clicable_title" >Г/С</div>
  </div>
  <div class="headet_table_wrapper" v-for="item in allPolutt">
    <div>{{item.Pollut.name}}</div>
    <div>{{item.Pollut.type[0].name}}</div>
    <div>{{item.Pollut.type[0].mas}}</div>
  </div>
</template>

<script>
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/main";

export default {
  name: "dataTable",
  data(){
    return{
      allPolutt: [],
      flag:0,
    }
  },
  methods:{
    sortPol(){
      if (this.flag == 0){
        this.flag = 1
        return this.allPolutt.sort(sortByCO);
      }
      if (this.flag == 1){
        this.flag = 0
        return this.allPolutt.sort(sortByPol);
      }

    },
    async getAllInfoAboutFactory(){
      const testData = await getDocs(collection(db, 'polutant'))
      testData.forEach(el=>{
          this.allPolutt.push(el.data())
      })
    },
    selectFactory(){
      console.log(this.selectedFactory)
    }
  },
  mounted() {
    this.getAllInfoAboutFactory()
  }
}

const sortByCO = (d1, d2) =>(d1.Pollut.type[0].mas < d2.Pollut.type[0].mas) ? 1 : -1
const sortByPol = (d1, d2) =>(d1.Pollut.type[0].mas > d2.Pollut.type[0].mas) ? 1 : -1
</script>

<style scoped>
.headet_table_wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  justify-content:center;
  align-items:center;
  margin-left: 30px;
  border-bottom:2px solid grey;
  margin-bottom:10px;
  padding-bottom:10px;
}
.clicable_title:hover{
  cursor:pointer;
  color:blue
}
select{
  margin-left: 10px;
  padding: 3px;
  border:none;
  border-bottom:1px solid black;
}
h2{
  text-align: center;
}
label{
  margin-left: 25px;
}
</style>