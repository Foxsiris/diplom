<template>
  <div class="componentDiagramWrpapper">
    <h2>Данные о выбросах </h2>
    <div class="diagrammWrapper">
      <div class="box">
        <Pie :data="data" :options="options"  v-if="loaded" :width="300" :height="300"/>
      </div>
      <div class="wrapperTwoDiagrams" v-if="admin =='admin'">
        <div class="box">
          <h2>Статистика выбросов за полгода</h2>
          <div >
            <Line :data="dataLineChart" :options="optionsLineChart"  :height="300" />
          </div>
        </div>
        <div class="box">
          <h2>Статистика выбросов за 4 года </h2>
          <div >
            <Bar :data="dataBar" :options="optionBar" :height="300" />
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
  props:['allData','admin'],
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
      loaded:false,
      dataLineChart,
      optionsLineChart,
      dataBar,
      optionBar,
      myDataArray:[],
    }
  },
  methods:{
   async getAllInfoFactory(){
     const testData = await getDocs(collection(db, 'factory'))
     testData.forEach(el=>{
       this.data.labels.push(el.data().name)
       this.myDataArray.push(el.data().allMas)
     })
     this.data.datasets.push({
       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
       data:  [...this.myDataArray],
     })
     this.loaded = true;
     console.log(this.data)
    },
  },
  mounted() {
    this.getAllInfoFactory()
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
  display: flex;
  gap:5px;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>