import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import router from "@/router";



import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})


const firebaseConfig = {
    apiKey: "AIzaSyAwHDibWjIbkUFRDwhDvNBsHMYdV7Jh5bg",
    authDomain: "diplom-471b6.firebaseapp.com",
    databaseURL: "https://diplom-471b6-default-rtdb.firebaseio.com",
    projectId: "diplom-471b6",
    storageBucket: "diplom-471b6.appspot.com",
    messagingSenderId: "511337605199",
    appId: "1:511337605199:web:d0bcf9d9256df4996ca23a",
    measurementId: "G-H68CLVCX8W"
};
const settings = {
    apiKey: '571248a9-8e0e-4105-8380-8c4fb5e683ce',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    db,
}


createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
