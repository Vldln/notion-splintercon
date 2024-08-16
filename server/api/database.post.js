import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.VUE_APP_NOTION_API_KEY });

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, story, email, country, subscribe, hatespeech } = body;

    if (!name || !story || !email || !country || hatespeech === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid data provided",
      });
    }

    await addDataToNotion({
      name,
      story,
      email,
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

const addDataToNotion = async (data) => {
  const response = await notion.pages.create({
    parent: { database_id: process.env.VUE_APP_NOTION_DATABASE_ID },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: data.name,
            },
          },
        ],
      },
      Story: {
        rich_text: [
          {
            text: {
              content: data.story,
            },
          },
        ],
      },
      Email: {
        email: data.email,
      },
      Country: {
        rich_text: [
          {
            text: {
              content: data.country,
            },
          },
        ],
      },
      Subscribe: {
        checkbox: data.subscribe,
      },
      Hatespeech: {
        checkbox: data.hatespeech,
      },
      Select: {
        select: {
          name: "Pending",
        },
      },
    },
  });

  return response;
};

export const getNotionData = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return response.results.map((page) => ({
    name: page.properties.Name.title[0]?.text?.content,
    story: page.properties.Story.rich_text[0]?.text?.content,
    email: page.properties.Email.email,
    country: page.properties.Country.rich_text[0]?.text?.content,
    subscribe: page.properties.Subscribe.checkbox,
    hatespeech: page.properties.Hatespeech.checkbox,
  }));
};
