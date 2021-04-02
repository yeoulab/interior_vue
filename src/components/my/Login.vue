<template>
  <div>
    <!-- <div><v-icon @click=goBack>mdi-arrow-left</v-icon></div> -->
    <br>
    <div class="v-card v-card--raised v-sheet theme--light">
    <!-- <v-card class="mx-auto">     -->
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        > 
          <!-- <v-btn @click=goBack class="ma-2" color="purple darken-2" dark>
              <v-icon purple left>mdi-arrow-left</v-icon>뒤로
            </v-btn> -->
          <!--:rules="emailRules"-->
          <p class="text-center" style="font-size:2em">로그인</p>
          <br>
          <v-text-field
            v-model="email"
            label="이메일"
            required
            outlined
            dense
            @keydown="clearErrorMessage"
          ></v-text-field>
          <!--:rules="[rules.required, rules.min]"-->
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="비밀번호"
            hint="문자+숫자+특수문자"
            class="input-group--focused"
            outlined
            dense
            @keydown="clearErrorMessage"
            @keyup.enter="login"
            @click:append="show = !show"
          ></v-text-field>
          <div v-if=login_fail>
            <br>
            <p class="font-weight-black" >로그인에 실패했습니다.</p>
          </div>
          <br>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            block
            @click="login"
          >로그인</v-btn>
          <br>          
        </v-form>   
        <div class="menu">
          <ul>
            <li><a href="/#/register">회원가입</a></li>
            <li><a href="/#/register">아이디 찾기</a></li>
            <li><a href="/#/register">비밀번호 찾기</a></li>
          </ul>          
        </div>
          <br>
          <hr class="mv-20">
          <br>
          <v-btn
            color="yellow"
            class="mr-4"
            block
          >카카오 로그인</v-btn>
      </v-card-text>
      
    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data: () => ({
      valid: true,
      show: false,
      email: '',
      login_fail: false,
      // emailRules: [
      //   v => /.+@.+\..+/.test(v) || 'E-mail 형식이 맞지 않습니다',
      // ],
      // rules: {
      //     required: value => !!value || 'Required.',
      //     emailMatch: () => ('The email and password you entered don\'t match'),
      //   },
    }),

    methods: {
      login () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        return new Promise((resolve, reject) => {
                axios.post('/login'
                , { pwd: this.password
                   ,email: this.email},
                   
                ).then(res => {
                    if(res){
                        // res 자체가 json 객체이므로
                        // 따로 json parser 를 쓸 필요 없다
                        console.log(res.data)
                        console.log(res.headers)
                        this.$store.commit('setCustomer',{
                          id: res.data.uid,
                          name: res.data.name,
                          phone: res.data.phone,
                          email: res.data.email
                        })
                        this.$store.commit({
                          type: 'login'
                        })
                        this.$router.push('/myInfo')
                        resolve(res)
                    }
                    reject(new Error("Login Failed"));
                }).catch(error => {
                  this.login_fail = true
                  console.log("Login prelighted 에러")
                  alert(error.res.data.message)
                })
            });        
      },
      goBack () {
        this.$router.push("/myInfo")
      },
      goToRegister(){
        this.$router.push("/register")
      },
      clearErrorMessage(){
        this.login_fail = false
      }
    },
    created() {
      this.email = this.$store.state.customer.email
    }
  }
</script>
<style scoped>
.menu {
    text-align: center
}

.menu ul {
    display: inline-block;
    zoom: 1
}

.menu ul:after {
    content: '';
    display: block;
    clear: both;
    font-size: 0;
    height: 0;
    visibility: hidden
}

.menu ul > * {
    float: left;
    display: block;
    position: relative;
    padding-left: 15px;
    padding-right: 16px
}

.menu ul > :before {
    content: '';
    display: block;
    position: absolute;
    left: -1px;
    right: auto;
    top: 1px;
    bottom: auto;
    width: 1px;
    height: 10px;
    background: #707070
}

.menu ul > :first-child {
    padding-left: 0
}

.menu ul > :first-child:before {
    display: none;
    display: none !important
}

.menu ul > :last-child {
    padding-right: 0
}

.menu li {
    font-size: .875rem;
    letter-spacing: -.42px;
    line-height: 1.5;
    font-weight: 300;
    line-height: 1
}
a:link { color: black; text-decoration: none;}
a:visited { color: black; text-decoration: none;}
a:hover { color: black; text-decoration: none;}

hr {
    border: 0;
    width: 100%;
    height: 1px;
    background: #dadada
}

hr.bold {
    height: 2px;
    background: #222
}

hr.extra-bold {
    height: 3px;
    background: #222
}

</style>
