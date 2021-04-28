<template>
    <v-container>
        <v-dialog v-model="dialog" persistent max-width="290">
            <div class="text-center">
                <v-progress-linear
                    indeterminate
                    color="green"
                ></v-progress-linear>
            </div>
        </v-dialog>         
        <v-row>
            <v-col cols="8" style="height: 50px;">
                <v-text-field 
                    label="배치 일자" 
                    outlined 
                    dense
                    v-model="tr_date">
                </v-text-field>
            </v-col>
            <v-col cols="1">
                <v-btn class="mx-2" fab dark small  @click="get_statistic">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <v-data-table
            :headers="headers"
            :items="stats_result"
            :search="search"
            class="elevation-1"
            :mobile-breakpoint="mobileBreakpoint"
            :items-per-page="1000"
            hide-default-footer
        >
            <template v-slot:item.jongmok_info="{ item }">
                <v-btn 
                  text
                  color="purple"
                  @click="go_to_first(item)">
                  {{ item.jongmok_info }}
                </v-btn>
            </template>        
            <template v-slot:item.actions="{ item }">
                <v-btn
                    icon
                    color="blue">
                    <v-icon
                        @click="go_to_first(item)"
                    >
                        mdi-bullseye-arrow
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>        
    </v-container>    
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return{
            item_name: '', 
            item_code: '',
            tr_date: '',
            max_cir_ratio: 0,
            tot_cir_ratio: 0,
            // 아래는 데이터테이블을 위한 변수들
            search: '',
            mobileBreakpoint: 600,
            headers: [
                {
                    text: '종목',
                    value: 'jongmok_info'
                },
                { text: '재무점수(Y/Q)', value: 'score_info'},
                { text: '개인평단/종가/수익율', value: 'price_info'},
                { text: '개인비율/MAX/TOTAL', value: 'tr_info'},
                //{ text: 'Cal', value: 'actions'},
            ],
            stats_result: [],
            dialog: false,
        }
    },
    methods:{
        setDialog(boolean){
            this.dialog = boolean
        },        
        get_statistic(){
            if( this.tr_date == "" ){
                alert("배치일자는 입력합시다")
                return
            }

            this.setDialog(true)
            axios.get('/stats',{
                params: {
                    item: this.item_code,
                    tr_date: this.tr_date,
                    max_cir_ratio: this.max_cir_ratio,
                    tot_cir_ratio: this.tot_cir_ratio
                }
            })
            .then((result => {
                console.log(result.data)
                this.$store.commit('setStatResult',{
                          stats_result: result.data
                        }),
                this.stats_result = result.data
                this.setDialog(false)
            }))
            .catch(error => {
                console.log(error.message)
                this.setDialog(false)
            })
        },
        item_name_change(){
            axios.get('/item/code',{
                params: {
                    item_name: this.item_name,
                }
            })
            .then((result) =>{
                console.log(result)
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
                    this.item_name = result.data[0].value
                })
            }
        },
        go_to_first(data){
            this.$store.commit('setStockInfo',{
                item_code: data.jongmok_code,
                item_name: data.company_name,
                start_date: data.start_date,
            })            
            this.$router.push("/main/home");    
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
    },
    mounted() {
        this.$store.commit('setPageName',{
                          pageName: '통계'
                        })
        // vuex 에 있는 조회결과값을 가져온다.
        this.stats_result = this.$store.state.stats_result

        var date = new Date();
        var year = date.getFullYear(); 
        var month = new String(date.getMonth()+1); 
        var day = new String(date.getDate()); 

        // 한자리수일 경우 0을 채워준다. 
        if(month.length == 1){ 
            month = "0" + month; 
        } 
        if(day.length == 1){ 
            day = "0" + day; 
        } 
        //alert(date)
        this.tr_date = year + "" + month + "" + day;
    },
    computed: {
        numberOfPages () {
            return Math.ceil(this.stats_result.length / this.itemsPerPage)
        },
        filteredKeys () {
            return this.keys.filter(key => key !== `Name`)
        },
    },    
}
</script>