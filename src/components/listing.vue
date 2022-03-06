<template>
    <div class="listing">
        <table class="table-auto border w-full bg-white" id="productTable" v-if="!isMobile">
            <thead class="border-b product-head">
                <tr>
                    <th scope="col"></th>
                    <th scope="col" class="px-2 py-3 text-left border-r">Model</th>
                    <th scope="col" class="px-2 py-3 border-r">İlan Başlığı</th>
                    <th scope="col" class="px-2 py-3 border-r">Yıl</th>
                    <th scope="col" class="px-2 py-3 border-r">Kilometre</th>
                    <th scope="col" class="px-2 py-3 border-r">Renk</th>
                    <th scope="col" class="px-2 py-3 border-r">Fiyat</th>
                    <th scope="col" class="px-2 py-3 border-r">Tarih</th>
                    <th scope="col" class="px-2 py-3 border-r">İl/İlçe</th>
                </tr>
            </thead>
            <tbody class="product-body">
                <tr class="border-b text-sm hover:bg-gray-100" v-for="(product,index) in products" :key="`product${index}`">
                    <td class="p-1 text-sm font-medium text-gray-900 border-r product-photo">
                        <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                            <img :src="product.photo.replace('{0}','120x90')" :ait="product.title" width="120" height="90">                            
                        </router-link>
                    </td>
                    <td class="px-2 py-1 border-r product-model-name">
                        <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                            {{product.modelName}}                           
                        </router-link>
                    </td>
                    <td class="px-2 py-1 border-r product-title">
                        <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                            {{product.title}}                           
                        </router-link>
                    </td>
                    <td class="px-2 py-1 border-r product-year text-center">
                        <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                            {{product.properties.find(x => x.name == 'year').value}}
                        </router-link>                        
                    </td>
                    <td class="px-2 py-1 border-r product-km text-center">
                        <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                            {{product.properties.find(x => x.name == 'km').value}}
                        </router-link>
                    </td>
                    <td class="px-2 py-1 border-r product-color text-center">
                        <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                            {{product.properties.find(x => x.name == 'color').value}}
                        </router-link>
                    </td>
                    <td class="px-2 py-1 border-r whitespace-nowrap text-center product-price">
                        <router-link class="text-red-600 font-semibold" :to="`/detail?id=${product.id}`" :title="product.title">
                            {{product.price | priceFormat}}
                        </router-link>
                    </td>
                    <td class="px-2 py-1 border-r whitespace-nowrap text-center product-date">
                        <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                            {{product.dateFormatted}}
                        </router-link>
                    </td>
                    <td class="px-2 py-1 border-r product-province">
                        <div class="flex flex-col items-center justify-center">
                            <span>
                                {{product.location.cityName}}
                            </span>
                            <span>
                                {{product.location.townName}}
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="" v-else>
            <div class="grid grid-cols-1" >
                <div class="col-span-12 bg-white border-b px-2" v-for="(product,index) in products" :key="`product${index}`">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="col-span-1 flex items-center">
                            <router-link class="" :to="`/detail?id=${product.id}`" :title="product.title">
                                <img :src="product.photo.replace('{0}','120x90')" :ait="product.title" width="120" height="90">                            
                            </router-link>
                        </div>
                        <div class="col-span-2">
                            <div class="grid grid-cols-1">                                
                                <div class="col-span-12 mt-1 mb-3">
                                    <router-link class="text-sm font-semibold break-words text-clamp-2" :to="`/detail?id=${product.id}`" :title="product.title">
                                        {{product.title}}                           
                                    </router-link>
                                </div>
                                <div class="col-span-12 mb-1 mt-3">
                                    <div class="flex justify-between">
                                        <div class="flex items-center text-xs">
                                            {{product.location.cityName}} , {{product.location.townName}}
                                        </div>
                                        <router-link class="text-red-600 font-semibold" :to="`/detail?id=${product.id}`" :title="product.title">
                                            {{product.price | priceFormat}} TL
                                        </router-link>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
    export default {
        name: "Listing",
        props: {
            products:Array
        },
        data(){
            return{
                isMobile:window.screen.width > 768 ? false : true
            }
        },
        mounted() {
        },
        methods: {
            
        },
        created(){
        }
    };
</script>

<style scoped>
    .product-body img {
        width: auto;
        max-width: 106px;
        height: 75px;
        display: block;
        margin: auto;
    }

    .text-clamp-2
    {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
