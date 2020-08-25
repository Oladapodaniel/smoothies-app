<template>
    <div class="add-smoothie container">
        <div class="card">
            <div class="card-content">
            <div class="card-title">
                <h2 class="center-align indigo-text">Add Smoothie</h2>
            </div>
            <div class="card-action">
            <form @submit.prevent="submit">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients">
                <div class="field">
                <label for="ing">Smoothie Title:</label>
                <input type="text" name="ing" id="ing" v-model="ingredients[index]">
            </div>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient:</label>
                <input type="text" name="add-ingredient" v-model="another" @keydown.tab.prevent="addIng">
                <div v-if="feedback" class="red-text">Please enter Your Ingredient</div>
            </div>
            <div class="field center-align">
                <button class="btn pink">Add Smoothie</button>
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
    name: 'AddSmoothie',
    data () {
        return {
            title: null,
            another: null,
            feedback: null,
            ingredients: [],
            slug: null
        }
    },
    methods: {
        addIng () {
            if (this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
                console.log(this.ingredients)
            }  
            
        },
        submit () {
       

            // create a slug
            if (this.title) {
                // this.title = null
                this.slug = slugify(this.title, {
                replacement: '-',
                remove: /[$*_~.()'"!\-:@]/g,
                lower: true
            })  
            console.log(this.slug)
            this.title = null
           } else {
               this.feedback = 'Please Enter Your title'
           }
            
            database.collection('smoothies').add({
                title: this.title,
                ingredients: this.ingredients,
                slug: this.slug
            }).then(() => {
                this.$router.push({ name: 'Index' })
            }).catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
    .add-smoothie {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .add-smoothie h2 {
        font-size: 2em;
        margin: 20px auto;
    }

    .add-smoothie .field {
        margin: 20px auto;
    }
</style>