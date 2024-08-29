import axios from "axios";

const codaApiKey = process.env.VUE_APP_CODA_API_KEY;
const codaDocId = process.env.VUE_APP_CODA_DOC_ID;
const codaTableId = process.env.VUE_APP_CODA_TABLE_ID;

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, story, country, subscribe, hatespeech } = body;

    if (!name || !email || !country || !story || hatespeech === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid data provided",
      });
    }

    await addDataToCoda({
      name,
      email,
      story,
      country,
      subscribe,
      hatespeech,
    });

    return { success: true };
  } catch (error) {
    console.error("Error in API handler:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});

const addDataToCoda = async (data) => {
  const response = await axios.post(
    `https://coda.io/apis/v1/docs/${codaDocId}/tables/${codaTableId}/rows`,
    {
      rows: [
        {
          cells: [
            {
              column: "Name", // replace with your actual column ID or name
              value: data.name,
            },
            {
              column: "Email", // replace with your actual column ID or name
              value: data.email,
            },
            {
              column: "Story", // replace with your actual column ID or name
              value: data.story,
            },
            {
              column: "Country", // replace with your actual column ID or name
              value: data.country,
            },
          
            {
              column: "Subscribe", // replace with your actual column ID or name
              value: data.subscribe,
            },
            {
              column: "Hatespeech", // replace with your actual column ID or name
              value: data.hatespeech,
            },
          ],
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${codaApiKey}`,
      },
    }
  );
  console.log(response);
  return response.data;
};
