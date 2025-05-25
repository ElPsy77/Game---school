import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Код и язык обязательны" });
  }

  try {
    console.log("Запрос к Judge0:", {
      source_code: code,
      language_id: Number(language),
    });

    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!, // Убедитесь, что ключ добавлен в .env.local
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: Number(language),
      }),
    });

    const data = await response.json();
    console.log("Ответ от Judge0:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Ошибка API:", error);
    res.status(500).json({ error: "Ошибка выполнения кода" });
  }
}