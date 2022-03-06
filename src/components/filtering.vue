<template>
    <div class="filter md:bg-white">
        <span class="mobile-filter" @click="showFilter=true" v-if="isMobile">
            <font-awesome-icon icon="fa-solid fa-filter" />
            Filter
        </span>
        <div class="filter-wrapper" :class="[showFilter ? 'show' : '']">
            <span class="filter-close" @click="showFilter=false" v-if="showFilter">
                &times;
            </span>
            <div class="filter-title border-b py-2 px-4">
                Filtre
            </div>
            <div class="filter-content border-b py-2 px-4">
                <div class="grid grid-cols-1">
                    <div class="col-span-12 my-2">
                       <div class="text-sm font-medium">
                           İlan Tarihi
                       </div> 
                       <div class="grid grid-cols-1 mt-2" >
                            <div class="col-span-12" v-for="(date,index) in listing_date" :key="`date${index}`">
                                <div class="flex items-center my-1">
                                    <input class="mr-2" type="radio" name="radioDate" :id="`radioDate${index}`" :value="date.value" v-model="selectedDate">
                                    <label class="text-sm hover:opacity-100" :for="`radioDate${index}`">
                                        {{date.name}}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter-footer">
                <div class="grid grid-cols-1">
                    <div class="col-span-12 p-2">
                        <normal-button class="bg-red-600 block px-4 py-2 transition duration-100 ease-in-out focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full" @click="filter">
                            ARA
                        </normal-button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
    export default {
        name: "Filtering",
        data(){
            return{
                showFilter:false,
                isMobile:window.screen.width > 768 ? false : true,
                listing_date:[
                    {
                        "name":"Son 1 Gün",
                        "value":"1"
                    },
                    {
                        "name":"Son 2 Gün",
                        "value":"2"
                    },
                    {
                        "name":"Son 3 Gün",
                        "value":"3"
                    },
                    {
                        "name":"Son 7 Gün",
                        "value":"7"
                    },
                    {
                        "name":"Son 30 Gün",
                        "value":"30"
                    },
                    {
                        "name":"Son 2 Yıl",
                        "value":"730"
                    }
                ],
                selectedDate:undefined
            }
        },
        mounted() {
        },
        methods: {            
            filter(){
                var _this = this;
                var minDate , params , nowDate = new Date();

                if(_this.listing_date.find(x => x.value == _this.selectedDate))
                {
                    var selectedValue = _this.listing_date.find(x => x.value == _this.selectedDate).value;
                    var changeDate = nowDate.setDate(nowDate.getDate()-Number(selectedValue));
                    minDate = new Date(changeDate).toISOString().split("T")[0];
                }
                else
                    minDate = null;                

                params = new Array();
                params.push({"key":"minDate","value":minDate});

                _this.$emit('insertParam' , params);
            }
        },
        created(){
            if(this.$route.query.minDate)
                this.selectedDate = Math.ceil((new Date() - new Date(this.$route.query.minDate))/(1000*60*60*24)-1).toString();
        }
    };
</script>

<style scoped>
    @media screen and (max-width: 768px) 
    {
        .mobile-filter {
            background: #ffffff;
            padding: 0.5em 1.5em;
            float: left;
        }

        .filter-close {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 32px;
            line-height: 40px;
            text-align: center;
            width: 40px;
            height: 40px;
            font-weight: 400;
        }
        
        .filter-wrapper
        {
            transform: translateX(-100%);
            transition: all .5s ease;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: #ffffff;
            z-index: 9999;
        }

        .filter-wrapper.show
        {
            transform: translateX(0);
            transition: all .5s ease;
        }
    }
</style>
