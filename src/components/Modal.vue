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
          <option v-for="item in allFactories" v-bind:value="item">{{item.name}}</option>
        </select>

        <div class="modal-body">
          <slot name="body">
            <div class="allWrapperIntupData">
                <v-form validate-on="submit" @submit.prevent="submit">
                  <v-text-field
                      v-model="dataOne"
                      label="Значение один"
                  ></v-text-field>
                </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataTwo"
                    label="Значение один"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataThree"
                    label="Значение 3"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataFore"
                    label="Значение один"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataFive"
                    label="Значение один"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataSix"
                    label="Значение один"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataSeven"
                    label="Значение один"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="dataEight"
                    label="Значение один"
                ></v-text-field>
              </v-form>
            </div>
          </slot>
        </div>
        <div>
          <h2>Результат: {{result}}  </h2>
        </div>
        <select v-model="selectedFactory">
          <option v-for="factory in allFactories" v-bind:value="factory.name">{{factory.name}}</option>
        </select>

        <div class="modal-footer">
          <slot name="footer">
            <v-col cols="auto">
              <v-btn elevation="12" size="small" rounded="lg" @click="dataRaschet">Расчет</v-btn>
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
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/main";
import {th} from "vuetify/locale";

export default {
  name: "Modal",
  props:['showModalParent'],
  data(){
    return{
      showModal:true,
      dataOne: null,
      dataTwo: null,
      dataThree: null,
      dataFore: null,
      dataFive: null,
      dataSix: null,
      dataSeven: null,
      dataEight: null,
      allFactories:[],
      selectedFactory:null,
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
        this.allFactories.push(el.data())
      })
      this.selectedFactory = this.allFactories[0]
    },
    selectFactory(){
      console.log(this.selectedFactory)
    }
  },
  mounted() {
    this.returnFactory()
  },
  computed:{
    result:function (){
      let res = this.dataOne+ this.dataTwo + this.dataThree + this.dataFore + this.dataFive + this.dataSix +this.dataSeven + this.dataEight
      return res
    }
  }
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
  width: 600px;
  height: 600px;
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
  justify-content: center;
}
.oneInputDataModal{
  align-self: center;
}
label{
  margin-right: 5px;
}
.modal-footer{
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>