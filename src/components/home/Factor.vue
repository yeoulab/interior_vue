<template>
    <v-container>
        <div>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon @click="adddata">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon>
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
            </v-data-table>
        </div>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
        headers: [
            {
            text: 'Factor',
            align: 'left',
            sortable: false,
            value: 'factor',
            },
            { text: 'Type', value: 'factor' },
            { text: 'Value', value: 'type' },
            { text: 'Memo', value: 'memo' },
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
        }
    },    
    mounted() {        
        this.$store.commit('setPageName',{
                            pageName: '팩터'
                        })
    },
}
</script>
