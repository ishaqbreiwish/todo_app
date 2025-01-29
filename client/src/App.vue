<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      todos: [], // Stores 
      title: "", // Title for a new todo
      description: "", // Description for a new todo
      selectedFile: null, // File selected for upload
      previewUrl: "", // URL of the uploaded file for preview
      showModal: false, // Controls the visibility of the modal
      modalImage: "", // Image to display in the modal
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3000/api/todoList/");
      this.todos = response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  },
  methods: {
    async addTodo(e) {
      e.preventDefault();
      if (!this.title || !this.selectedFile) {
        alert("Title and File are required!");
        return;
      }

      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("image", this.selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/todoList/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.todos.push(response.data);
        this.title = "";
        this.description = "";
        this.selectedFile = null;
        this.previewUrl = ""; // Reset preview after submission
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    async removeTodo(todo, index) {
      try {
        await axios.delete(`http://localhost:3000/api/todoList/${todo._id}`);
        this.todos.splice(index, 1);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;

        // Generate a preview URL for the selected file
        this.previewUrl = URL.createObjectURL(file);
      }
    },
    openModal(imageUrl) {
      this.modalImage = imageUrl;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalImage = "";
    },
  },
};
</script>

<template>
  <div class="main">
    <h3>Todo List</h3>

    <!-- Form to add a new todo -->
    <form class="form" @submit="addTodo">
      <input
        class="input"
        v-model="title"
        type="text"
        placeholder="Enter todo"
        required
      />
      <br />
      <input
        class="input"
        v-model="description"
        type="text"
        placeholder="Enter description"
      />
      <br />
      <!-- Styled Attach File Button -->
      <label class="attach-button">
        <span>📎 Attach File</span>
        <input type="file" @change="onFileChange" />
      </label>
      <!-- Preview the uploaded image -->
      <div v-if="previewUrl" class="preview-container">
        <span>File selected: {{ selectedFile.name }}</span>
      </div>
      <br />
      <button class="submit-button" type="submit">Add Todo</button>
    </form>

    <!-- Todo List -->
    <div class="todo-container">
      <ul>
        <li v-for="(todo, i) in todos" :key="todo._id">
          <div class="todo">
            <span class="todo-name">{{ todo.title }}</span>
            <span class="todo-description">{{ todo.description }}</span>
            <!-- Show uploaded image as a modal popup -->
            <button
              v-if="todo.image"
              @click="openModal(todo.image)"
              class="view-image-btn"
            >
              View Image
            </button>
          </div>
          <button class="delete-btn" @click="removeTodo(todo, i)">
            DELETE TODO
          </button>
        </li>
      </ul>
    </div>

    <!-- Modal for image preview -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <img :src="modalImage" alt="Preview" />
        <button class="close-btn" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  margin: auto;
  margin-top: 3rem;
  max-width: 400px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
}

.attach-button {
  width: 100%;
  padding: 10px;
  background-color: #ffffff; /* White background */
  color: #333333; /* Dark text */
  border: 1px solid #cccccc; /* Light gray border */
  border-radius: 8px; /* Rounded corners */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Spacing between icon and text */
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Smooth hover effect */
}

.attach-button:hover {
  background-color: #e0e0e0; /* Gray background on hover */
  color: #000000; /* Darker text on hover */
}

.attach-button input[type="file"] {
  display: none; /* Hide the actual file input */
}

.submit-button {
  width: 100%; /* Match the width of input fields */
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}

.submit-button:hover {
  background-color: #125a9b;
}


.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.todo-name {
  font-size: 18px;
  font-weight: bold;
}

.todo-description {
  font-size: 14px;
  margin-top: 4px;
}

.view-image-btn {
  background-color: #1976d2;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}

.view-image-btn:hover {
  background-color: #125a9b;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Black background with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  margin-bottom: 20px;
}

.close-btn {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #d32f2f;
}
</style>
