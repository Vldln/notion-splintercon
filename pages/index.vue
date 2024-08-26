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
            class="flex flex-col items-center justify-center h-full w-[600px] mx-auto"
            v-if="
              item?.properties?.Select?.select?.name === 'Publish' &&
              item?.properties?.Story?.rich_text[0]?.plain_text
            "
          >
            <img src="/cropped-sign-all-17.png" class="w-10 pb-10" alt="" />

            <p class="text-2xl text-center">
              {{
                item?.properties?.Story?.rich_text[0]?.plain_text ||
                "No story available"
              }}
            </p>
            <p class="text-lg font-bold text-center mt-4">
              {{
                item?.properties?.Country?.rich_text[0]?.plain_text ||
                "No country available"
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center h-screen relative"
    >
      <div class="absolute max-w-[500px] flex flex-col">
        <img src="/cropped-sign-all-17.png" class="w-20" alt="" />
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
            class="text-xl bg-black rounded-lg text-white px-8 py-3 font-bold"
            to="/apply"
            >Share your story</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const data = ref([]);
const currentIndex = ref(0);

async function fetchData() {
  try {
    const response = await axios.get("/api/database");
    data.value = response.data.filter(
      (item) => item.properties.Select?.select?.name === "Publish"
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
  }, 15000); // Change slide every 10 seconds
}

onMounted(() => {
  fetchData();
  startSlideShow();
});

onUnmounted(() => {
  clearInterval(startSlideShow);
});
</script>
