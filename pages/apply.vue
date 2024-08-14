<template>
  <div>
    <h1>Apply Form</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name</label>
        <input v-model="form.name" id="name" type="text" required />
      </div>
      <div>
        <label for="descr">Email</label>
        <input v-model="form.descr" id="descr" type="text" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  name: "",
  descr: "",
});

const submitForm = async () => {
  try {
    await axios.post("/api/database", form.value);
    alert("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("There was an error submitting the form.");
  }
};
</script>
  