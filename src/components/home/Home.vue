<template>
    <div class="home">
        <v-container>
            <v-dialog v-model="dialog" persistent max-width="290">
                <div class="text-center">
                    <v-progress-linear
                        indeterminate
                        color="green"
                    ></v-progress-linear>
                </div>
            </v-dialog>            
            <v-row style="height: 40px;">
                <v-col xs6 sm4 md3>
                    <v-text-field
                        label="Name"
                        dense
                        v-model="item_name"
                        @change="item_name_change">
                    </v-text-field>
                </v-col>
                <v-col xs6 sm4 md3>
                    <v-text-field 
                        label="Code"  
                        dense
                        v-model="item_code"
                        @change="item_change">
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field 
                        label="Date" 
                        dense
                        v-model="start_date"
                        v-on:keyup.enter="getInfo">
                    </v-text-field>
                </v-col>
            </v-row>
            <!-- 2020-05-23
                 last date 의 미사용으로 주석처리            
            -->
            <v-row style="height: 70px;">                
                <v-col>
                    <v-btn x-large icon @click="getFinInfo">
                        <v-icon>mdi-newspaper</v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                <v-btn x-large icon @click="getCompInfo">
                    <v-icon>mdi-cash-100</v-icon>
                </v-btn>
                </v-col>
                <v-col>
                <v-btn x-large icon @click="insert_diary">
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
                </v-col>
                <v-col>
                <v-btn x-large icon @click="getInfo">
                    <v-icon>mdi-api</v-icon>
                </v-btn>
                </v-col>
            </v-row>
            <v-row v-show=false> <!-- 2020/07/18 사용하지 않아 삭제함 -->
                <v-col>
                    테마
                    <v-radio-group v-model="theme_score" :mandatory="true">
                        <v-radio small label="3" value=3></v-radio>
                        <v-radio small label="2" value=2></v-radio>
                        <v-radio small label="1" value=1></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    뉴스/공시
                    <v-radio-group v-model="news_score" :mandatory="true">
                        <v-radio small label="3" value=3></v-radio>
                        <v-radio small label="2" value=2></v-radio>
                        <v-radio small label="1" value=1></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    재무정보
                    <v-radio-group v-model="fin_score" :mandatory="true">
                        <v-radio small label="3" value=3></v-radio>
                        <v-radio small label="2" value=2></v-radio>
                        <v-radio small label="1" value=1></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col>
                    <div>   
                        <v-btn @click="get_score">
                            아자
                        </v-btn>
                    </div>
                    <br>
                    <h2>
                        {{ total_score }} 점
                    </h2>
                </v-col>
            </v-row>
            <!--
            <v-simple-table dense>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">주제</th>
                        <th class="text-center">Score</th>
                    </tr>
                </thead>
                <tbody> -->
                    <!--
                    <tr v-for="info in data.datas" :key="info.name">
                        <td class="text-center">{{ info.subject }}</td>
                        <td class="text-right">{{ info.value }}</td>
                    </tr>
                    -->
                <!--
                </tbody>
                </template>
            </v-simple-table> -->
            <div v-if="code_search_yn">
                <!--
                <v-data-table
                    dense
                    :headers="headers"
                    :items="code_info"
                    hide-default-footer
                    item-key="subject">
                </v-data-table>
                -->
                <v-card class="mx-auto" tile>          
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="item in code_info" :key="item.subject">
                            <td>{{ item.subject }}</td>
                            <td>{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                </v-card>
            </div>            
            <br>
            <div v-if="search_yn">
                <v-card class="mx-auto" tile>
                    <v-simple-table dense>
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td>총발생주식수</td>
                                    <td>{{data.company_detail_info.tot_stock_cnt}}</td>
                                    <td>유통주식수</td>
                                    <td>{{data.company_detail_info.cir_stock_cnt}}</td>
                                </tr>
                                <tr>
                                    <td>시가총액</td>
                                    <td>{{data.company_detail_info.market_cap}}</td>
                                    <td>유통비율</td>
                                    <td>{{data.company_detail_info.cir_stock_ratio}}%</td>
                                </tr>
                                <tr>
                                    <td>총거래량</td>
                                    <td>{{data.max_info.tot_tr_quant}}</td>
                                    <td>최대거래량</td>
                                    <td>{{data.max_info.max_tr_quant}}</td>
                                </tr>
                                <tr>
                                    <td>거래일자</td>
                                    <td>{{data.max_info.max_tr_date}}</td>
                                    <td>최대거래비율</td>
                                    <td>{{data.max_info.max_tr_ratio}}%</td>
                                </tr>
                                <tr>
                                    <td colspan="2">총거래량 / 유통주식수</td>
                                    <td colspan="2">{{ data.max_info.tot_cir_ratio }}%</td>
                                </tr>
                                <tr>
                                    <td colspan="2">최대거래량 / 유통주식수</td>
                                    <td colspan="2">{{ data.max_info.max_cir_ratio }}%</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
                <br>
                <v-card class="mx-auto" tile>
                    <v-simple-table dense>
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td>rsi</td>
                                    <td>{{data.rsi.rsi}}</td>
                                    <td>e_rsi</td>
                                    <td>{{data.rsi.e_rsi}}</td>
                                    <td>→</td>
                                    <td>{{data.rsi.result}}</td>
                                </tr>
                                <tr>
                                    <td>bol_up</td>
                                    <td>{{data.bol_20.bol_up_price}}</td>
                                    <td>bol_down</td>
                                    <td>{{data.bol_20.bol_dw_price}}</td>
                                    <td>→</td>
                                    <td>{{data.bol_20.result}}</td>
                                </tr>
                                <tr>
                                    <td>macd</td>
                                    <td>{{data.macd.macd}}</td>
                                    <td>macd_signal</td>
                                    <td>{{data.macd.macd_signal}}</td>
                                    <td>→</td>
                                    <td>{{data.macd.result}}</td>
                                </tr>
                                <tr>
                                    <td>slow_k</td>
                                    <td>{{data.stochastic.slow_k}}</td>
                                    <td>slow_d</td>
                                    <td>{{data.stochastic.slow_d}}</td>
                                    <td>→</td>
                                    <td>{{data.stochastic.result}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
                <br>
                <v-card class="mx-auto" tile>
                    <v-simple-table dense>
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">주제</th>
                                <th class="text-center">현재값</th>
                                <th class="text-center">직전값</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="info in data.datas" :key="info.name">
                                <td class="text-center">{{ info.subject }}</td>
                                <td class="text-right">{{ info.value }}</td>
                                <td class="text-right">{{ info.pre_value }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
                <br>
                <v-card class="mx-auto" tile>
                    <v-simple-table dense>
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">Date</th>
                                <th class="text-center">외인</th>
                                <th class="text-center">기관</th>
                                <th class="text-center">개인</th>
                                <th class="text-center">평균거래</th>
                                <th class="text-center">외인(평균)</th>
                                <th class="text-center">기관(평균)</th>
                                <th class="text-center">개인(평균)</th>
                                <th class="text-center">거래(평균)</th>
                                <th class="text-center">비율(평균)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(info, i) in data.transition" :key="i">
                                <td v-for="(val, j) in info" :key="j">
                                    {{ info[j] }}
                                </td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'

export default{
    data() {
        return{           
            item_name: '', 
            item_code: '',
            start_date: '',
            end_date: '',
            baseLink: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=',
            link: '',
            totLink: 'https://m.stock.naver.com/item/main.nhn#/stocks/',
            headers: [
                { text: 'Subject', value: 'subject'},
                { text: 'Value', value: 'value'}
            ],
            code_search_yn: false,
            code_info: [],
            headers2: [
                { text: 'Subject', value: 'subject'},
                { text: 'Value', value: 'value'},
                { text: 'preValue', value: 'pre_value' }
            ],
            search_yn: false,
            data: {
                datas: [],
                pre_datas: [],
                max_info: {},
                company_detail_info: {},
                transition: [],
                rsi: {},
                bol_20: {},
                macd: {},
                stochastic: {}
            },
            theme_score: 0,
            news_score: 0,
            fin_score: 0,
            total_score: 0,
            dialog: false,
        }
    },
    methods: {
        setDialog(boolean){
            this.dialog = boolean
        },
        getInfo(){
            this.setDialog(true)
            axios.get('/unitPrice',{
                params: {
                    item_code: this.item_code,
                    start_date: this.start_date,
                    end_date: this.end_date,
                }
            })
            .then((result) =>{
                //console.log(result.data)
                this.search_yn = true
                this.data.pre_datas = this.data.datas
                this.data.max_info = result.data.max_info
                this.data.company_detail_info = result.data.company_detail_info
                this.data.rsi = result.data.rsi
                this.data.bol_20 = result.data.bol_20
                this.data.macd = result.data.macd
                this.data.stochastic = result.data.stochastic                
                this.data.datas = result.data.result
                this.data.transition = result.data.transition

                var fin_amt = this.data.datas[8].value.split(":")[1].split("/")[0].replace(",","").trim()

                // 통계값으로 예측하기
                // 1.rsi
                if(this.data.rsi.e_rsi <= 20){
                    this.data.rsi.result = "매수"
                }else if(this.data.rsi.e_rsi >= 80){
                    this.data.rsi.result = "매도"
                }else{
                    this.data.rsi.result = "관망"
                }

                // 2.bollinger
                if(this.data.bol_20.bol_dw_price >= fin_amt){
                    this.data.bol_20.result = "매수"
                }else if(this.data.bol_20.bol_up_price <= fin_amt){
                    this.data.bol_20.result = "매도"
                }else{
                    this.data.bol_20.result = "관망"
                }
                this.data.bol_20.bol_up_price = numberWithCommas(this.data.bol_20.bol_up_price)
                this.data.bol_20.bol_dw_price = numberWithCommas(this.data.bol_20.bol_dw_price)

                // 3. macd
                if(this.data.macd.macd >0){
                    if(this.data.macd.macd_oscillator > 0){
                        this.data.macd.result = "대세상승/골든크로스"
                    }else{
                        this.data.macd.result = "대세상승/데드크로스"
                    }
                }else{
                    if(this.data.macd.macd_oscillator > 0){
                        this.data.macd.result = "대세하락/골든크로스"
                    }else{
                        this.data.macd.result = "대세하락/데드크로스"
                    }
                }

                // 4. stochastic
                if(this.data.stochastic.slow_k <= 20){
                    if( this.data.stochastic.slow_k > this.data.stochastic.slow_d){
                        this.data.stochastic.result = "과매도/매수!"
                    }else{
                        this.data.stochastic.result = "과매도/관망"
                    }
                }else if(this.data.stochastic.slow_k >= 80){
                    if( this.data.stochastic.slow_k > this.data.stochastic.slow_d){
                        this.data.stochastic.result = "과매수/관망"
                    }else{
                        this.data.stochastic.result = "과매도/매도!"
                    }
                }else{
                    this.data.stochastic.result = "관망"
                }

                for( var i = 0 ; i < this.data.datas.length ; i++ ){
                    this.data.datas[i].pre_value = this.data.pre_datas[i].value
                }
                this.setDialog(false)
            })
            .catch(error =>{
                console.log(error.message)
                this.setDialog(false)
            })
        },
        getCompInfo(){
            window.open(this.link ,"");
        },
        getFinInfo(){

            if( this.item_code == "" ){
                return
            }
            var new_link = this.totLink + this.item_code + "/news"
            window.open(new_link, "");
        },
        insert_diary(){
            this.setDialog(true)
            var params = {}
            params.jongmok_code = this.item_code
            params.start_date = this.start_date
            params.company_name = this.item_name
            params.buy_reasone = "개인매수단가 : " + this.data.datas[5].value
            console.log(params)
            axios.post('/diary', params)
            .then(res => {
                console.log(res.status)
                this.setDialog(false)
                this.$store.commit('setDiaryResult',{
                    diary_result: []
                })
            })
            .catch(error =>{
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
                    console.log(result)
                    this.code_info = result.data
                    this.code_search_yn = true
                    this.link = this.baseLink + this.item_code
                })
            }
            else{
                this.link = this.baseLink
                this.code_search_yn = false
                this.search_yn = false
                this.data.datas = []
                this.code_info = []
            }
        },
        get_score(){
            // 1. 최대 거래량 score
            var max_cir_ratio = Number(this.data.max_info.max_cir_ratio)
            var max_cir_ratio_score = 0
            if( max_cir_ratio >= 100.0 ){ max_cir_ratio_score = 5 }
            else if( 70.0 <= max_cir_ratio ){ max_cir_ratio_score = 4 }
            else if( 40.0 <= max_cir_ratio ){ max_cir_ratio_score = 3 }
            else if( 10.0 <= max_cir_ratio ){ max_cir_ratio_score = 2 }
            else{ max_cir_ratio_score = 1 }

            console.log("max_cir_ratio_score : " + max_cir_ratio_score)

            // 2. 구간 거래량
            var tot_cir_ratio = Number(this.data.max_info.tot_cir_ratio)
            console.log(tot_cir_ratio)
            var tot_cir_ratio_score = 0
            if( tot_cir_ratio >= 200 && tot_cir_ratio <= 500 ){ tot_cir_ratio_score = 5 }
            else if ( tot_cir_ratio >= 150 && tot_cir_ratio < 200 ){ tot_cir_ratio_score = 4 }
            else if ( tot_cir_ratio >= 500 && tot_cir_ratio < 600 ){ tot_cir_ratio_score = 4 }
            else if ( tot_cir_ratio >= 120 && tot_cir_ratio < 150 ){ tot_cir_ratio_score = 3 }
            else if ( tot_cir_ratio >= 600 && tot_cir_ratio < 800 ){ tot_cir_ratio_score = 3 }
            else if ( tot_cir_ratio >= 100 && tot_cir_ratio < 120 ){ tot_cir_ratio_score = 2 }
            else if ( tot_cir_ratio >= 800 && tot_cir_ratio < 1000 ){ tot_cir_ratio_score = 2 }
            else if ( tot_cir_ratio < 100 || tot_cir_ratio > 1000 ){ tot_cir_ratio_score = 1 }

            console.log("tot_cir_ratio_score : "+tot_cir_ratio_score)

            // 3. 개인 매수 비율
            var cir_stock_cnt = this.data.company_detail_info.cir_stock_cnt.replace(/,/gi,"") // 유통주식수
            var ind_tr_cnt = this.data.datas[2].value.replace(/,/gi,"")
            var ind_tr_ratio = Number(ind_tr_cnt / cir_stock_cnt * 100).toFixed(2)
            var ind_tr_ratio_score = 0
            if( ind_tr_ratio >= 10 ){ ind_tr_ratio_score = 5 }
            else if( ind_tr_ratio >= 5 ){ ind_tr_ratio_score = 4 }
            else if( ind_tr_ratio >= 3 ){ ind_tr_ratio_score = 3 }
            else if( ind_tr_ratio >= 1 ){ ind_tr_ratio_score = 2 }
            else if( ind_tr_ratio >= 0 ){ ind_tr_ratio_score = 1 }
            console.log("ind_tr_ratio : " + ind_tr_ratio)
            console.log("ind_tr_ratio_score : " + ind_tr_ratio_score)

            // 4. 개인 매수세 확인
            var total_tr_cnt = 0;
            var minus_tr_cnt = 0;
            var minus_ratio = 0;
            var minus_ratio_score = 0;
            for( var i = 0 ; i < this.data.transition.length ; i ++ ){
                total_tr_cnt++;
                var ind_tran_cnt = this.data.transition[i][3].replace(/,/gi,"")                
                if( ind_tran_cnt < 0 ){                    
                    minus_tr_cnt++;
                }
            }
            console.log("minus_tr_cnt : " + minus_tr_cnt)
            minus_ratio = minus_tr_cnt / total_tr_cnt * 100;

            if( minus_ratio == 0 ) { minus_ratio_score = 5 }
            else if( minus_ratio < 10 ){ minus_ratio_score = 4 }
            else if( minus_ratio < 20 ){ minus_ratio_score = 3 }
            else if( minus_ratio < 35 ){ minus_ratio_score = 2 }
            else if( minus_ratio < 50 ){ minus_ratio_score = 1 }

            console.log("minus_ratio : " + minus_ratio)
            console.log("minus_ratio_score : " + minus_ratio_score)

            // 5. 개인 평균가 vs 현재가
            var split_result = this.data.datas[8].value.split('/');
            var avg_amt_ratio = split_result[1].replace(/%/gi,"")
            var avg_amt_ratio_score = 0
            console.log("avg_amt_ratio : " + avg_amt_ratio)
            if( avg_amt_ratio > 20 && avg_amt_ratio <=30 ){ avg_amt_ratio_score = 5 }
            else if( avg_amt_ratio > 10 && avg_amt_ratio <= 20 ){ avg_amt_ratio_score = 4 }
            else if( avg_amt_ratio > 3  && avg_amt_ratio <= 10 ){ avg_amt_ratio_score = 3 }
            else if( avg_amt_ratio > 30 && avg_amt_ratio <= 50 ){ avg_amt_ratio_score = 3 }
            else if( avg_amt_ratio >  0 && avg_amt_ratio <= 3  ){ avg_amt_ratio_score = 2 }
            else if( avg_amt_ratio > 50 ){ avg_amt_ratio_score =  2 }
            else{ avg_amt_ratio_score = 1 }
            console.log("avg_amt_ratio_score : " + avg_amt_ratio_score)
            
            // 6. 테마
            //  3점 - 테마가 확실한가(정치테마주인 경우에는 대장주, 전기차 등등 테마가 명확한가)
            //  2점 - 테마가 보통(마스크, 자동차, 반도체 부품주 등)
            //  1점 - 테마가 불확실함(망한 정치인...)
            var theme_score = parseInt(this.theme_score)

            // 7. 뉴스 및 공시
            //  3점 - 무상증자, 자사주 매입, 주식 소각등 좋은 뉴스들이 많은지
            //  2점 - 보통
            //  1점 - 감자, 유상증자, CB 발행, 타회사 담보 등
            var news_score = parseInt(this.news_score)

            // 8. 재무제표
            //  3점 - 만성흑자 
            //  2점 - 흑자적자 왔다리갔다리
            //  1점 - 만성적자
            var fin_score = parseInt(this.fin_score)

            console.log("theme_score : " + theme_score)
            console.log("news_score : " + news_score)
            console.log("fin_score : " + fin_score)

            this.total_score = (max_cir_ratio_score + tot_cir_ratio_score + ind_tr_ratio_score + minus_ratio_score + avg_amt_ratio_score + theme_score + news_score + fin_score) * 3
        }
    },
    mounted() {
        this.$store.commit('setPageName',{
                          pageName: '홈'
                        }),
        console.log(this.$store.state.stockInfo)
        this.item_code = this.$store.state.stockInfo.item_code
        this.item_name = this.$store.state.stockInfo.item_name
        this.start_date = this.$store.state.stockInfo.start_date

        if( this.item_code != "" ){
            this.item_change()
            this.getInfo()
        }                                
    },    
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Sunflower:500');

html, body {
  font-family: 'Sunflower', sans-serif;
}
 
#app {
  font-family: 'Sunflower', sans-serif;
}
</style>