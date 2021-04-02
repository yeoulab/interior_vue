<template>
    <div class="wrap-first">
        <div class="layer">
            <v-dialog width="500" v-for="btn in btns" v-bind:key="btn.text">
                <template v-slot:activator="{ on }">
                    <v-btn 
                        x-large icon color="purple darken-2"
                        v-on="on"
                        @click="clear">
                        <v-icon>{{ btn.icon }}</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ btn.text }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Password*" type="password" required v-model="pwd"  @keyup.enter="enterMain(btn.text)"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="enterMain(btn.text)">Go</v-btn>
                    </v-card-actions>
                </v-card>                        
            </v-dialog>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                pwd: '',
                btns:[
                    {"icon": "mdi-duck", "text": "치킨"},
                    {"icon": "mdi-cat", "text": "야옹이"},
                    {"icon": "mdi-dog", "text": "멍뭉이"},
                    {"icon": "mdi-pig", "text": "포크"},
                ]
            }
        },
        methods: {
            enterMain(input_value){
                if(input_value=="야옹이"){
                    if( this.pwd == "0101" ){
                        this.$router.push("/main/home");
                    }
                }else if(input_value=="멍뭉이"){
                    if( this.pwd == "0410" ){
                        this.$router.push("/main/home");
                    }
                }else if(input_value=="치킨"){
                    if( this.pwd == "0109" ){
                        this.$router.push("/login");
                    }
                }
                else if(input_value=="포크"){
                    if( this.pwd == "0326" ){
                        this.$router.push("/user");
                    }
                }
            },
            clear(){
                this.pwd = ""
            }
        }
    }
</script>
<style scoped>
.wrap-first{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
