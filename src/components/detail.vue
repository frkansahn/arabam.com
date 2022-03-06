<template>
    <div class="detail my-5">
        <div class="container mx-auto" v-if="product">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 product-title mb-3 px-2 md:px-0">
                    <div class="text-xl font-bold">
                        {{product.title}}
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6 px-2 md:px-0">
                    <Slider :photos="product.photos"/>                    
                </div>
                <div class="col-span-12 md:col-span-3">
                    <div class="grid px-5 py-4 bg-white">
                        <div class="col-span-12 product-price mb-4">
                            <div class="text-xl font-bold text-red-600">
                                {{product.price | priceFormat}} TL
                            </div>
                        </div>
                        <div class="col-span-12 product-address mb-3">
                            <div class="text-md font-semibold text-black-800 uppercase">
                                {{product.location.cityName}} / {{product.location.townName}}
                            </div>
                        </div>
                        <div class="col-span-12 my-2">
                            <ul class="grid">
                                <li class="col-span-12 my-1 border-b pb-2 hover:text-gray-400">
                                    <div class="grid grid-cols-2">
                                        <div class="text-xs font-semibold">
                                            İlan Tarihi :
                                        </div>
                                        <div class="text-xs font-medium">
                                            {{product.dateFormatted}}
                                        </div>
                                    </div>
                                </li>
                                <li class="col-span-12 my-1 border-b pb-2 hover:text-gray-400">
                                    <div class="grid grid-cols-2">
                                        <div class="text-xs font-semibold">
                                            Model :
                                        </div>
                                        <div class="text-xs font-medium">
                                            {{product.modelName}}
                                        </div>
                                    </div>
                                </li>
                                <li class="col-span-12 my-1 border-b pb-2 hover:text-gray-400">
                                    <div class="grid grid-cols-2">
                                        <div class="text-xs font-semibold">
                                            Kilometre :
                                        </div>
                                        <div class="text-xs font-medium">
                                            {{product.properties.find(x => x.name == 'km').value}}
                                        </div>
                                    </div>
                                </li>
                                <li class="col-span-12 my-1 border-b pb-2 hover:text-gray-400">
                                    <div class="grid grid-cols-2">
                                        <div class="text-xs font-semibold">
                                            Renk :
                                        </div>
                                        <div class="text-xs font-medium">
                                            {{product.properties.find(x => x.name == 'color').value}}
                                        </div>
                                    </div>
                                </li>
                                <li class="col-span-12 my-1 border-b pb-2 hover:text-gray-400">
                                    <div class="grid grid-cols-2">
                                        <div class="text-xs font-semibold">
                                            Yıl :
                                        </div>
                                        <div class="text-xs font-medium">
                                            {{product.properties.find(x => x.name == 'year').value}}
                                        </div>
                                    </div>
                                </li>
                                <li class="col-span-12 my-1 border-b pb-2 hover:text-gray-400">
                                    <div class="grid grid-cols-2">
                                        <div class="text-xs font-semibold">
                                            Vites :
                                        </div>
                                        <div class="text-xs font-medium">
                                            {{product.properties.find(x => x.name == 'gear').value}}
                                        </div>
                                    </div>
                                </li>
                                <li class="col-span-12 my-1 pb-2 hover:text-gray-400">
                                    <div class="grid grid-cols-2">
                                        <div class="text-xs font-semibold">
                                            Yakıt :
                                        </div>
                                        <div class="text-xs font-medium">
                                            {{product.properties.find(x => x.name == 'fuel').value}}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-3 ">
                    <div class="grid px-5 py-4 bg-gray-200">
                        <div class="col-span-12 product-user">
                            <div class="text-xl font-semibold text-black-600">
                                {{product.userInfo.nameSurname}}
                            </div>
                        </div>
                    </div>
                    <div class="grid px-5 py-4 bg-white">
                        <div class="col-span-12 product-price">
                            <div class="text-md font-medium text-black-200">
                                Telefon
                            </div>
                            <div class="text-lg font-semibold text-black-600">
                                <a :href="`tel:${product.userInfo.phone}`">
                                    {{product.userInfo.phone | phoneFormat}}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 mt-6">
                    <div class="flex flex-nowrap px-2 md:px-0" id="productTabs">
                        <div class=" tab" :class="[selectedTabs == 0 ? 'active':'']" @click="selectedTabs=0">
                            Ürün Özellikleri
                        </div>
                        <div class="tab" :class="[selectedTabs == 1 ? 'active':'']" @click="selectedTabs=1">
                            Araç Bilgisi
                        </div>
                    </div>
                    <div class="grid px-5 py-4 border bg-white mt-3" id="tabsContent">
                        <div v-if="selectedTabs == 0" class="col-span-12 product-description" v-html="product.text">
                            
                        </div>
                        <div v-if="selectedTabs == 1" class="col-span-12 product-information">
                            <p>
                                Araç hakkında
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>    
    import Slider from '@/components/slider'
    export default {
        name: "Detail",
        components:{
            Slider
        },
        props: {
        },
        data(){
            return{
                product:undefined,
                selectedTabs:0
            }
        },
        methods: {
            getProductDetail(id){
                try
                {
                    var _this = this;
                    _this.$store.dispatch('getService' , {"urlParameter":"/detail?id="+id})
                    .then(response => {
                        if(response)
                            _this.product = response.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
                catch(err){
                    console.log(err);
                }
            }
        },
        created(){
            try
            {
                var id = this.$route.query.id;
                if(id)
                    this.getProductDetail(id);
                else
                    this.$router.push("/");
            }
            catch(err)
            {
                this.$router.push("/"); 
            }
            
        }
    };
</script>

<style scoped>
    #productTabs {
        overflow: auto;
    }

    #productTabs::-webkit-scrollbar {
        display: none;
    }
    #productTabs .tab {
        font-size: 19px;
        font-weight: normal;
        color: #000000;
        line-height: normal;
        text-align: center;
        padding: 1em 0;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 1em;
    }

    #productTabs .tab.active {
        border-bottom: 2px solid #dc2626;
        color: #dc2626;
        font-weight: 600;
    }
</style>
