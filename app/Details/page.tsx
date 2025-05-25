"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Импорт компонента Link
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const courseDetails: Record<string, { title: string; description: string; videos: { title: string; url: string }[] }> = {
  html5: {
    title: "Unreal Engine",
    description: "Unreal Engine — это мощный игровой движок для создания 3D-игр.",
    videos: [
      { title: "Основы Unreal Engine", url: "https://www.youtube.com/embed/6UlU_FsicK8?si=w40ryN1YuKZ-BBRQ" },
      { title: "Unreal Engine для начинающих", url: "https://www.youtube.com/embed/videoseries?si=IpI5tddH2TiSvvVY&amp;list=PLJmt27moz_Uw12pMy3aANY7JLMfF4OIhn" },
    ],
  },
  css3: {
    title: "C++",
    description: "C++ — это язык программирования, используемый для разработки игр.",
    videos: [
      { title: "Основы C++", url: "https://www.youtube.com/embed/P5Lah3YlkpQ?si=jPXBhMdCwQ94ryKk" },
      { title: "C++ для начинающих", url: "https://www.youtube.com/embed/-TkoO8Z07hI?si=Zd-FcLKBePGGcx9-" },
    ],
  },
  javascript: {
    title: "Unity",
    description: "Unity — это популярный игровой движок для создания 2D и 3D игр.",
    videos: [
      { title: "Основы Unity", url: "https://www.youtube.com/embed/YKf1Yo58RYA?si=43Jze_RfZGIcavQf" },
      { title: "Unity для начинающих", url: "https://www.youtube.com/embed/yIZERKz3OnU?si=xtM8TjLa-NcpHUtA" },
    ],
  },
  typescript: {
    title: "C#",
    description: "C# — это язык программирования, часто используемый в Unity.",
    videos: [
      { title: "Основы C#", url: "https://www.youtube.com/embed/GhQdlIFylQ8?si=N02dg8FTV4ifALAq" },
      { title: "C# для начинающих", url: "https://www.youtube.com/embed/w8rRhAup4kg?si=hlfxviLBOJwinNYt" },
    ],
  },
  mongodb: {
    title: "Godot",
    description: "Godot — это бесплатный игровой движок для создания 2D и 3D игр.",
    videos: [
      { title: "Основы Godot", url: "https://www.youtube.com/embed/S8lMTwSRoRg?si=zSnXHhMJcq2GXrk-" },
      { title: "Godot для начинающих", url: "https://www.youtube.com/embed/nAh_Kx5Zh5Q?si=mXKmN_-LbpXJ5Fcd" },
    ],
  },
  reactjs: {
    title: "Python",
    description: "Python — это язык программирования, используемый для разработки игр и приложений.",
    videos: [
      { title: "Основы Python", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
      { title: "Python для начинающих", url: "https://www.youtube.com/embed/nLRL_NcnK-4?si=DcNC9pDc8sKOrV8s" },
    ],
  },
  express: {
    title: "GML",
    description: "GameMaker Language (GML) — это язык программирования для GameMaker Studio.",
    videos: [
      { title: "Основы GML", url: "https://www.youtube.com/embed/MVFD7L1SX-Q?si=du9arMRquOdDFu9U" },
      { title: "GML для начинающих", url: "https://www.youtube.com/embed/nwlvT-L9vFg?si=LgsFVoBHPtAAMkiZ" },
    ],
  },
  tailwindcss: {
    title: "GameMaker",
    description: "GameMaker — это инструмент для создания 2D-игр.",
    videos: [
      { title: "Основы GameMaker", url: "https://www.youtube.com/embed/sRq7nIq5ktQ?si=TP0DqDfHWTGYy08_" },
      { title: "GameMaker для начинающих", url: "https://www.youtube.com/embed/2JpT2AkKZt4?si=hL09pFqVyVOPhZCc" },
    ],
  },
  nextjs: {
    title: "Ren'Py",
    description: "Ren'Py — это инструмент для создания визуальных новелл.",
    videos: [
      { title: "Основы Ren'Py", url: "https://www.youtube.com/embed/Jt5Ff741DQw?si=IpElGgCl91waMQ92" },
      { title: "Ren'Py для начинающих", url: "https://www.youtube.com/embed/1t8SSYCe094?si=JbqIDnB1alCoapwj" },
    ],
  },
  azure: {
    title: "Blender",
    description: "Blender — это инструмент для 3D-моделирования и анимации.",
    videos: [
      { title: "Основы Blender", url: "https://www.youtube.com/embed/4haAdmHqGOw?si=BrbvD4_y9GmUmdV1" },
      { title: "Blender для начинающих", url: "https://www.youtube.com/embed/BWRNNXa-S3Y?si=5nVfSs9OMW4geYl7" },
    ],
  },
  devops: {
    title: "Lua",
    description: "Lua — это легковесный язык программирования, используемый в играх.",
    videos: [
      { title: "Основы Lua", url: "https://www.youtube.com/embed/I549C6SmUnk?si=TGW7TIyd4GnJQqi9" },
      { title: "Lua для начинающих", url: "https://www.youtube.com/embed/1srFmjt1Ib0?si=ZlDiudL1u1NV_U-L" },
    ],
  },
  github: {
    title: "GitHub",
    description: "GitHub — это платформа для совместной разработки и управления проектами.",
    videos: [
      { title: "Основы GitHub", url: "https://www.youtube.com/embed/zZBiln_2FhM?si=Uz8G7qlfeU2Xz_M_" },
      { title: "GitHub для начинающих", url: "https://www.youtube.com/embed/EeARyFrZsnU?si=Q35OdogQEN6TWf5B" },
    ],
  },
  git: {
    title: "Git",
    description: "Git — это система контроля версий для управления кодом.",
    videos: [
      { title: "Основы Git", url: "https://www.youtube.com/embed/O00FTZDxD0o?si=KLu7X07WOFd21ile" },
      { title: "Git для начинающих", url: "https://www.youtube.com/embed/SEvR78OhGtw?si=AeKG1jEpxRW2ZLRj" },
    ],
  },
  docker: {
    title: "Firebase",
    description: "Firebase — это платформа для разработки мобильных и веб-приложений.",
    videos: [
      { title: "Основы Firebase", url: "https://www.youtube.com/embed/yg--_qbbuh4?si=XtmNyCklVWeXlJAw" },
      { title: "Firebase для начинающих", url: "https://www.youtube.com/embed/9kRgVxULbag?si=lnBZ1e0O9ncOdPxc" },
    ],
  },
  graphql: {
    title: "Postman",
    description: "Postman — это инструмент для тестирования API.",
    videos: [
      { title: "Основы Postman", url: "https://www.youtube.com/embed/VywxIQ2ZXw4?si=dMq6k7em5Rh5Nqxw" },
      { title: "Postman для начинающих", url: "https://www.youtube.com/embed/KdCAV4SzvqQ?si=qq-zfY2xSz4gyTeL" },
    ],
  },
  kubernetes: {
    title: "VS Code",
    description: "Visual Studio Code — это редактор кода для разработчиков.",
    videos: [
      { title: "Основы VS Code", url: "https://www.youtube.com/embed/SE0_wdokumg?si=11dXyPwgvLa9b9Ou" },
      { title: "VS Code для начинающих", url: "https://www.youtube.com/embed/KMxo3T_MTvY?si=2N96ll5T6-HZDavH" },
    ],
  },
};

export default function Details() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>(""); // Состояние для заметок

  const courses = Object.keys(courseDetails).map((key) => ({
    name: key,
    title: courseDetails[key].title,
    icon: `/icons/${key}.svg`,
  }));

  const course = selectedCourse ? courseDetails[selectedCourse] : null;

  // Функция для скачивания заметок
  const downloadNotes = () => {
    const blob = new Blob([notes], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-row gap-8 p-8">
      {/* Панель заметок */}
      <Card className="w-1/5 bg-white shadow-md rounded-lg max-h-[320px]"> {/* Уменьшена ширина и высота панели */}
        <CardHeader className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Ваши заметки</h2>
        </CardHeader>
        <CardContent className="p-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Напишите свои заметки здесь..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </CardContent>
        <CardFooter className="p-4 flex gap-2">
          <button
            onClick={downloadNotes}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition w-full"
          >
            Скачать
          </button>
          <button
            onClick={() => setNotes("")}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition w-full"
          >
            Очистить
          </button>
        </CardFooter>
      </Card>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold mb-6">Курсы</h1>
        <div className="grid grid-cols-4 gap-10">
          {courses.map((course) => (
            <div
              key={course.name}
              className="flex flex-col items-center gap-3 cursor-pointer transform transition-transform duration-300 hover:scale-110"
              onClick={() => setSelectedCourse(course.name)}
            >
              <Image src={course.icon} width={100} height={100} alt={course.title} />
              <span className="text-lg font-semibold">{course.title}</span>
            </div>
          ))}
        </div>

        {/* Кнопка возврата на главную страницу */}
        <Link href="/Home">
          <button className="mt-8 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            Вернуться на главную
          </button>
        </Link>

        {/* Модальное окно */}
        {course && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedCourse(null)}
          >
            <div
              className="relative bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
              <p className="mb-4">{course.description}</p>
              <div className="grid gap-4">
                {course.videos.map((video, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <h3 className="font-semibold">{video.title}</h3>
                    <iframe
                      width="100%"
                      height="315"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setSelectedCourse(null)}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}