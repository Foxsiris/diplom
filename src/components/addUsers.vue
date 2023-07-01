<template>
    <div>
      <h2>Добавить нового пользователя</h2>
      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field class="inputCustom"
            v-model="name"
            label="Имя"
        ></v-text-field>
        <v-text-field class="inputCustom"
            v-model="login"
            label="Логин"
        ></v-text-field>
        <v-text-field class="inputCustom"
            v-model="password"
            label="Пароль"
        ></v-text-field>
        <v-select  class="inputCustom"
            v-model="role"
            label="Роль"
            :items="['Admin','User']"
        ></v-select>
        <v-form validate-on="submit" @submit.prevent="submit" v-if="showError">
          <h2 class="error">Такой пользователь уже существует</h2>
        </v-form>
        <v-form validate-on="submit" @submit.prevent="submit" v-if="showGood">
          <h2 class="good">Пользователь успешно зарегистирован</h2>
        </v-form>
      </v-form>
      <v-btn class="btn" elevation="12" size="small" rounded="lg"  v-if="!cngBTN" @click="addUser">Добавить</v-btn>
      <v-btn class="btn" elevation="12" size="small" rounded="lg"  v-if="cngBTN" @click="changeUserDb">Изменить</v-btn>
      <div  class="wrap_info_users">
        <div>Имя</div>
        <div>Логин </div>
        <div>Пароль</div>
        <div>Роль</div>
      </div>
      <div v-for="user in allUsers" class="wrap_info_users">
        <div>{{user.data.name}}</div>
        <div>{{user.data.login}}</div>
        <div>{{user.data.password}}</div>
        <div>{{user.data.role}}</div>
        <v-btn class="btn" elevation="12" size="small" rounded="lg"  @click="changeUser(user)" >Изменить</v-btn>
        <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="deleteUser(user)" >Удалить</v-btn>
      </div>
    </div>
</template>

<script>
import {addDoc, collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "@/main";

export default {
  name: "addUsers",
  data(){
    return{
      name: '',
      login:'',
      password:'',
      role:'',
      showError:false,
      showGood:false,
      allUsers: [],
      selectedUser: null,
      cngBTN : false,
      id:null,
    }
  },
  methods:{
    async addUser(){
      const testData = await getDocs(collection(db, 'Users'))
      let arrAlluser = []
      testData.forEach(el=>{
        arrAlluser.push(el.data())
      })
      let flag =false
      for (let i = 0; i < arrAlluser.length; i++) {
        if (arrAlluser[i].login == this.login &&  arrAlluser[i].password == this.password){
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
          name:this.name,
          login: this.login,
          password:this.password,
          role: this.role,
        });
        this.returnUsers();
        console.log('выбранная роль')
        console.log(this.role)
      }
    },
    async returnUsers() {
      this.allUsers = [];
      const testData = await getDocs(collection(db, 'Users'))
      testData.forEach(el => {
          this.allUsers.push({id:el.id,data:el.data()})
      })
      this.selectedUser = this.allUsers[0]
      console.log(this.allUsers)
    },
    async deleteUser(user){
      await deleteDoc(doc(db, "Users", user.id));
      this.returnUsers();
    },
    changeUser(user){
      this.name = user.data.name;
      this.login = user.data.login;
      this.password = user.data.password;
      this.role =user.data.role;
      this.id = user.id;
      this.cngBTN = true;
      console.log(user)
    },
    changeUserDb(){
      setDoc(doc(db,'Users',this.id),{
        name:this.name,
        login: this.login,
        password:this.password,
        role: this.role,
      });
      this.name = '';
      this.login = '';
      this.password = '';
      this.role = '';
      this.id = '';
      this.cngBTN = false;
      this.returnUsers();
    }
  },
  mounted() {
    this.returnUsers();
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
.wrap_info_users{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 20px;
}

</style>