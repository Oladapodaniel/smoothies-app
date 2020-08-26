<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <div class="card">
            <div class="card-content">
            <div class="card-title">
                <h2 class="center-align indigo-text">Edit {{ smoothie.title }}</h2>
            </div>
            <div class="card-action">
            <form @submit.prevent="update">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" id="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index">
                <div class="field">
                <label for="ing">Smoothie Title:</label>
                <input type="text" name="ing" id="ing" v-model="smoothie.ingredients[index]">
                <i class="material-icons secondary-content delete" @click="deleteIng(ing)">delete</i>
            </div>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient:</label>
                <input type="text" name="add-ingredient" v-model="another" @keydown.tab.prevent="addIng">
                <div v-if="feedback" class="red-text">Please enter Your Ingredient</div>
            </div>
            <div class="field center-align">
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
            </div>
            </div>
          
        </div>  
    </div>

</template>

<script>
import database from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditSmoothie',
    data () {
        return {
            editSmoothie: this.$route.params.slug,
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        update () {
            if (this.smoothie.title) {
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                replacement: '-',
                remove: /[$*_~.()'"!\-:@]/g,
                lower: true
            })
            // clear the input  
        //    this.smoothie.title = null
             // update to database
            database.collection('smoothies').doc(this.smoothie.id).update({
                title: this.smoothie.title,
                ingredients: this.smoothie.ingredients,
                slug: this.smoothie.slug
            }).then(() => {
                this.$router.push({ name: 'Index' })
            }).catch(err => console.log(err))

           } else {
               this.feedback = 'Please Enter Your title'
           }
        },
        addIng () {
            if (this.another) {
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }  
            
        },
         deleteIng (ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                // when ingredient is not equal to ing, then this return statement is true, then filter the true one out
                return ingredient != ing
                })
        }
    },
    created () {
        let ref = database.collection('smoothies').where('slug', '==', this.$route.params.slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style scoped>
     .edit-smoothie {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .edit-smoothie h2 {
        font-size: 2em;
        margin: 20px auto;
    }

    .edit-smoothie .field {
        position: relative;
        margin: 20px auto;
    }

    .edit-smoothie .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        /* color: #aaa; */
        font-size: 1.4em;
        cursor: pointer;
    }
</style>