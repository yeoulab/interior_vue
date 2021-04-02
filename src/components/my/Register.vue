<template>
  <div>
    <!-- <div><v-icon @click=goBack>mdi-arrow-left</v-icon></div> -->
    <br>
    <div class="v-card v-card--raised v-sheet theme--light">
        <v-card-text>
            <p class="text-center" style="font-size:2em">회원가입</p><br>
            <v-form ref="form" v-model="valid" lazy-validation="lazy-validation">
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="이메일"
                    outlined
                    dense
                    required="required"></v-text-field>

                <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    outlined
                    dense
                    label="이름"
                    required="required"></v-text-field>

                <v-text-field 
                    v-model="phone" 
                    v-mask="mask" 
                    outlined
                    dense
                    label="전화번호"></v-text-field>

                <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-2"
                    label="비밀번호"
                    hint="문자+숫자+특수문자"
                    class="input-group--focused"
                    outlined
                    dense
                    @click:append="show = !show"></v-text-field>

                <br>
                <v-btn block :disabled="!valid" color="primary" class="mr-4" @click="submit">
                    가입
                </v-btn>
                <br>

            </v-form>
        </v-card-text>
    </div>
  </div>
</template>
<script>
    import axios from 'axios';
    import {mask} from 'vue-the-mask'

    export default {
        directives: {
            mask
        },
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            phone: '',
            mask: "###-####-####",
            password: '',
            show: false,
            rules: {
                required: value => !!value || 'Required.',
                emailMatch: () => ('The email and password you entered don\'t match')
            }
        }),
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
                return new Promise((resolve, reject) => {
                  axios.post('/register', 
                      {
                          name: this.name,
                          phone: this.phone,
                          email: this.email,
                          pwd: this.password,
                      }
                  ).then(res =>{
                      let custom = JSON.parse(res.config.data)
                      console.log(custom);
                                            
                      if(custom){
                          resolve(res)
                          console.log("custom.name : " + custom.name);
                          this.$store.commit({
                            type: 'setCustomer',
                            name: custom.name,
                            phone: custom.phone,
                            email: custom.email
                          })
                          this.$router.push("/login");
                      }
                      reject(new Error("Register Failed"))
                  }).catch()
            });

            },
            goBack() {
              this.$router.push("/login")
            }
        }
    }
</script>

