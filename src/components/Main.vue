<template>
  <div class="wrap_for_user" v-if="role != 'Admin' && role != 'User'">
    <div>
      <h2>
        Система для прогнозирования массового выброса поллютантов оборудования
        промышленного предприятия
      </h2>
    </div>
    <div class="actuality">
      <div class="actuality_info">
        <h2>Актуальность</h2>
        <p>
          Загрязнение воздуха в городах является одной из наиболее актуальных
          экологических проблем в нашей современной жизни. Это вызвано преимущественно
          автомобильным транспортом и промышленностью.Основными загрязняющими веществами,
          которые оказывают отрицательное воздействие на здоровье людей и окружающую
          среду, являются оксиды углерода, азота и серы, и пыль. Загрязнение воздуха может
          привести к серьезным заболеваниям дыхательной и сердечно-сосудистой систем, а
          также нанести непоправимый вред окружающей среде. Однако для эффективного
          решения проблемы загрязнения воздуха необходимо иметь точную информацию о
          текущем уровне загрязнения воздуха и прогнозировать его изменения. Приведенные
          выше соображения обуславливают актуальность, и практическую значимость,
          предусматривающего разработку системы для прогнозирования массового выброса
          поллютантов оборудования промышленного предприятия
        </p>
      </div>
      <div>
        <img
          src="https://vsememy.ru/kartinki/wp-content/uploads/2023/03/1641322199_3-papik-pro-p-ekologiya-vektornie-risunki-3-scaled.jpg"
          alt=""
        />
      </div>
    </div>
    <h2 id="text_role">
      <b>Вы вошли как обычный пользователь вам доступен следающий функционал: </b>
    </h2>
    <img
      src="../assets/Снимок%20экрана%202023-05-09%20в%2019.25.18.png"
      alt=""
      id="user_role"
    />
  </div>
  <div class="wrapper_all">
    <div class="header">
      <div>
        <v-col cols="auto">
          <v-btn
            elevation="12"
            size="small"
            rounded="lg"
            v-if="role == 'Admin' || role == 'User'"
            @click="showMoadlWindow"
            >Расчет</v-btn
          >
        </v-col>
      </div>
      <div>
        <v-col cols="auto">
          <v-btn elevation="12" size="small" rounded="lg" @click="showMoadlRegister"
            >Войти</v-btn
          >
        </v-col>
      </div>
    </div>
    <div class="map_wrapper">
      <Map />
    </div>
    <div class="wrapper_info" v-if="role == 'Admin' || role == 'User'">
      <div :class="[user.admin ? 'diagramm_wrapper' : 'noInfo']">
        <Diagrams :admin="user.role" :refresh-meth="refreshMethod"/>
      </div>
      <div class="info_wrapper" v-if="user.role == 'admin'">
        <info />
      </div>
    </div>
  </div>
  <Modal :show-modal-parent="showModal" v-on:changeFlag="changeFlag" />
  <register
    :show-modal-register="showModalRegister"
    v-on:changeFlagRegister="changeFlagRegister"
  />
</template>

<script>
import Map from "@/components/Map.vue";
import Diagrams from "@/components/Diagrams.vue";
import Info from "@/components/Info.vue";
import { useCollection } from "vuefire";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main";
import Modal from "@/components/Modal.vue";
import { th } from "vuetify/locale";
import Register from "@/components/register.vue";
export default {
  name: "Main",
  components: { Register, Modal, Map, Diagrams, Info },
  data() {
    return {
      user: {
        id: 1,
        role: "admin",
        admin: true,
      },
      showModal: false,
      showModalRegister: false,
      role: null,
      refreshMethod:false,
    };
  },
  methods: {
    async returnData() {
      const testData = await getDocs(collection(db, "Users"));
      testData.forEach((el) => {
        console.log(el.id, " => ", el.data());
      });
    },
    showMoadlWindow() {
      this.showModal = true;
    },
    showMoadlRegister() {
      this.showModalRegister = true;
    },
    changeFlag(data) {
      this.showModal = data;
      this.refreshMethod =!this.refreshMethod;
    },
    changeFlagRegister(data) {
      this.showModalRegister = data;
    },
  },
  mounted() {
    this.role = localStorage.getItem("role");
  },
  watch: {
    role(newRole, oldRole) {
      console.log("NEW VAL:" + newRole + " oldVal: " + oldRole);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  gap: 10px;
}

button {
}
.wrapper_all {
  margin: 25px;
}

.wrapper_info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.map_wrapper {
  width: 100%;
  height: 800px;
  margin-bottom: 30px;
}
.diagramm_wrapper {
  width: 50%;
  height: 60vh;
}

.info_wrapper {
  width: 50%;
  height: 30vh;
}

.noInfo {
  width: 100%;
  height: 60vh;
}
.hystmodal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center; /* см. ниже */
  align-items: center;
  z-index: 99;
  /* Чтобы окно не прилипало к границе
  браузера установим отступы */
  padding: 30px 0;
}
.hystmodal__window {
  background: #fff;

  /* Установим по умолчанию ширину 600px
  но она будет не больше ширины браузера */
  width: 600px;
  max-width: 100%;

  /* Заготовка для будущих анимаций */
  transition: transform 0.15s ease 0s, opacity 0.15s ease 0s;
  transform: scale(1);
}
.wrap_for_user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
img {
  width: 500px;
  height: 500px;
  border-radius: 30px;
}
.actuality {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.actuality_info {
  width: 500px;
  padding: 21px;
}

#user_role {
  width: 1000px;
  height: 600px;
}
#text_role {
  margin-top: 10px;
}
h2 {
  margin-bottom: 20px;
}
</style>
