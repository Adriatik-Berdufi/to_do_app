<script>
    import axios from 'axios';

    export default{
        name: 'Albo',
        data(){
            return{
                comics:{},
                nr: 100,
            };
        },
        created() {
            this.loadComic(this.nr);
        },
        methods:{
            formatDate(day, month, year) {
                return `${day}/${month}/${year}`;
            },
            loadComic(num){
                axios.get(`/xkcd/${num}/info.0.json`)
                .then(response => {
                    this.comics = response.data;
                    //console.log(this.comics);
                })
                .catch(error => {
                    console.error('Errore nella risp del sito:', error);
                });

            },
            previousComic() {
                    this.nr = --this.nr ;
                    this.loadComic(this.nr); 
            },
            nextsComic() {
                this.nr = ++this.nr ;
                    this.loadComic(this.nr); 
            }
        }
    }
</script>
<template>

        <h1 class="text-center my-5">Albo</h1>
        
        <v-card class=" ms-auto me-auto text-center w-50 "  v-if="comics.num">
            <p class="text-start mt-3 ms-3"><strong>Nr della vignetta:</strong> {{ comics.num }}</p>
            <p class="text-start mt-3 ms-3"><strong>Titolo della vignetta:</strong> {{ comics.safe_title }}</p>
            <p class="text-start mt-3 ms-3"><strong>Data di pubblicazione:</strong> {{ formatDate(comics.day, comics.month, comics.year) }}</p>
            <img :src="comics.img" width="200px" alt="Vignetta XKCD" style="max-width: 100%; height: auto;"> 
            
        </v-card>
        <p v-else>Caricamento...</p> 

        <div class="mt-5 text-center">
            <v-btn  @click="previousComic" class="me-2">
                <v-icon>mdi-chevron-left</v-icon> Prev
            </v-btn>
            <v-btn @click="nextsComic" >
                Next <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </div>

 
</template>
<style>
</style>