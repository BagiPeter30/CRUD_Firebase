<script setup>
import { db } from '../firebase.js';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import AddOrUpdate from './AddOrUpdate.vue';

const tasks = ref([]);

const show = ref(false);

const data = ref({});

const isNew = ref(true);

onMounted( async () => {
    let taskCollection = await getDocs(collection(db, 'tasks'));
    taskCollection.forEach((task) => {
        tasks.value.push({...task.data(), id: task.id})
    });
});

function toggleClose(docData = {}, isNewDoc = true) 
{
    data.value = docData;
    isNew.value = isNewDoc;
    show.value = !show.value;
};
async function deletTask(id) 
{
    await deleteDoc(db, 'tasks', doc)
};
</script>

<template>
    <div class="container p-3 my-4 fs-3 text-white fw-bold bg-warning fs-3 text-center rounded">Feladatok</div>
    <div class="container mx-2 my-3 bg-primary rounded">
        <AddOrUpdate @close="toggleClose" v-if="show" :data="data" :isNew="isNew"/>
        <button class="btn btn-danger p-2 m-2" @click="toggleClose()">Hozzáad</button>
       <div v-for="task in tasks" :key="task.id" @click="toggleClose(task, false)">
        <div class="text text-black fw-bold fs-3">Teszt: {{ task.name }}</div>
        <div class="text text-black fw-bold fs-3">Eredmény: {{ task.description}}</div>
        <button class="btn btn-danger my-2 p-2" @click.stop="deletTask(task.id)">Törlés</button>
       </div>
    </div>
</template>
<style scoped>

</style>