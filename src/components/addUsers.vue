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
      </v-form>
      <v-btn class="btn" elevation="12" size="small" rounded="lg"  @click="addUser">Добавить</v-btn>
    </div>
</template>

<script>
export default {
  name: "addUsers",
  data(){
    return{
      name: '',
      login:'',
      password:'',
      role:'',
    }
  },
  methods:{
    addUser(){
      console.log(this.login , this.role)
    }
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

</style>