
<template>
  <div id="map" style="width: 100%; height: 95%"></div>

</template>

<script>


import {collection, getDocs} from "firebase/firestore";
import {db} from "@/main";



export default {
  name: "Map",
  props:['factoryOne'],
  data(){
    return{
    }
  },
  methods:{
    showData(){
      console.log()
    },
    async returnFactory() {
      const testData = await getDocs(collection(db, 'factory'))
      let allFactory = [];
      testData.forEach(el=>{
        allFactory.push(el.data())
      })
      ymaps.ready(init(allFactory));
      function init(factory){
        return function (){
          var myMap = new ymaps.Map("map", {
            center: [51.533561, 46.034265],
            zoom: 12,
            controls: []
          }, {
            searchControlProvider: 'yandex#search'
          });
          for (let i = 0; i < factory.length; i++) {
            myMap.geoObjects.add(new ymaps.Circle([
              // Координаты центра круга.
              [factory[i].x, factory[i].y],
              factory[i].radius
            ], {}, {
              fillColor: "#DB709377",
              strokeColor: "#990066",
              strokeOpacity: 0.8,
              strokeWidth: 5
            }));
            myMap.geoObjects.add(new ymaps.GeoObject({
              geometry: {
                type: "Point",
                coordinates: [factory[i].x, factory[i].y],
              },
              properties: {
                // Контент метки.
                iconContent: factory[i].name,
                hintContent: 'При нажатии можно ввести данные',
                balloonContentHeader: `<span class="description">${factory[i].name}</span>`,
                // Зададим содержимое основной части балуна.
                balloonContentBody: `<img src="${factory[i].type == 'factory' ? factory[i].imgUrl : ' '}" ${factory[i].type == 'factory' ? `height="150" width="200"` : ' '} > <br/> ` +
                    `<b>Имеет: ${factory[i].type == 'factory' ? factory[i].source.length > 1 ? factory[i].source.length+' источника' : factory[i].source.length+' источник' : 'Не имеет источников'} выбросов</b><br/>` +
                    `<b>Координаты</b> Координаты х:${factory[i].x}   Координаты y:${factory[i].y}<br/> `,
                // Зададим содержимое нижней части балуна.
                balloonContentFooter: `<b> Описание: ${factory[i].description}</b>`,
                // Зададим содержимое всплывающей подсказки.

              }
            }, {
              preset: 'islands#blackStretchyIcon',
              draggable: false
            }));
          }
        }

      }
    }
  },
  mounted() {
    this.returnFactory()
  }
}



</script>

<style scoped>


</style>