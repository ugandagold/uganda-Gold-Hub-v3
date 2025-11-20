import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const getInteriorDesignAdvice = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: "You are a Gold Trading & Mining Expert for 'Uganda Gold Hub'. Your tone is professional, knowledgeable, and trustworthy. Provide concise advice on gold investment, purity standards (karat), export regulations in Uganda, and global market trends. If asked about specific products, mention Bullion, Gold Nuggets, or Gold Dust available from Uganda. Avoid giving specific financial advice but explain market mechanics. Keep responses under 150 words.",
      },
    });

    return response.text || "I apologize, I couldn't retrieve the market data at this moment.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};