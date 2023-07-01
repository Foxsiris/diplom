<template>
  <div v-if="showModalParent" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
              <h2>Введите данные для расчета выбросов</h2>
          </slot>
        </div>
        <label>Выберите завод : </label>
        <select  v-model="selectedFactory" @change="selectFactory">
          <option v-for="item in allFactories" v-bind:value="item">{{item.data.name}}</option>
        </select>
        <label>Выберите источник : </label>
        <select  v-model="selectedSource" @change="selectSource" v-if="selectedFactory">
          <option v-for="item in selectedFactory.data.source" v-bind:value="item">{{item.sourceName}}</option>
        </select>
        <div class="modal-body" v-if="selectedSource">
          <slot name="body">
            <div class="allWrapperIntupData">
              <div class="customRange">
                <input type="range" v-model="dataOne" step="0.01" min="0.5" max="0.9" @change="calculateFormula">
                <p>Дисперсный размер облака: {{ dataOne }}</p>
              </div>
              <div class="customRange">
                <input type="range" v-model="dataTwo" step="1" min="1" max="1500" @change="calculateFormula">
                <p>Высота: {{ dataTwo }} м</p>
              </div>
              <div class="customRange">
                <input type="range" v-model="dataThree" step="0.1" min="1.5" max="40" @change="calculateFormula">
                <p>Скорость ветра u : {{ dataThree }} м/с</p>
              </div>
              <div class="customRange">
                <input type="range" v-model="dataFore" step="0.1" min="1.5" max="40" @change="calculateFormula">
                <p>Скорость ветра v : {{ dataFore }} м/с</p>
              </div>
              <div class="customRange">
                <input type="range" v-model="dataFive" step="0.1" min="1.5" max="40" @change="calculateFormula">
                <p>Скорость ветра w : {{ dataFive}} м/с</p>
              </div>
              <v-form validate-on="submit" @submit.prevent="submit" disabled>
                <v-text-field
                    v-model="dataSix"
                    label="Координаты x"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit" disabled>
                <v-text-field
                    v-model="dataSeven"
                    label="Координаты y"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataEight"
                    label="момент времени"
                    @input="calculateFormula"
                ></v-text-field>
              </v-form>
              <div>
                <h3>Выберите дату:</h3>
                <input type="date" v-model="selectedDate" @change="updateCurrentValue" :min="minDate" :max="maxDate"/>
                <h3 v-if="currentValue">Значение : {{currentValue}}</h3>
              </div>
              <div v-if="result">
                <h3>Результат</h3>
                <h3>{{result}}</h3>
              </div>
              <div id="succesMesage" v-if="showMessage">{{ successMessage }}</div>
            </div>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <v-col cols="auto">
              <v-btn elevation="12" size="small" rounded="lg" @click="saveDate">Расчет</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn elevation="12" size="small" rounded="lg" v-on:click="closeModal">Закрыть</v-btn>
            </v-col>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "@/main";
import {th} from "vuetify/locale";

