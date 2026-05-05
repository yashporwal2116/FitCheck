const REPLICATE_API_URL = "https://api.replicate.com/v1/predictions";
const MODEL_VERSION = "3b032a70c29aef7b9c3222f2e40b71660201d8c288336475ba326f3ca278a3e1";

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  const token = process.env.REPLICATE_API_TOKEN;

  if (!token) {
    return json(500, { error: "REPLICATE_API_TOKEN is not configured" });
  }

  try {
    if (event.httpMethod === "GET") {
      const id = event.queryStringParameters?.id;

      if (!id) {
        return json(400, { error: "Missing prediction id" });
      }

      const response = await fetch(`${REPLICATE_API_URL}/${encodeURIComponent(id)}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();

      return json(response.status, data);
    }

    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed" });
    }

    const { image, prompt } = JSON.parse(event.body || "{}");

    if (!image || !prompt) {
      return json(400, { error: "Image and prompt are required" });
    }

    const response = await fetch(REPLICATE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          prompt,
          image,
          strength: 0.7,
        },
      }),
    });

    const data = await response.json();

    return json(response.status, data);
  } catch (error) {
    console.error("Replicate function error:", error);
    return json(500, { error: "AI generation failed" });
  }
};
