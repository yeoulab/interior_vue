import Vue from 'vue';
import Router from 'vue-router'

//import AdPanel from '../components/advertisement/AdPanel'
//import Contract from '../components/contract/Contract'
//import MapNav from '../components/map/Map'
import Home from '../components/home/Home'
import Index from '../components/home/Index'
import Diary from '../components/home/Diary'

//import MyInfo from '../components/my/MyInfo'
//import Login from '../components/my/Login'
//import Register from '../components/my/Register'

import Door from '../components/common/Door'
import Main from '../components/common/Main'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/main',
            component: Main,
            children: [{
                path: 'home',
                component: Home,
            }, {
                path: 'index',
                component: Index,
            }, {
                path: 'diary',
                component: Diary,
            }]
        },
        {path: '/', component: Door},
        //{path: '/home', component: Home},
        //{path: '/map', component: MapNav},
        //{path: '/contract', component: Contract},
        //{path: '/advertisement', component: AdPanel},
        //{path: '/myInfo', component: MyInfo},
        //{path: '/login', component: Login},
        //{path: '/register', component: Register},
        
    ]
})
