<template>
    <div>
      <h1>Submitted Data</h1>
      <div v-if="data.length">
        <div v-for="item in data" :key="item.id">
          <div v-if="item.properties.Select?.select?.name === 'Publish'">
            <p>
              <strong>Name:</strong>
              {{ item.properties.Name.title[0]?.plain_text }}
            </p>
            <p>
              <strong>Descr:</strong>
              {{ item.properties.Descr.rich_text[0]?.plain_text }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No data submitted yet.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import axios from "axios";
  
  const data = ref([]);
  
  async function fetchData() {
    try {
      const response = await axios.get("/api/database");
      data.value = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  onMounted(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
  
    // Clean up the interval when the component is unmounted
    onUnmounted(() => {
      clearInterval(interval);
    });
  });
  </script>
  