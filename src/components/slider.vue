<template>
    <div class="slider bg-white">
        <div class="relative">
            <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
                <swiper-slide class="text-center" v-for="(photo,index) in photos" :key="`gallery${index}`">
                    <img :src="photo.replace('{0}','800x600')" alt="Resim">
                </swiper-slide>            
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
            <span class="image-gallery-icon" @click="runGallery">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" size="lg"/>
            </span>
        </div>      
        <swiper class="swiper gallery-thumbs my-2" :options="swiperOptionThumbs" ref="swiperThumbs">
            <swiper-slide class="text-center" v-for="(photo,index) in photos" :key="`gallery${index}`">
                <img :src="photo.replace('{0}','120x90')" alt="Resim">
            </swiper-slide>
        </swiper>

        <div class="product-gallery" v-if="galleryItems.length > 0">
            <span class="image-gallery-close" @click="closeGallery">
                &times;
            </span>
            <Lingallery :responsive="responsive" :items="galleryItems"/>
        </div>
    </div>
</template>

<script>
    import Lingallery from 'lingallery';
    export default {
        name: "Slider",
        components:{
            Lingallery
        },
        props:[
            "photos"
        ],
        data() {
            return {
                swiperOptionTop: {
                  loop: true,
                  loopedSlides: 5, // looped slides should be the same
                  spaceBetween: 10,
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                  }
                },
                swiperOptionThumbs: {
                  loop: true,
                  loopedSlides: 10, // looped slides should be the same
                  spaceBetween: 10,
                  centeredSlides: true,
                  slidesPerView: 5,
                  touchRatio: 0.1,
                  slideToClickedSlide: true
                },
                responsive:true,
                galleryItems: []
            }
        },
        methods:{
            runGallery(){
                this.galleryItems = this.photos.map(item => {
                    return {
                      src: item.replaceAll("{0}","1920x1080"),
                      thumbnail: item.replaceAll("{0}","120x90")
                    }
                });
                document.body.style.overflow = "hidden";
            },
            closeGallery(){
                this.galleryItems=[];
                document.body.style.overflow="initial";
            }
        },
        mounted() {
            this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.$swiper
                const swiperThumbs = this.$refs.swiperThumbs.$swiper
                swiperTop.controller.control = swiperThumbs
                swiperThumbs.controller.control = swiperTop
            })
        }
    };
</script>

<style>
    .swiper-slide img {
        display: initial;
    }

    .gallery-thumbs .swiper-slide {
        opacity: .5;
    }
    
    .gallery-thumbs .swiper-slide.swiper-slide-active {
        opacity: 1;
    }

    .image-gallery-icon {
        position: absolute;
        bottom: 15px;
        right: 15px;
        z-index: 1;
        cursor: pointer;
    }

    .product-gallery {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #000000;
        z-index: 99999999;
        padding: 2em;
        overflow: auto;
    }

    .image-gallery-close {
        font-size: 50px;
        color: #ffffff;
        position: absolute;
        top: 2px;
        right: 3px;
        line-height: 40px;
        cursor: pointer;
    }
</style>