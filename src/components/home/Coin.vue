<template>
    <v-container>
        <v-btn 
        x-large 
        icon
        @click="get_coin">
            <v-icon>mdi-file-find</v-icon>
        </v-btn>
        <v-btn 
        x-large 
        icon
        @click="send_telegram">
            <v-icon>mdi-message-arrow-right</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
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
        </v-data-table>
    </v-container>
</template>
<script>
    import axios from 'axios'

    export default{
        data() {
            return {
                datas: [],
                search: '',
                mobileBreakpoint: 300,
                pageCount: 1000,
                filter: {},
                sortDesc: false,
                page: 1,         
                headers: [
                    {
                        text: '코인명',
                        value: 'korean_name',
                    },
                    { text: '총거래액(억원)', value: 'acc_total_amt' },
                    { text: '총거래량', value: 'acc_total_volume' },
                    //{ text: '총거래금액', value: 'acc_total_price'},
                    { text: 'Max Tr', value: 'max_volume'},
                    //{ text: 'Max Amt', value: 'max_price'},
                    //{ text: 'Min Tr', value: 'min_volume'},
                    //{ text: 'Min Amt', value: 'min_price'},
                    { text: '평균가', value: 'w_avg_buy_price'},
                    { text: '현재가', value: 'cur_price'},
                    { text: 'per', align: 'start', value: 'per'}
                ],
                dialog: false,
            }
        },
        methods: {
            setDialog(boolean){
                this.dialog = boolean
            },            
            get_coin(){
                this.setDialog(true)
                axios.get('/coin')
                .then((result) =>{
                    this.datas = result.data
                    this.$store.commit('setCoinResult',{
                          coin_result: result.data
                        })
                    this.setDialog(false)
                })
                .catch(error => {
                    console.log(error.message)
                    this.setDialog(false)
                })
            },
            send_telegram(){
                this.setDialog(true)
                axios.post('/coin')
                .then(res =>{
                    this.console(res)
                    this.setDialog(false)
                })
            }
        },
        mounted() {
            this.$store.commit('setPageName',{
                            pageName: '가즈아'
                            })
            
            //this.get_diary()
            this.datas = this.$store.state.coin_result

            if( this.datas == '' ){
                this.get_coin()
            }
        },       
    }
</script>
<style> 
ul{
   list-style:none;
   }
</style>