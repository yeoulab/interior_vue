<template>
    <v-app>
        <TopBar></TopBar>
        <v-content class="mx-1">
        <router-view></router-view>
        </v-content>    
        <v-footer app>      
        <v-bottom-navigation app shift dark
            :value="activeBtn"
            color="purple"
        >
            <v-btn
            v-for="link in links"
            :key="link.btnName"
            router :to="link.route">
            <span>{{ link.text }}</span>
            <v-icon>{{ link.btnName }}</v-icon>
            </v-btn>
        </v-bottom-navigation>      
        </v-footer>
    </v-app>
</template>
<script>
import TopBar from './TopBar.vue'

export default {
  name: 'App',
  components:{
    TopBar,
  },
  data () {
      return {
        activeBtn: 0,
        links: [
          {btnName: 'mdi-cogs', text: '바꾸자', route: '/quant/factor'},
          {btnName: 'mdi-bitcoin', text: '가즈아', route: '/quant/coin'}
          //{btnName: 'mdi-city-variant', text: '테마관리', route: '/main/company'},
          //{btnName: 'mdi-account', text: '', route: '/myInfo'},
        ]
      }
  },

};
</script>
<style>
v-content{
  padding-top: 50px
}
</style>