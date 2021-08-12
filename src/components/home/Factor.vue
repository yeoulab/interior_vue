<template>
    <v-container>
        <div>
            <v-btn x-large icon @click="get_factor">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn x-large icon @click="adddata">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn x-large icon @click="set_factor">
                <v-icon>mdi-content-save</v-icon>
            </v-btn>
            <v-data-table
                :headers="headers"
                :items="factors"
                class="elevation-1"
            >
                <template v-slot:item.factor="props">
                    <v-text-field
                    hide-details
                    v-model="props.item.factor"
                    dense
                    outlined>
                    </v-text-field>
                </template>
                <template v-slot:item.type="props">
                    <v-text-field
                    hide-details
                    v-model="props.item.type"
                    dense
                    outlined>
                    </v-text-field>
                </template>
                <template v-slot:item.value="props">
                    <v-text-field
                    hide-details
                    v-model="props.item.value"
                    outlined
                    type="number"
                    dense
                    ></v-text-field>
                </template>
                <template v-slot:item.memo="props">
                    <v-text-field
                    hide-details
                    v-model="props.item.memo"
                    outlined
                    dense
                    ></v-text-field>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn icon @click="del_factor(item)">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>
<script>
import axios from 'axios'

export default {
    data () {
        return {
            dialog: false,
            headers: [
                {
                text: 'Factor',
                align: 'left',
                sortable: false,
                value: 'factor',
                },
                { text: 'Type', value: 'type' },
                { text: 'Value', value: 'value' },
                { text: 'Memo', value: 'memo' },
                { text: '', value: 'actions' }
            ],
            factors: [],
        }
    },
    methods: {
        adddata() {
            var addValue = {
                factor: "",
                type: "",
                value: "",
                memo: ""
            }
            this.factors.push(addValue)
        },
        get_factor(){
            this.setDialog(true)
                axios.get('/factor')
                .then((result) =>{
                    this.factors = result.data
                    this.setDialog(false) 
                })
                .catch(error => {
                    console.log(error.message)
                    this.setDialog(false)
                })
        },
        set_factor(){
            this.setDialog(true)
            axios.post('/factor', this.factors,                    
                ).then(res => {
                    if(res){
                        this.get_factor()
                        console.log(res)
                        this.setDialog(false)
                    }
                })
        },
        del_factor(data){
            this.setDialog(true)
            console.log(data)
            this.editedItem = Object.assign({}, data)
            confirm("정말 삭제하시겠습니까?") &&
                axios.delete('/factor',{
                    params: {
                        factor: this.editedItem.factor,
                    }
                }).then(res => {
                        if(res){
                            this.get_factor()
                        }
                    })
        },
        setDialog(boolean){
            this.dialog = boolean
        },
    },    
    mounted() {        
        this.$store.commit('setPageName',{
                            pageName: '팩터'
                        })
    },
}
</script>
