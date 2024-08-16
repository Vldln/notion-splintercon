<template>
  <div class="mx-auto max-w-[800px] py-10">
    <img src="/cropped-sign-all-17.png" class="w-20 mx-auto" alt="" />
    <h1 class="text-center text-3xl font-black mt-4">
      Reporting from the Shutdown
    </h1>
    <p class="text-lg text-center mt-3">
      At eQualitie, we believe that internet isolation isn't just about
      technology—it's about the human experience, about being deprived of a
      fundamental right. Every shutdown, every instance of internet
      fragmentation carries with it a personal and powerful story. Help us build
      an atlas of these witnesses, documenting the impact of fragmentation on
      individuals around the world.
    </p>
    <div
      class="rounded-xl shadow border border-gray-300 p-8 mt-8 max-w-[600px] mx-auto"
    >
      <h2 class="mb-6 text-2xl font-bold text-center">Share your story</h2>
      <div v-if="successShow" class="mb-4 bg-green-200 p-4 rounded-lg">
        {{ successShow }}
      </div>
      <div v-if="errorShow" class="mb-4 bg-red-200 p-4 rounded-lg">
        {{ errorShow }}
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="font-bold">Name</label>
          <input
            v-model="form.name"
            id="name"
            type="text"
            required
            placeholder="Your name"
            class="w-full border-2 p-2 border-black rounded-lg focus:outline-none focus:border-gray-200"
          />
        </div>
        <div class="mb-4">
          <label for="name" class="font-bold">Story</label>
          <textarea
            v-model="form.story"
            placeholder="Tell us your story"
            id="story"
            required
            class="w-full border-2 p-2 border-black rounded-lg focus:outline-none focus:border-gray-200"
          />
        </div>
        <div class="mb-4">
          <label for="name" class="font-bold">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            placeholder="Email"
            class="w-full border-2 p-2 border-black rounded-lg focus:outline-none focus:border-gray-200"
          />
        </div>
        <div class="mb-4">
          <label for="name" class="font-bold">Country</label>
          <input
            v-model="form.country"
            id="country"
            type="text"
            required
            placeholder="Country"
            class="w-full border-2 p-2 border-black rounded-lg focus:outline-none focus:border-gray-200"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="form.subscribe"
            id="subscribe"
            type="checkbox"
            class="mr-2"
          />
          <label for="subscribe"
            >Do you wish to sign up to SplinterCon newsletter, get updates about
            the upcoming offline and online events, tool demos and more?</label
          >
        </div>
        <div class="mb-4">
          <input
            v-model="form.hatespeech"
            id="hatespeech"
            type="checkbox"
            required
            class="mr-2"
          />
          <label for="hatespeech"
            >I confirm that the story does not content hatespeech, does not
            violate human rights etc</label
          >
        </div>
        <button
          class="text-xl bg-black rounded-lg text-white px-8 py-3 font-bold hover:bg-gray-200"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  name: "",
  story: "",
  email: "",
  country: "",
  subscribe: false,
  hatespeech: false,
});
const successShow = ref(null);
const errorShow = ref(null);

const submitForm = async () => {
  try {
    await axios.post("/api/database", form.value);
    successShow.value =
      "Thank you for sharing your story. It was successfully submitted. We will review it and include it in the atlas.";

    // Reset form data
    form.value = {
      name: "",
      story: "",
      email: "",
      country: "",
      subscribe: false,
      hatespeech: false,
    };

    setTimeout(() => {
      successShow.value = null;
    }, 5000);
  } catch (error) {
    console.error("Error submitting form:", error);
    errorShow.value =
      "Something went wrong. Please fill in the mandatory fields or ask us for help.";
  }
};
</script>
  