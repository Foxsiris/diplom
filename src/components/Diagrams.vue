<template>
  <div class="componentDiagramWrpapper">
    <h2>Данные о выбросах </h2>
    <div class="diagrammWrapper">
      <div>
        <label>Выберите завод : </label>
        <select  v-model="selectedFactory" @change="selectFactory">
          <option v-for="item in allFactories" v-bind:value="item">{{item.data.name}}</option>
        </select>
        <label>Выберите источник : </label>
        <select  v-model="selectedSource" @change="selectSource" v-if="selectedFactory">
          <option v-for="item in selectedFactory.data.source" v-bind:value="item">{{item.sourceName}}</option>
        </select>
      </div>
      <div class="box">
        <Pie :data="data" :options="options"  v-if="loaded" :width="300" :height="300"/>
      </div>
      <div>
        <label for="year-select">Выберите год:</label>
        <select id="year-select" v-model="selectedYear" @change="methodsTest">
          <option v-for="year in years" :value="year">{{ year }}</option>
        </select>
        <p>Выбранный год: {{ selectedYear }}</p>
      </div>
      <div class="wrapperTwoDiagrams" v-if="admin =='admin'">
        <div class="box">
          <h2>Статистика выбросов за год</h2>
          <div >
            <Line :data="dataLineChartMy" :options="optionsLineChart"  v-if="loadLineChart" :height="300" />
          </div>
        </div>
        <div class="box">
          <h2>Статистика выбросов за 4 года </h2>
          <div >
            <Bar :data="dataBarChartMy" :options="optionBar" :height="300"  v-if="loadBarChart"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement, Title,
  BarElement,
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import {Line} from "vue-chartjs";
import { Bar } from 'vue-chartjs'
import * as chartConfig from 'chart.js'
import {options} from "@/components/data";
import {dataLineChart,optionsLineChart} from "@/components/dataLineChart";
import {dataBar, optionBar} from  "@/components/barData"
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/main";
import {th} from "vuetify/locale";
import {ref, watch} from "vue";
import { onMounted, onUnmounted } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


export default {
  name: "Diagrams",
  props:['allData','admin','refreshMeth'],
  components: {
    Pie,
    Line,
    Bar
  },
  data() {
    return{
      chartConfig,
      options,
      data :{
        labels: [],
        datasets: []
      },
      dataLineChartMy:{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Augs','Sep','Oct','Nov'],
        datasets:[]
      },
      dataBarChartMy:{
        labels: ['2020', '2021', '2022', '2023'],
        datasets:[]
      },
      loaded:false,
      loadLineChart:false,
      loadBarChart:false,
      dataLineChart,
      optionsLineChart,
      dataBar,
      optionBar,
      myDataArray:[],
      allFactories:[],
      selectedFactory:null,
      selectedSource:null,
    }
  },
  methods:{
   async getAllInfoFactory(){
     const testData = await getDocs(collection(db, 'factory'))
     testData.forEach(el=>{
       if(el.data().type == 'factory'){
         this.data.labels.push(el.data().name)
         this.myDataArray.push(el.data().allMas)
       }
     })
     this.data.datasets.push({
       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
       data:  [...this.myDataArray],
     })
     this.loaded = true;
     console.log(this.data)
    },
    async returnFactory() {
     this.allFactories = [];
      const testData = await getDocs(collection(db, 'factory'))
      testData.forEach(el => {
        if(el.data().type == 'factory'){
          this.allFactories.push({id:el.id,data:el.data()})
        }
      })
      this.selectedFactory = this.allFactories[0]
      this.methodsTest();
      this.methodsGetallSummYear();
    },
    selectFactory(){
      console.log(this.selectedFactory)
      this.methodsTest();
      this.methodsGetallSummYear();
    },
    selectSource(){
     this.data = {
         labels: [],
         datasets: []
       };
      this.myDataArray = [];
      for (let i =0 ; i < this.selectedSource.polutant.length ;i++){
        this.data.labels.push(this.selectedSource.polutant[i].data.Pollut.name)
        this.myDataArray.push(this.selectedSource.polutant[i].data.Pollut.type[0].mas)
      }
      this.data.datasets.push({
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data:  [...this.myDataArray],
      })
      this.loaded = true;
      // console.log('MY data')
      // console.log(this.data)
    },
    getMonthSum(year,source) {
      const targetYears = source.Years.filter(y => y.year === year);
      const result = [];
      const arrMonth = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь','декабрь'];

      targetYears.forEach(targetYear => {
        const monthSums = [];

        arrMonth.forEach(month => {
          const monthValues = targetYear.months[month] || {};
          const values = Object.values(monthValues);
          const monthSum = values.reduce((sum, value) => sum + value, 0);
          monthSums.push(monthSum);
        });

        result.push(monthSums);
      });
      return result;
    },
    getYearSum(source) {
      const arrYears = ['2020', '2021', '2022', '2023'];
      const result = [];
      for (let i = 0; i < arrYears.length; i++) {
        const targetYear = source.Years.find((y) => y.year === Number(arrYears[i]));
        let yearSum = 0;

        if (targetYear) {
          for (const month in targetYear.months) {
            const monthValues = targetYear.months[month] || {};
            const values = Object.values(monthValues);
            const monthSum = values.reduce((sum, value) => sum + value, 0);
            yearSum += monthSum;
          }
        }
        result.push(yearSum)
      }
      return result;
    },
    methodsGetallSummYear(){
      let arrbackColor = ['#41B883', '#E46651', '#00D8FF', '#DD1B16'];
      this.dataBarChartMy = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets:[]
      };
          for(let j = 0; j < this.selectedFactory.data.source.length; j++) {
              this.dataBarChartMy.datasets.push(
                  {
                    label:this.selectedFactory.data.source[j].sourceName,
                    backgroundColor: arrbackColor[j],
                    data: this.getYearSum(this.selectedFactory.data.source[j])
                  }
              )
          }

      this.loadBarChart = true;
      console.log('FINAL DATA ______________________________')
      console.log(this.dataBarChartMy)
    },

methodsTest(){
      let arrbackColor = ['#41B883', '#E46651', '#00D8FF', '#DD1B16']
      this.dataLineChartMy = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Augs','Sep','Oct','Nov','Dec'],
        datasets: []
      };
      for (let i = 0; i < this.selectedFactory.data.source.length; i++) {
        this.dataLineChartMy.datasets.push(
            {
              label:this.selectedFactory.data.source[i].sourceName,
              backgroundColor: arrbackColor[i],
              data: this.getMonthSum(this.selectedYear,this.selectedFactory.data.source[i])[0]
            }
        )
      }
      this.loadLineChart = true;
    },
  },


  mounted() {
    //this.getAllInfoFactory();
    this.returnFactory();
    watch(
        () => this.refreshMeth,
        () => {
          this.returnFactory();
        }
    );

  },
  setup() {
    const years = ref([2020, 2021, 2022, 2023]);
    const selectedYear = ref(2023);
    return {
      years,
      selectedYear,
    };
  }

}


</script>

<style scoped>

.diagrammWrapper{
  display: flex;
  flex-direction: column;

}
.componentDiagramWrpapper{
  text-align: center;
}
.box{
  padding: 15px;
  border: 1px solid grey;
  border-radius: 10px;
}
.wrapperTwoDiagrams{
  display: grid;
  grid-template-columns: 1fr 1fr ;
  grid-gap:5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
select{
  margin-right: 5px;
  border-bottom: 1px solid black;
}
</style>