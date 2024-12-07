<template>
  <div id="app">
    <h1>Vue 3 To-Do List</h1>
    <ToDoList />
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue';

export default {
  name: 'App',
  components: {
    ToDoList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
