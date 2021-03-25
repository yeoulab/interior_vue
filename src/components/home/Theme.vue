<template>
    <div class="theme">
        <v-dialog v-model="dialog5" persistent max-width="290">
            <div class="text-center">
                <v-progress-linear
                    indeterminate
                    color="green"
                ></v-progress-linear>
            </div>
        </v-dialog>
        <v-container fluid grid-list-md>
            <v-row>
                <v-col xs6 sm4 md3>
                    <v-dialog v-model="dialog">
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="success" dense>등록</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>테마 등록</v-card-title>
                            <v-card-text>
                                <v-text-field v-model="theme_name"></v-text-field>
                            </v-card-text>
                            <v-btn color="blue darken-1" style="margin: 0px 20px 20px 20px" v-on:click="insert_theme">
                                등록
                            </v-btn>
                        </v-card>
                    </v-dialog>
                    <v-card class="mx-auto" tile>
                        <v-list dense>
                            <v-subheader>테마</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="data in datas" v-bind:key=data.id>
                                    <v-list-item-content @click="get_items(data.id)">
                                        <v-list-item-title v-text="data.theme_name">
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <!-- <v-list-item-icon> -->
                                        <!-- <v-icon v-on:click="delete_theme(data)">mdi-minus</v-icon> -->
                                        <v-dialog v-model="dialog3" persistent max-width="230">
                                            <template v-slot:activator="{ on }">
                                                <v-icon v-on="on" @click="setTheme(data.id)">mdi-minus</v-icon>
                                                <!--v-on:click="delete_theme(data)"-->
                                            </template>
                                            <v-card>
                                                <v-card-title>확인</v-card-title>
                                                <v-btn color="red text darken-1" @click="delete_theme()">삭제?진짜?</v-btn>
                                                <v-btn color="green text darken-1" @click="dialog3 = false">아니...잠깐</v-btn>
                                            </v-card>
                                        </v-dialog>
                                    <!-- </v-list-item-icon> -->
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col xs6 sm4 md3>
                        <v-dialog v-model="dialog2">
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="success" dense>등록</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>종목 등록</v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        label="종목명"
                                        outlined
                                        dense
                                        v-model="item_name"
                                        @change="item_name_change">
                                    </v-text-field>
                                    <v-text-field 
                                        label="종목코드" 
                                        outlined 
                                        dense
                                        v-model="item_code"
                                        @change="item_change">
                                    </v-text-field>
                                </v-card-text>
                                <v-btn color="blue darken-1" style="margin: 0px 20px 20px 20px" v-on:click="insert_theme_item()">
                                    등록
                                </v-btn>
                            </v-card>
                        </v-dialog>
                        <v-btn color="blue" @click="calc_theme_item()">계산</v-btn>
                    <v-card class="mx-auto" tile>
                        <v-list dense>
                            <v-subheader>종목</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="item in items" v-bind:key=item.item_code>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.company_name">
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <v-dialog v-model="dialog4" persistent max-width="230">
                                        <template v-slot:activator="{ on }">
                                            <v-list-item-icon>
                                                <v-icon v-on="on" @click="setItem(item.item_code)">mdi-eraser</v-icon>
                                            </v-list-item-icon>
                                        </template>
                                        <v-card>
                                            <v-card-title>확인</v-card-title>
                                            <v-btn color="red text darken-1" @click="delete_theme_item()">삭제?진짜?</v-btn>
                                            <v-btn color="green text darken-1" @click="dialog4 = false">아니...잠깐</v-btn>
                                        </v-card>
                                    </v-dialog>
                                    
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
            <br>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>            
            <v-data-table
                :headers="headers"
                :items="theme_items"
                :search="search"
                class="elevation-1"
                :mobile-breakpoint="mobileBreakpoint"
                :items-per-page="1000"
                hide-default-footer
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="go_to_first(item)"
                    >
                        mdi-bullseye-arrow
                    </v-icon>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            datas: [],
            theme_name: '',
            item_name: '',
            item_code: '',
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            items: [],
            theme_id: '',
            theme_item_code: '',
            // 아래는 테마조회를 위한 변수들
            search: '',
            mobileBreakpoint: 300,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    value: 'company_name',
                },
                { text: 'Code', value: 'jongmok_code' },
                { text: 'Date', value: 'start_date' },
                { text: 'Max', value: 'max_cir_ratio'},
                { text: 'Total', value: 'tot_cir_ratio'},
                { text: 'Cal', value: 'actions', sortable: false}
            ],
            theme_items: [
            ],
            dialog5: false,
            attrs: false,
        }
    },
    methods: {
        go_to_first(data){
            this.$store.commit('setStockInfo',{
                item_code: data.jongmok_code,
                item_name: data.company_name,
                start_date: data.start_date,
            })            
            this.$router.push("/main/home");    
        },        
        setTheme(themeIid){
            this.theme_id = themeIid;
        },
        setItem(item_code){
            this.theme_item_code = item_code;
        },
        get_theme(){
            axios.get('/theme')
            .then((result) =>{                
                this.datas = result.data                
            })
        },
        insert_theme(){
            var params = {}
            params.theme_name = this.theme_name
            axios.post('/theme', params)
            .then(res => {
                console.log(res.status)
                this.dialog = false;
                this.get_theme();
            })
        },
        insert_theme_item(){
            if( this.theme_id == "" ){
                alert("테마를 선택하세요")
                return
            } 
            if( this.item_code == "" ){
                alert("종목을 선택하세요")
                return
            } 
            if( this.item_name == "" ){
                alert("종목을 선택하세요")
                return
            }
            var params = {}
            params.theme_id = this.theme_id;
            params.item_code = this.item_code;
            console.log(params)
            axios.post('/themeItem', params)
            .then(res => {
                console.log(res.status)
                
                this.dialog2 = false;
                this.get_items(this.theme_id);
                this.item_name = ''
                this.item_code = ''
                
            })
        },
        update_diary(data){
            axios.put('/diary', data,                    
                ).then(res => {
                    if(res){
                        console.log(res.status)
                    }
                })
        },
        delete_theme(){
            axios.delete('/theme', {
                params: {
                    id: this.theme_id
                }}
            )
            .then(res => {
                console.log(res.status)
                this.theme_id = ""
                this.get_theme()
                this.items = []
                this.dialog3 = false
            })
        },
        delete_theme_item(){
            this.dialog4 = false
            axios.delete('/themeItem', {
                params: {
                    theme_id: this.theme_id,
                    item_code : this.theme_item_code
                }}
            )
            .then(res => {
                console.log(res.status)
                this.theme_item_code = ""
                this.get_items(this.theme_id)
                this.dialog4 = false
            })
        },
        get_calc_result(){
            axios.get('themeCalc',{
                params: {
                    theme_id: this.theme_id,
                }
            }).then(res => {
                // vuex 에 저장
                console.log(res.status)
                this.theme_items = res.data
                this.$store.commit('setThemeResult',{
                          theme_result: res.data
                        })
            })
        },
        calc_theme_item(){
            this.setDialog(true)
            var params = {}
            params.theme_id = this.theme_id
            axios.post('/themeCalc', params)
            .then(res => {
                console.log(res.status)
                this.get_calc_result()
                this.setDialog(false)
            })
            .catch(error => {
                console.log(error.request)
                console.log(error.message)
                this.setDialog(false)
            })
        },
        get_items(id){
            this.theme_id = id;
            axios.get('/themeItem', {
                params: {
                    theme_id: id
                }} 
            )
            .then((result) =>{
                this.items = result.data
            })
        },
        item_name_change(){
            axios.get('/item/code',{
                params: {
                    item_name: this.item_name,
                }
            })
            .then((result) =>{
                console.log(result.status)
                this.item_code = result.data
                if( this.item_code != "" ){
                    this.item_change()
                }
            })
        },
        item_change(){
            if( this.item_code.length == 6 ){
                // item 정보 조회하는 api 호출
                axios.get('/item/info',{
                    params: {
                        item_code: this.item_code,
                    }
                })
                .then((result) =>{
                    console.log(result)
                    this.item_name = result.data[0].value
                })
            }
            else{
                this.item_name = ""
            }
        },
        // data iterator 를 위한 메소드
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage (number) {
            this.itemsPerPage = number
        },
        setDialog(boolean){
            this.dialog5 = boolean
        }
    },    
    mounted() {
        this.get_theme()
        this.$store.commit('setPageName',{
                            pageName: '테마관리'
                        })
        // vuex 에 있는 조회결과값을 가져온다.
        this.theme_items = this.$store.state.theme_result  
    },
    computed: {
        numberOfPages () {
            return Math.ceil(this.theme_items.length / this.itemsPerPage)
        },
        filteredKeys () {
            return this.keys.filter(key => key !== `Name`)
        },
    },
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.v-list{
  height:250px;/* or any height you want */
  overflow-y:auto
}
</style>