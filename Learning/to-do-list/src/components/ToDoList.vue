<template>
    <div>
      <div class="todo-input">
        <input
          v-model="newTask"
          type="text"
          placeholder="Add a new task"
          @keyup.enter="addTask"
        />
        <button @click="addTask">Add</button>
      </div>
      <ul class="todo-list">
        <li v-for="(task, index) in tasks" :key="index">
          <span :class="{ done: task.completed }" @click="toggleTask(index)">
            {{ task.text }}
          </span>
          <button @click="removeTask(index)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTask: '',
        tasks: [], // Array to hold tasks
      };
    },
    methods: {
      addTask() {
        if (this.newTask.trim()) {
          this.tasks.push({ text: this.newTask, completed: false });
          this.newTask = '';
          this.saveTasks();
        }
      },
      toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
      },
      removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
      },
      saveTasks() {
        // Save the tasks array to local storage
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      loadTasks() {
        // Load the tasks from local storage if available
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          this.tasks = JSON.parse(savedTasks);
        }
      },
    },
    mounted() {
      this.loadTasks(); // Load tasks when the component is mounted
    },
  };
  </script>
  
  <style>
  .todo-input {
    margin-bottom: 20px;
  }
  input {
    padding: 10px;
    font-size: 16px;
    width: 300px;
  }
  button {
    padding: 10px 15px;
    margin-left: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  .todo-list {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  span {
    cursor: pointer;
    flex: 1;
  }
  .done {
    text-decoration: line-through;
    color: gray;
  }
  </style>
  