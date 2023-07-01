<template>
 <div class="wrapperAll">
   <h2>Добавить новый источник выбросов</h2>
   <label id="selectFactory">Выберите завод : </label>
   <select  v-model="selectedFactory" @change="selectFactory">
     <option v-for="item in allFactories" v-bind:value="item">{{item.data.name}}</option>
   </select>
     <label v-if="!checked">Выберите источник : </label>
     <select  v-model="selectedSource" @change="selectSource" v-if="selectedFactory && !checked">
       <option v-for="item in selectedFactory.data.source" v-bind:value="item">{{item.sourceName}}</option>
     </select>
   <label for="" class="che">Добавить новый источник</label>
   <input type="checkbox" id="checkbox" v-model="checked" class="che">
   <select id="selectedPool" v-model="selectedPollutant" @change="selectPolutant" v-if="!checked">
     <option v-for="pollutt in allPolutant" v-bind:value="pollutt">{{pollutt.data.Pollut.name}}</option>
   </select>
   <v-btn class="btn" elevation="12" size="small" rounded="lg"  @click="addPolutInFactory" v-if="!checked" >Добавить</v-btn>
   <h3 id="alredyYes" v-if="checkPollut">Такой поллютант уже добавлен</h3>
   <div>

     <v-text-field class="inputCustom"
                   v-model="sourceName"
                   label="Введите название источника"
                   v-if="checked"
     ></v-text-field>
     <div class="headet_table_wrapper" v-if="!checked">
       <div>Название</div>
       <div  class="clicable_title" >ТИП</div>
       <div  class="clicable_title" >Г/С</div>
     </div>
     <div class="headet_table_wrapper" v-for="item in selectedSource.polutant" v-if="selectedSource && !checked">
       <div>{{item.data.Pollut.name}}</div>
       <div>{{item.data.Pollut.type[0].name}}</div>
       <div>{{item.data.Pollut.type[0].mas}}</div>
       <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="deletePollut(item)" >Удалить</v-btn>
     </div>
     <v-btn id="changeBTN" class="btn" elevation="12" size="small" rounded="lg"  @click="updateSource" v-if="!checked">Изменить</v-btn>
     <v-btn class="btn addSource" elevation="12" size="small" rounded="lg" v-if="checked" @click="addNewSource">Добавить новый источник</v-btn>
     <div class="headet_table_wrapper" v-if="!checked">
       <div>Название источника</div>
     </div>
     <div class="headet_table_wrapper" v-if="!checked && selectedFactory" v-for="source in selectedFactory.data.source">
       <div>{{source.sourceName}}</div>
       <v-btn class="btn addSource" elevation="12" size="small" rounded="lg" v-if="!checked" @click="deleteSource(source)">Удалить</v-btn>
     </div>
   </div>
 </div>
</template>

<script>
import {collection, getDocs,doc,setDoc} from "firebase/firestore";
import {db} from "@/main";

export default {
  name: "addNewSourceFactory",
  data(){
    return{
      allFactories:[],
      selectedFactory:null,
      selectedSource:null,
      sourceName:'',
      Na:0,
      CO2:0,
      CO3:0,
      checked: false,
      allPolutant:[],
      selectedPollutant:null,
      checkPollut:false,
    }
  },

  methods:{
    async returnFactory() {
      this.allFactories = [];
      const testData = await getDocs(collection(db, 'factory'))
      testData.forEach(el => {
        if(el.data().type == 'factory'){
          this.allFactories.push({id:el.id,data:el.data()})
        }
      })
      this.selectedFactory = this.allFactories[0]
    },
    async returnAllPolut() {
      this.allPolutant =[];
      const testData = await getDocs(collection(db, 'polutant'))
      testData.forEach(el => {
        this.allPolutant.push({id:el.id,data:el.data()})
      })
      this.selectedPollutant = this.allPolutant[0]
    },
    selectSource(){
      console.log('woork')
    },
    // selectSource(){
    //   this.Na = this.selectedSource.na
    //   this.CO2 = this.selectedSource.co2
    //   this.CO3 = this.selectedSource.co3
    // },
    changeNa(){
      this.selectedSource.na = Number(this.Na)
    },
    changeCO2(){
      this.selectedSource.co2 = Number(this.CO2)
    },
    changeCO3(){
      this.selectedSource.co3 = Number(this.CO3)
    },
    updateSource(){
      setDoc(doc(db,'factory',this.selectedFactory.id),{
          ...this.selectedFactory.data
      })
      this.returnFactory();
      setTimeout(() => {
        this.returnAllPolut();
      }, 1000);

    },
    addNewSource(){
      this.selectedFactory.data.source.push({
        sourceName:this.sourceName,
        polutant:[],
        Years:[]
      })
      setDoc(doc(db,'factory',this.selectedFactory.id),{
        ...this.selectedFactory.data
      })
      setTimeout(() => {
        this.returnFactory();
      }, 1000);
    },
    deleteSource(source){
      this.selectedFactory.data.source =this.selectedFactory.data.source.filter(el=> el.sourceName != source.sourceName)
    },
    addPolutInFactory(){
      let flag = false
      for (let i = 0; i < this.selectedSource.polutant.length; i++) {
        if (this.selectedSource.polutant[i].id == this.selectedPollutant.id){
          flag = true
        }
      }
      if (flag){
        this.checkPollut = true;
      }else{
        this.selectedSource.polutant.push(this.selectedPollutant)
        this.checkPollut = false;
      }
    },
    deletePollut(item){
      this.selectedSource.polutant =this.selectedSource.polutant.filter(el=> el.id != item.id)
    }
  },
  mounted() {
    this.returnFactory();
    this.returnAllPolut();
    console.log(this.selectedFactory)
  },
}
</script>

<style scoped>

select{
  margin-left: 10px;
  padding: 3px;
  border:none;
  border-bottom:1px solid black;
  margin-right: 5px;
}

.wrapperAll{
  margin-top: 10px;
  margin-left: 20px;
}
.inputCustom{
  width: 400px;
  height: 70px;
  margin: 10px;
}
.addSource{
  margin-left: 20px;
}
.che{
  margin-left: 20px;
}
.headet_table_wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  justify-content:center;
  align-items:center;
  margin-left: 30px;
  border-bottom:2px solid grey;
  margin-bottom:10px;
  padding-bottom:10px;
}
#alredyYes{
  color: red;
  font-weight: bold;
}
#selectFactory{
  margin-left: 30px;
}
#selectedPool{
  margin-left: 25px;
  margin-bottom: 15px;
}
#changeBTN{
  margin-left: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
}
h2{
  margin-left: 30px;
}
</style>