<template>
  <h2>Добавить новый завод</h2>
  <label id="leftMarginForCheckbox" for="" class="che">Добавить новую передвижную станцию </label>
  <input type="checkbox" id="checkbox" v-model="checked" class="che">
  <div class="wrapper_factory" v-if="checked">
    <v-text-field class="inputCustom"
                  v-model="name"
                  label="Название "
    ></v-text-field>
    <v-text-field class="inputCustom textareaMargin"
                  v-model="x"
                  label="Кордината Х"
    ></v-text-field>
    <v-text-field class="inputCustom"
                  v-model="y"
                  label="КоординатаУ"
    ></v-text-field>
    <v-textarea class="textareaMargin" label="Описание" v-model="description"></v-textarea>
    <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="addNewPountc" >Добавить</v-btn>
    <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="changePounctDB" >Изменить</v-btn>
    <div v-if="checked">
      <div  class="wrap_info_users">
        <div>Название</div>
        <div>Кордината Х</div>
        <div>Кордината Y</div>
      </div>
      <div v-for="item in allPounct" class="wrap_info_users">
        <div>{{item.data.name}}</div>
        <div>{{item.data.x}}</div>
        <div>{{item.data.y}}</div>
        <v-btn class="btn" elevation="12" size="small" rounded="lg"  @click="changePounct(item)" >Изменить</v-btn>
        <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="deletePonct(item)" v-if="userRole == 'Admin'">Удалить</v-btn>
      </div>
    </div>
  </div>
  <div class="wrapper_factory" v-if="!checked">
      <v-text-field class="inputCustom"
                    v-model="name"
                    label="Название "
      ></v-text-field>
      <v-text-field class="inputCustom textareaMargin"
                    v-model="x"
                    label="Кордината Х"
      ></v-text-field>
      <v-text-field class="inputCustom"
                    v-model="y"
                    label="КоординатаУ"
      ></v-text-field>
      <v-text-field class="inputCustom textareaMargin"
                    v-model="role"
                    label="Радиус"
      ></v-text-field>
    <v-text-field class="inputCustom"
                  v-model="imgUrl"
                  label="ссылка до картинки"
    ></v-text-field>
    <v-textarea class="textareaMargin" label="Описание" v-model="description"></v-textarea>
    <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="addNewFactory" >Добавить</v-btn>
    <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="changeFactoryDB" >Изменить</v-btn>

   <div>
     <div  class="wrap_info_users">
       <div>Название</div>
       <div>Кордината Х</div>
       <div>Кордината Y</div>
     </div>
     <div v-for="item in allFactories" class="wrap_info_users">
       <div>{{item.data.name}}</div>
       <div>{{item.data.x}}</div>
       <div>{{item.data.y}}</div>
       <v-btn class="btn" elevation="12" size="small" rounded="lg"  @click="changeFactory(item)" >Изменить</v-btn>
       <v-btn class="btn" elevation="12" size="small" rounded="lg" @click="deleteFactory(item)"  v-if="userRole == 'Admin'">Удалить</v-btn>
     </div>
   </div>
  </div>
</template>

<script>
import {addDoc, collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
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
      allPounct:[],
      selectedFactory:'',
      checked:false,
      description: '',
      imgUrl: null,
      id: null,
      source:null,
      userRole: null,
    }
  },
  methods:{
    addNewFactory(){
      addDoc(collection(db, 'factory'), {
        name: this.name,
        x: Number(this.x),
        y: Number(this.y),
        radius: 2000,
        type:'factory',
        source:[],
        imgUrl:this.imgUrl,
        description:this.description,
      });
      this.returnFactory();
    },
    addNewPountc(){
      addDoc(collection(db, 'factory'), {
        name: this.name,
        x: Number(this.x),
        y: Number(this.y),
        radius: 500,
        type:'pounct',
        description:this.description,
      });
      this.returnFactory();
    },
    async returnFactory() {
      this.allFactories = []
      const testData = await getDocs(collection(db, 'factory'))
      testData.forEach(el => {
        if(el.data().type == 'factory'){
          this.allFactories.push({id:el.id,data:el.data()})
        }
      })
      this.selectedFactory = this.allFactories[0]
    },
    async returnPounct() {
      this.allPounct = []
      const testData = await getDocs(collection(db, 'factory'))
      testData.forEach(el => {
        if(el.data().type == 'pounct'){
          this.allPounct.push({id:el.id,data:el.data()})
        }
      })
    },
    changeFactory(item){
      this.name = item.data.name;
      this.x = item.data.x;
      this.y = item.data.y;
      this.imgUrl = item.data.imgUrl;
      this.description = item.data.description;
      this.id = item.id
      this.source = item.data.source;
    },
    changeFactoryDB(){
      setDoc(doc(db,'factory',this.id),{
        name:this.name,
        x: this.x,
        y:this.y,
        imgUrl: this.imgUrl,
        description: this.description,
        radius: 2000,
        type:'factory',
        source: this.source
      });
      this.returnFactory();
      this.name = '';
      this.x = '';
      this.y = '';
      this.imgUrl = '';
      this.description = '';
      this.id = '';
    },
    async deleteFactory(item){
      await deleteDoc(doc(db, "factory", item.id));
      this.returnFactory();
    },
    changePounct(item){
      this.name = item.data.name;
      this.x = item.data.x;
      this.y = item.data.y;
      this.description = item.data.description;
      this.id = item.id
    },
    changePounctDB(){
      setDoc(doc(db,'factory',this.id),{
        name:this.name,
        x: Number(this.x),
        y: Number(this.y),
        radius: 500,
        type:'pounct',
        description:this.description,
      });
      this.returnPounct();
      this.name = '';
      this.x = '';
      this.y = '';
      this.description = '';
      this.id = '';
    },
    async deletePonct(item){
      await deleteDoc(doc(db, "factory", item.id));
      this.returnPounct();
    },

  },
  mounted() {
    this.returnFactory();
    this.returnPounct();
    this.userRole = localStorage.getItem('role')
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
.wrap_info_users{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 20px;
}
#leftMarginForCheckbox{
  margin-left: 15px;
}
.textareaMargin{
  margin-left: 25px;
}
</style>