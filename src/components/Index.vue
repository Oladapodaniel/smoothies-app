<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="delete material-icons" @click="deleteSmoothie(smoothie.id)">delete</i>
                <h2 class="indigo-text">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                        <span class="chip">{{ ing }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import database from '@/firebase/init'
export default {
    name: 'Index',
    data () {
        return {
            smoothies: [
                // { title: 'Ninja Brew', slug: 'jnkm', ingredients: ['hbgfvv', 'ytre', 'rtvf'], id: 3 },
                // { title: 'Nerther', slug: 'juyyh', ingredients: ['hbgfvv', 'ytre', 'rtvf'], id: 2 },
                // { title: 'Ninja Brew', slug: 'jnkm', ingredients: ['hbgfvv', 'ytre', 'rtvf'], id: 6 },
                // { title: 'Nhhgfd', slug: 'jhgf', ingredients: ['hbgfvv', 'ytre', 'rtvf'], id: 9 }
            ]
        }
    },
    methods: {
        deleteSmoothie (id) {
     
            //delete from database
            database.collection('smoothies').doc(id).delete()            // delete locally from browser
                 .then(() => {
                    // Method One
                        // let index = this.smoothies.findIndex((i) => {
                        //     return i.id == id
                        // })
                        // this.smoothies.splice(index, 1)
                        // OR
                    // Method Two
                   this.smoothies = this.smoothies.filter((smoothie) => {
                    // if the id passed in is not equal to the id on loop iteration, filter it out, if it is, filter it in
                    return smoothie.id != id

                     })
                 })
            
        }
    },
    created () {
        database.collection('smoothies').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    // console.log(doc.data(), doc.id)
                    let smoothie = doc.data()
                    smoothie.id = doc.id
                    this.smoothies.push(smoothie)
                    // console.log(smoothie)
                })
            })
    }

}
</script>

<style>
.index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
}
.index h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
}
.index .ingredients {
    margin: 30px auto;
}

.index .ingredients li {
    display: inline-block;
}

.index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
}

</style>