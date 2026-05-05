export const generateTryOnImage = async (clothingBase64: string, personBase64: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Gemini API key is missing. Please check your .env file.");
  }

  // Clean base64 strings (remove data:image/jpeg;base64, prefix if present)
  const cleanClothingBase64 = clothingBase64.includes(',') ? clothingBase64.split(',')[1] : clothingBase64;
  const cleanPersonBase64 = personBase64.includes(',') ? personBase64.split(',')[1] : personBase64;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: "Create a professional e-commerce fashion photo. Take the clothing item from the first image and place it naturally and realistically on the person in the second image. Ensure the lighting, shadows, and proportions match perfectly. Maintain the person's original identity, face, and body type." },
          { inlineData: { mimeType: "image/jpeg", data: cleanClothingBase64 } },
          { inlineData: { mimeType: "image/jpeg", data: cleanPersonBase64 } }
        ]
      }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    
    // Handle specific 429 Quota Exceeded error gracefully without triggering console.error
    if (response.status === 429) {
      throw new Error("QUOTA_EXCEEDED");
    }
    
    throw new Error(errorData?.error?.message || 'Failed to generate image from Gemini API');
  }

  const data = await response.json();
  
  // Extract base64 image from Gemini response
  const generatedBase64 = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  
  if (!generatedBase64) {
    throw new Error('Invalid response format from API. The model might not have returned an image.');
  }

  return `data:image/jpeg;base64,${generatedBase64}`;
};

// Helper to convert image URL to base64
export const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
