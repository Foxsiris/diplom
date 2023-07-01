<template>
  <select v-model="selectedPollutant" @change="selectPolutant" v-if="!checked">
    <option v-for="pollutt in allPolutant" v-bind:value="pollutt">{{pollutt.data.Pollut.name}}</option>
  </select>
  <label for="" class="che">Добавить новый источник выделений</label>
  <input type="checkbox" id="checkbox" v-model="checked" class="che">

  <v-text-field class="inputCustom"
                v-model="name"
                label="Введите название источника"
                v-if="checked"
  ></v-text-field>
  <v-text-field class="inputCustom"
                label="Введите тип"
                v-model="type"
                v-if="checked"
  ></v-text-field>
  <v-text-field class="inputCustom"
                v-model="mas"
                label="Введите массу м/г"
                v-if="checked"
  ></v-text-field>
  <v-btn elevation="12" size="small" rounded="lg" class="myBtn" v-if="checked" @click="addNewPolutant">Добавить</v-btn>
<!--  <div class="wrapperPol" v-if="!checked">-->
<!--    <div v-for="pollutt in allPolutant" class="wrapperPolOne">-->
<!--      <div class="namePoll">Источник выделения загрязняющих вещевст  : {{pollutt.Pollut.name}}</div>-->
<!--      <div v-for="onePollut in pollutt.Pollut.type" class="borderPoll">-->
<!--        <div>Выделяющиеся загрязняющие вещевство: <B>{{onePollut.name}}</B></div>-->
<!--        <div>Массовые выбросы:<b>{{onePollut.mas}} г/с</b></div>-->
<!--      </div>-->
<!--      <v-btn elevation="12" size="small" rounded="lg" class="myBtn">Изменить</v-btn>-->
<!--      <v-btn elevation="12" size="small" rounded="lg" class="myBtn">Удалить</v-btn>-->
<!--    </div>-->
<!--  </div>-->

  <v-text-field class="inputCustom"
                v-model="selectedPollutant.data.Pollut.name"
                label="Введите название источника"
                v-if="!checked && selectedPollutant"
  ></v-text-field>
  <v-text-field class="inputCustom"
                v-model="selectedPollutant.data.Pollut.type[0].name"
                label="Введите название источника"
                v-if="!checked && selectedPollutant"
  ></v-text-field>

  <v-text-field class="inputCustom"
                v-model="selectedPollutant.data.Pollut.type[0].mas"
                label="Введите массу м/г"
                v-if="!checked && selectedPollutant"
  ></v-text-field>
  <v-btn elevation="12" size="small" rounded="lg" class="myBtn" v-if="!checked" @click="changePoluttant">Изменить</v-btn>
  <v-btn elevation="12" size="small" rounded="lg" class="myBtn" v-if="!checked && role == 'Admin'" @click="deletePollut">Удалить</v-btn>

</template>

<script>
import {addDoc, collection, doc, getDocs, setDoc,deleteDoc} from "firebase/firestore";
import {db} from "@/main";

export default {
  name: "Polutant",
  data(){
    return{
      allPolutant:[],
      selectedPollutant:null,
      checked:false,
      name:'',
      type:'',
      mas: 0,
      role: null,
    }
  },
  methods:{
    async returnFactory() {
      this.allPolutant =[];
      const testData = await getDocs(collection(db, 'polutant'))
      testData.forEach(el => {
        this.allPolutant.push({id:el.id,data:el.data()})
      })
      this.selectedPollutant = this.allPolutant[0]
    },
    addNewPolutant(){
      addDoc(collection(db, 'polutant'), {
          Pollut : {
            name: this.name,
            type: [{
              name:this.type,
              mas:Number(this.mas)
            }]
          }
      });
      this.returnFactory();
    },
    changePoluttant(){
      setDoc(doc(db,'polutant',this.selectedPollutant.id),{
        ...this.selectedPollutant.data
      })
      this.returnFactory();
    },
    async deletePollut(){
      await deleteDoc(doc(db, "polutant", this.selectedPollutant.id));
      this.returnFactory();
    },
    selectPolutant(){
      console.log('MY POLUTANT')
      console.log(this.selectedPollutant)
    }
  },
  mounted() {
    this.returnFactory();
    this.role = localStorage.getItem('role')
  }

}
</script>

<style scoped>
select{
  color: black;
}
.wrapperPol{
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  gap:10px


}
.wrapperPolOne{
  border: 1px solid black;
  border-radius: 5px;
  text-align: left;
  padding-left: 15px;
  width: 300px;
}
.myBtn{
  margin: 12px;
}
label{
  margin-left: 13px;
}
.inputCustom{
  width: 400px;
  height: 70px;
  margin: 10px;
}
select{
  border-bottom: 1px solid black;
  margin-top: 20px;
  margin-left: 15px;
}
.che{
  margin-top:20px;
  margin-right:5px;
}
</style>