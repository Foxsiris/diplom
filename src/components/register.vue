<template>
  <div v-if="showModalRegister" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            <h2>Регистрация</h2>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <div class="allWrapperIntupData">
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="email"
                    label="Почта"
                    :rules="emailRules"
                    required
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="login"
                    label="Логин"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit">
                <v-text-field
                    v-model="password"
                    label="Пароль"
                ></v-text-field>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit" v-if="showError">
                  <h2 class="error">Такой пользователь уже существует</h2>
              </v-form>
              <v-form validate-on="submit" @submit.prevent="submit" v-if="showGood">
                <h2 class="good">Пользователь успешно зарегистирован</h2>
              </v-form>
            </div>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <v-col cols="auto">
              <v-btn elevation="12" size="small" rounded="lg"  @click="addUser">Зарегистрироваться</v-btn>
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
import {th} from "vuetify/locale";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {db} from "@/main";

export default {
  name: "register",
  props:['showModalRegister'],
  data(){
    return{
      showModal:true,
      email: null,
      login: null,
      password: null,
      showError:false,
      showGood:false,
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is requred.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],
    }
  },
  methods:{
    closeModal(){
      this.$emit('changeFlagRegister',false)
    },
    async addUser(){
        const testData = await getDocs(collection(db, 'Users'))
        let arrAlluser = []
        testData.forEach(el=>{
          arrAlluser.push(el.data())
        })
      let flag =false
      for (let i = 0; i < arrAlluser.length; i++) {
          if (arrAlluser[i].login == this.login || arrAlluser[i].email == this.email || arrAlluser[i].password == this.password){
            flag =true
          }
      }
      if (flag){
        this.showError = true;
        this.login = '';
        this.password = '';
        this.email = '';
        console.log('сработал я 1')
      }else{
        this.showError = false;
        this.showGood = true;
        addDoc(collection(db, 'Users'), {
          login: this.login,
          email: this.email,
          password:this.password,
        });
        console.log('сработал я 2')
      }
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
  grid-template-columns: 1fr;
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
.error{
  color:red;
}
.good{
  color:forestgreen;
}

</style>