export default {
  name: "Modal",
  props:['showModalParent'],
  data(){
    return{
      showModal:true,
      dataOne: 0.73,
      dataTwo: 2.2,
      dataThree: 5,
      dataFore: 6,
      dataFive: 3,
      dataSix: null,
      dataSeven: null,
      dataEight: null,
      allFactories:[],
      selectedFactory:null,
      selectedSource:null,
      value:0,
      selectedDate:'',
      id: '',
      result: null,
      currentValue :null,
      minDate: '2020-01-01',
      maxDate: '2024-12-31',
      showMessage: false,
      successMessage: "Успешно добавлено"
    }
  },
  methods:{
    closeModal(){
      this.$emit('changeFlag',false)
    },
    dataRaschet(){
      console.log(`Мои данные ${this.dataOne} ${this.dataTwo} ${this.dataThree} ${this.dataFore} ${this.dataFive} ${this.dataSix} ${this.dataSeven} ${this.dataEight}`)
    },
    async returnFactory() {
      const testData = await getDocs(collection(db, 'factory'))
      testData.forEach(el => {
        if(el.data().type == 'factory'){
          this.allFactories.push({id:el.id,data:el.data()})
        }
      })
      this.selectedFactory = this.allFactories[0]
      this.dataSix = this.selectedFactory.data.x
      this.dataSeven = this.selectedFactory.data.y
      console.log(this.selectedFactory)

    },
    selectFactory(){
      this.id = this.selectedFactory.id
      console.log(this.selectedFactory)
    },
    addValue(year, month, day, value) {
      const targetYear = this.selectedSource.Years.find(y => y.year === year);

      if (targetYear) {
        const targetMonth = targetYear.months[month];

        if (targetMonth) {
          targetMonth[day] = value;
        } else {
          targetYear.months[month] = {
            [day]: value
          };
        }
      } else {
        const newYear = {
          year,
          months: {
            [month]: {
              [day]: value
            }
          }
        };
        this.selectedSource.Years.push(newYear);
      }

    },
    saveDate() {
      //console.log(`Мои данные ${this.dataOne} ${this.dataTwo} ${this.dataThree} ${this.dataFore} ${this.dataFive} ${this.dataSix} ${this.dataSeven} ${this.dataEight}`)
      let allRes = Number(this.dataOne) + Number(this.dataTwo) + Number(this.dataThree) +Number(this.dataFore) +Number(this.dataFive)+Number(this.dataSix) + Number(this.dataSeven) + Number(this.dataEight)
      const year = new Date(this.selectedDate).getFullYear();
      const month = new Date(this.selectedDate).toLocaleString('default', { month: 'long' });
      const day = new Date(this.selectedDate).getDate();
      this.addValue(year, month, day, Number(this.calculateFormula()));


      setDoc(doc(db,'factory',this.selectedFactory.id),{
        ...this.selectedFactory.data
      });
      this.showSuccessMessage();
      console.log(this.getMonthSum(2023))
    },
    calculateFormula() {
      let X = 1
      let y =1
      let z = Number(this.dataTwo)
      let u = Number(this.dataThree)
      let v = Number(this.dataFore)
      let w = Number(this.dataFive)
      let t = Number(this.dataEight)
      let a = 5.84
      let Q = 1000

      const qy = 0.9;
      const qz = 0.6;
      const exppp = Math.exp((-1 / 2) * ((X - (u * t) / qy) ** 2 + (y - (v * t) / qy) ** 2 + (z - (w * t) / qz) ** 2));
      const C = ((Q / ((2 * Math.PI) ** (3 / 2))) * qz * qy * + z*v*u*w*this.dataOne)*t/100000;
      this.result =  C;
      return this.result;
    },
    getMonthSum(year) {
      const targetYear = this.selectedSource.Years.find(y => y.year === year);
      const monthSums = [];

      if (targetYear) {
        for (const month in targetYear.months) {
          const monthValues = Object.values(targetYear.months[month]);
          const monthSum = monthValues.reduce((sum, value) => sum + value, 0);
          monthSums.push(monthSum);
        }
      }

      return monthSums;
    },
    getValue(year, month, day) {
      const targetYear = this.selectedSource.Years.find(y => y.year === year);

      if (targetYear) {
        const targetMonth = targetYear.months[month];

        if (targetMonth) {
          const targetDay = targetMonth[day];
          return targetDay !== undefined ? targetDay : null;

        }
      }

      return null;
    },
    updateCurrentValue() {
      const year = new Date(this.selectedDate).getFullYear();
      const month = new Date(this.selectedDate).toLocaleString('default', { month: 'long' });
      const day = new Date(this.selectedDate).getDate();
      this.currentValue = this.getValue(year, month, day);
    },
    showSuccessMessage() {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    },

},
  mounted() {
    this.returnFactory()
  },
}
</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 900px;
  height: 750px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  z-index: 9999;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.allWrapperIntupData{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
label{
  margin-right: 5px;
}
.modal-footer{
  display: flex;
  align-items: center;
  justify-content: end;
}
.customRange input{
  width: 400px;
}
#succesMesage{
  color:forestgreen;
  font-size: 25px;
}
select{
  margin-right: 10px;
}
</style>