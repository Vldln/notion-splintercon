<template>
  <div>
    <div v-if="data.length">
      <div class="relative h-screen w-full overflow-hidden">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          :class="[
            'absolute inset-0 transition-transform duration-500 ease-in-out',
            {
              'translate-x-full': currentIndex !== index,
              'translate-x-0': currentIndex === index,
            },
          ]"
        >
          <div
            class="flex flex-col items-center justify-center h-full w-full md:w-[600px] mx-auto"
          >
            <H2 class="font-bold text-2xl mb-4">Voices of isolation</H2>
            <div class="text-2xl">{{ item.values["c-1191dSGMuO"].replace(/`/g, "") }}</div>
            <div class="font-bold  text-2xl mt-8">
              {{ item.values["c-v5-gBqvkqL"].replace(/`/g, "") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center h-screen relative"
    >
      <div class="absolute max-w-[500px] flex flex-col">
        <h1 class="text-3xl font-black mt-4 mb-4">
          Reporting from the Shutdown
        </h1>
        <p>
          At eQualitie, we believe that internet isolation isn't just about
          technology—it's about the human experience, about being deprived of a
          fundamental right. Every shutdown, every instance of internet
          fragmentation carries with it a personal and powerful story. Help us
          build an atlas of these witnesses, documenting the impact of
          fragmentation on individuals around the world.
        </p>
        <div class="pt-8">
          <NuxtLink
            class="text-xl dark:bg-white dark:text-black bg-black rounded-lg text-white px-8 py-3 font-bold"
            to="/apply"
          >
            Share your story</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

useHead({
  title: "Reporting from the Shutdown",
  meta: [
    {
      name: "description",
      content:
        "At eQualitie, we believe that internet isolation isn't just about technology—it's about the human experience, about being deprived of a fundamental right. Every shutdown, every instance of internet  fragmentation carries with it a personal and powerful story. Help us build an atlas of these witnesses, documenting the impact of fragmentation on individuals around the world.",
    },
  ],
});
const data = ref([]);
const currentIndex = ref(0);
const intervalId = ref(null);

async function fetchData() {
  try {
    const response = await axios.get("/api/database");
    data.value = response.data.filter(
      (item) => item.values["c-AvEQ2_aF6d"] === "```Publish```"
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function startSlideShow() {
  setInterval(() => {
    if (data.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % data.value.length;
    }
  }, 15000); // Change slide every 15 seconds
}

function startAutoRefresh() {
  intervalId.value = setInterval(fetchData, 10000); // Fetch data every 10 seconds
}

onMounted(() => {
  fetchData();
  startSlideShow();
  startAutoRefresh();
});

onUnmounted(() => {
  clearInterval(startSlideShow);
});
</script>
