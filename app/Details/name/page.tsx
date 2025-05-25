"use client";

import { useState } from "react";
import Image from "next/image";

const courseDetails: Record<string, { title: string; description: string; videos: { title: string; url: string }[] }> = {
  html5: {
    title: "HTML5",
    description: "HTML5 — это язык разметки для создания веб-страниц.",
    videos: [
      { title: "Основы HTML5", url: "https://www.youtube.com/embed/UB1O30fR-EE" },
      { title: "HTML5 для начинающих", url: "https://www.youtube.com/embed/pQN-pnXPaVg" },
    ],
  },
  css3: {
    title: "CSS3",
    description: "CSS3 — это язык стилей для оформления веб-страниц.",
    videos: [
      { title: "Основы CSS3", url: "https://www.youtube.com/embed/yfoY53QXEnI" },
      { title: "CSS3 для начинающих", url: "https://www.youtube.com/embed/1Rs2ND1ryYc" },
    ],
  },
  javascript: {
    title: "JavaScript",
    description: "JavaScript — это язык программирования для создания интерактивных веб-страниц.",
    videos: [
      { title: "Основы JavaScript", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
      { title: "JavaScript для начинающих", url: "https://www.youtube.com/embed/PkZNo7MFNFg" },
    ],
  },
};

export default function Details() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    { name: "html5", title: "HTML5", icon: "/icons/html5.svg" },
    { name: "css3", title: "CSS3", icon: "/icons/css3.svg" },
    { name: "javascript", title: "JavaScript", icon: "/icons/javascript.svg" },
  ];

  const course = selectedCourse ? courseDetails[selectedCourse] : null;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
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

      {/* Модальное окно */}
      {course && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="relative bg-white p-6 rounded shadow-lg max-w-3xl w-full"
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
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedCourse(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}