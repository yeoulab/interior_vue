<template>
    <v-container>
        <v-dialog v-model="dialog2" persistent max-width="290">
            <div class="text-center">
                <v-progress-linear
                    indeterminate
                    color="green"
                ></v-progress-linear>
            </div>
        </v-dialog>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <v-data-table
            :headers="headers"
            :items="datas"
            :search="search"
            class="elevation-1"
            :mobile-breakpoint="mobileBreakpoint"
            :items-per-page="pageCount"
            hide-default-footer
        >
            <template v-slot:top>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-text>
                            <v-container grid-list-xs>
                                <v-layout wrap>
                                    <v-flex xs4 sm4 md3>
                                        <v-text-field readonly :value=editedItem.company_name></v-text-field>
                                    </v-flex>
                                    <v-flex xs4 sm4 md3>
                                        <v-text-field readonly :value=editedItem.jongmok_code></v-text-field>
                                    </v-flex>
                                    <v-flex xs4 sm4 md3>
                                        <v-text-field readonly :value=editedItem.start_date></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 style="height: 105px">
                                        <v-textarea label="매수이유" outlined rows="3" row-height="24"
                                                :value=editedItem.buy_reason v-model=editedItem.buy_reason>
                                        </v-textarea>
                                    </v-flex>
                                    <v-flex xs12 style="height: 105px">
                                        <v-textarea label="매도시점" outlined rows="3" row-height="24"
                                                :value=editedItem.sell_reason v-model=editedItem.sell_reason>
                                        </v-textarea>
                                    </v-flex>
                                    <v-flex xs12 style="height: 105px">
                                        <v-textarea label="성공요인" outlined rows="3" row-height="24"
                                                :value=editedItem.suc_reason v-model=editedItem.suc_reason>
                                        </v-textarea>
                                    </v-flex>
                                    <v-flex xs12 style="height: 105px">
                                        <v-textarea label="실패이유" outlined rows="3" row-height="24"
                                                :value=editedItem.fail_reason v-model=editedItem.fail_reason>
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" @click="go_to_first(editedItem)">첫화면</v-btn>
                            <v-btn color="blue darken-1" @click="update_diary(editedItem)">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- </v-toolbar> -->
            </template>
            <template v-slot:item.actions="{ item }">              
                <v-btn
                    icon
                    color="blue">
                    <v-icon
                        @click="buy_item(item)"
                    >
                        mdi-plus-thick
                    </v-icon>
                </v-btn>                
                <v-btn
                    icon
                    color="orange">
                    <v-icon
                        small
                        class="mr-2"
                        @click="sell_item(item)"
                    >
                        mdi-minus-thick
                    </v-icon>
                </v-btn>
                <v-btn 
                    icon
                    color="pink"
                    class="px-auto mx-auto">
                    <v-icon
                        @click="go_to_first(item)"
                    >
                        mdi-calculator
                    </v-icon>
                </v-btn>                
                <v-btn
                    icon
                    color="purple">
                    <v-icon
                        small
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                </v-btn>

                <v-btn
                    icon
                    color="blue">
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
    import axios from 'axios'

    export default{
        data() {
            return {
                datas: [],
                dialog: false,
                search: '',
                mobileBreakpoint: 300,
                pageCount: 1000,
                editedIndex: -1,
                editedItem:{
                    company_name: '',
                    jongmok_code: '',
                    start_date: '',
                    buy_reason: '',
                    sell_reason: '',
                    suc_reason: '',
                    fail_reason: '',
                },
                filter: {},
                sortDesc: false,
                page: 1,         
                headers: [
                    {
                        text: '종목명',
                        value: 'company_name',
                        align: 'start'
                    },
                    { text: '코드', value: 'jongmok_code' },
                    { text: '점수', value: 'total_score' },
                    { text: '시작일자', value: 'start_date' },
                    { text: 'Actions', value: 'actions', sortable: false},
                ],
                dialog2: false,
            }
        },
        methods: {
            setDialog2(boolean){
                this.dialog2 = boolean
            },
            get_diary(){
                console.log("get_diary")
                this.setDialog2(true)
                axios.get('/diary')
                .then((result) =>{
                    this.datas = result.data
                    //console.log(this.datas)
                    this.$store.commit('setDiaryResult',{
                          diary_result: result.data
                        })
                    //console.log(result.data)
                    this.setDialog2(false) 
                })
                .catch(error => {
                    console.log(error.message)
                    this.setDialog2(false)
                })
            },
            buy_item(data){
                data.buy_yn='Y'
                this.update_diary(data)
                //this.get_diary()
            },
            sell_item(data){
                data.buy_yn=''
                this.update_diary(data)
                //this.get_diary()
            },
            update_diary(data){
                console.log("update_diary")
                axios.put('/diary', data,                    
                    ).then(res => {
                        if(res){
                            this.get_diary()
                            console.log(res)
                        }
                    })
            },            
            go_to_first(data){
                var mod_company_name = data.company_name.replace('(*)', '')

                this.$store.commit('setStockInfo',{
                    item_code: data.jongmok_code,
                    item_name: mod_company_name,
                    start_date: data.start_date,
                })            
                this.$router.push("/main/home");    
            },
            editItem(data){
                this.editedIndex = this.datas.indexOf(data)
                this.editedItem = Object.assign({}, data)
                this.dialog = true
            },
            deleteItem(data){
                this.editedItem = Object.assign({}, data)
                confirm("정말 삭제하시겠습니까?") &&
                axios.delete('/diary',{
                    params: {
                        item_code: this.editedItem.jongmok_code,
                        start_date: this.editedItem.start_date,
                    }
                }).then(res => {
                        if(res){
                            this.get_diary()
                        }
                    })
            },
            getColor(company_name){
                //alert(company_name)
                var isStar = company_name.indexOf('*')

                if( isStar > 0 ){
                    return 'green'
                }
            }
        },
        mounted() {
            this.$store.commit('setPageName',{
                            pageName: '드아이어리'
                            })
            
            //this.get_diary()
            this.datas = this.$store.state.diary_result

            if( this.datas == '' ){
                this.get_diary()
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
        },        
    }
</script>
<style>
ul{
   list-style:none;
   }
</style>