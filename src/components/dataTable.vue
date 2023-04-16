<template>
  <label>Выберите завод : </label>
  <select  v-model="selectedFactory" @change="selectFactory">
    <option v-for="item in factoryAll" v-bind:value="item">{{item.name}}</option>
  </select>
  <h2>Данные о выбросах заводов</h2>
  <div class="headet_table_wrapper">
    <div>Завод</div>
    <div @click='sortCO' class="clicable_title" >CO2</div>
    <div  @click='sortNA' class="clicable_title" >NA</div>
    <div @click='sortCO3' class="clicable_title" >CO3</div>
  </div>
  <div class="headet_table_wrapper" v-for="item in factoryAll">
    <div>{{item.name}}</div>
    <div>{{item.co2}}</div>
    <div>{{item.na}}</div>
    <div>{{item.co3}}</div>
  </div>
</template>

<script>
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/main";

export default {
  name: "dataTable",
  data(){
    return{
      factoryAll: [],
      selectedFactory: null,
    }
  },
  methods:{
    sortNA(){
      return this.factoryAll.sort(sortByNA);
    },
    sortCO(){
      return this.factoryAll.sort(sortByCO);
    },
    sortCO3(){
      return this.factoryAll.sort(sortByCO3);
    },
    async getAllInfoAboutFactory(){
      const testData = await getDocs(collection(db, 'factory'))
      testData.forEach(el=>{
          this.factoryAll.push(el.data())
      })
      this.selectedFactory = this.factoryAll[0]
    },
    selectFactory(){
      console.log(this.selectedFactory)
    }
  },
  mounted() {
    this.getAllInfoAboutFactory()
  }
}
const sortByNA = (d1, d2) =>(d1.na > d2.na) ? 1 : -1;
const sortByCO = (d1, d2) =>(d1.co2 > d2.co2) ? 1 : -1;
const sortByCO3 = (d1, d2) =>(d1.co3 > d2.co3) ? 1 : -1;
</script>

<style scoped>
.headet_table_wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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