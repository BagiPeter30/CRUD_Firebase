<script setup>
import { defineComponent, ref, onMounted } from 'vue';
import { db } from '../firebase.js';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';


const props = defineProps({
    data: Object,
    isNew: Boolean
});

defineComponent({
    name: 'AddOrUpdate'
});

const emit = defineEmits(['close']);

onMounted(() => {
    task.value = {...task.value, ...props.data}
});

const task = ref({
    name: '',
    description: ''
});

async function addOrUpdate()
{
    if(props.isNew)
    {
        await addDoc(collection(db, 'tasks'), task.value).then((res) => {
            emit('close')
        });
    }
    else{
        await updateDoc(Doc(db, 'tasks', props.data.id), task.value).then((res) => {
            emit('close')
        });
    }
};
</script>


<template>
    <transition name: modal>
       <div class="model-overly">
        <div class="model-wrapper">
            <div class="model-container">
                <input type="text" placeholder="Név" v-model="task.name" >
                <input type="textarea" placeholder="Egyébb adatok" v-model="task.description">
                <button @click="emit('close')">Bezár</button>
                <button @click="addOrUpdate()">Szerkeszt</button>
            </div>
        </div>
       </div>
    </transition>
</template>


<style scoped>
.model-overly
{
    position: absolute;
    top: 10;
    left: 10;
    width: 30vw;
    height: 40vh;
    background: rgba(165, 89, 89, 0.4);
    transition: all .4 ease;
}
.model-wrapper
{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}
.model-container
{
    background: rgb(98, 96, 96);
    border-radius: 5px;
    width: 200px;
}
input,textarea
{
    width: 90%;
    margin: 10px 5px;
    padding: 10px;
    overflow: hidden;
}
</style>