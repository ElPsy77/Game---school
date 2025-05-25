"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import "@/styles/ai.css";
import Link from "next/link";

const ImageGenerator = () => {
  const [text, setText] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Создаем div элемент
    const div = document.createElement("div");
    div.id = "imagecontainer";

    // Добавляем div в тело документа
    document.body.appendChild(div);

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ 'text': `${text}` }),
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
    };

    await fetch('http://129.154.41.10:5000/generate', requestOptions)
      .then(response => response.json())
      .then(data => {
        const imageString = data.serializedImages;
        for (let imagePhoto in imageString) {
          const image = new Image();
          let imagen = imageString[imagePhoto];
          image.src = `data:image/jpeg;charset=utf-8;base64, ${imagen}`;
          const container = document.getElementById("imagecontainer");
          if (container) {
            container.appendChild(image);
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-10">
      <h1 className="font-bold text-4xl">Картинки</h1>
      <div className="flex gap-5">
        <input
          type="text"
          name="text"
          placeholder="Тыкните на промт"
          className={cn("w-[400px] h-[40px] p-2 rounded-md")}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="bg-black text-white font-bold px-5 rounded-md" onClick={onSubmit}>
          Отправить
        </button>
      </div>
      {/* Кнопка для возврата на страницу Home */}
      <Link href="/Home">
        <button className="bg-gray-800 text-white font-bold px-5 py-2 rounded-md">
          Вернуться на главную
        </button>
      </Link>
    </div>
  );
};

export default ImageGenerator;