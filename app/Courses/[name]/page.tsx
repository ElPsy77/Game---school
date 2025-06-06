// @ts-nocheck
"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown'
import React from 'react'
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useRive, RiveState, useStateMachineInput, StateMachineInput, Layout, Fit, Alignment, RiveProps } from 'rive-react';
import styles from '@/styles/styles.module.css'
import "@/styles/LoginFormComponent.css";
import Confetti from "@/components/Confetti";
import Link from "next/link";

export default function Page({ params }: { params: { name: string } }) {

    const name = params.name;

    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [chosen, setChosen] = useState();
    const [content, setContent] = useState();
    const [question, setQuestion] = useState();
    const [progress, setProgress] = useState(10);

    const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
    const inputRef = useRef(null);

    const [response, setResponse] = useState("");
    const [output, setOutput] = useState("Ответ появится здесь...");

    const onSubmit = async () => {
        // Очистить вывод
        setOutput("Ответ появится здесь...");

        // Создать POST-запрос к конечной точке /api/chat
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userPrompt: `Привет! Я набрал ${score}/${content?.questions.length} баллов в курсе ${name}. На основе моего результата, можете предложить мне путь обучения для изучения ${name}?`,
            }),
        });

        // Получить ответ от сервера
        const data = await response.json();
        // Установить ответ в состояние
        setResponse(data.text);
    };

    useEffect(() => {
        // Обновить ответ символ за символом в выводе
        if (response.length === 0) return;

        setOutput("");

        for (let i = 0; i < response.length; i++) {
            setTimeout(() => {
                setOutput((prev) => prev + response[i]);
            }, i * 10);
        }

    }, [response]);

    const STATE_MACHINE_NAME = 'Login Machine'

    useEffect(() => {
        if (inputRef?.current && !inputLookMultiplier) {
            setInputLookMultiplier(inputRef.current.offsetWidth / 100);
        }
    }, [inputRef])

    const { rive: riveInstance, RiveComponent }: RiveState = useRive({
        src: '/bear.riv',
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center
        }),
    });

    // Входные данные для State Machine
    const trigSuccessInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'trigSuccess');
    const trigFailInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'trigFail');
    const isHandsUpInput: StateMachineInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, 'isHandsUp');

    // Прочитать файл из файловой системы с именем `name`
    const readFile = async (name: string) => {
        const markdown = await import(`@/data/${name}.d.ts`);
        return markdown.data;
    };

    const onNext = () => {
        setProgress(progress + 10);
        setCount(count + 1);

        if (question?.correctOption == chosen) {
            setScore(score + 1);
            if (trigSuccessInput) trigSuccessInput.fire();
        } else {
            if (trigFailInput) trigFailInput.fire();
        }

        setQuestion(content?.questions[count + 1]);

        if (progress >= 100) {
            onSubmit();
            return;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const content = await readFile(name);
                setQuestion(content?.questions[0]);
                setContent(content);
            } catch (error) {
                console.error("Ошибка при чтении файла:", error);
            }
        };
        fetchData();
    }, [name]);

    return (
        <div className="around">
            {progress < 110 ? (
                <>
                    <div className="rive-container">
                        <div className="rive-wrapper">
                            {progress < 110 && <RiveComponent className="rive-container" />}
                        </div>
                    </div>
                    <div className='flex flex-col mt-5 items-center h-screen gap-6'>
                        <Progress value={progress} className={cn("w-[60%]")} />
                        <div className='w-[60%] flex justify-center'>
                            <h1 className='text-2xl font-bold'>{question?.question}</h1>
                        </div>

                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[0]} id="r1" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r1">{question?.options[0]}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[1]} id="r2" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r2">{question?.options[1]}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[2]} id="r3" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r3">{question?.options[2]}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={question?.options[3]} id="r4" onClick={(e) => {
                                    setChosen(e.target.value)
                                }} />
                                <Label htmlFor="r4">{question?.options[3]}</Label>
                            </div>
                        </RadioGroup>
                        <Button onClick={() => {
                            onNext()
                        }
                        }>{progress <= 110 ? "Далее" : "Отправить"}</Button>
                    </div>
                </>
            ) : (
                <div className='flex flex-col items-center h-screen gap-6'>
                    <h1 className='text-2xl mt-2 font-bold'>Вы набрали {score} из {content?.questions.length}</h1>
                    <Button onClick={() => {
                        setProgress(10)
                        setScore(0)
                        setCount(0)
                        setQuestion(content?.questions[0])
                    }
                    }>Начать заново</Button>
                    {score > 6 && (
                        <>
                            <Confetti />
                            <div className="flex items-center flex-col gap-5">
                                <h1 className='text-2xl font-bold'>Поздравляем! Вы получили <span className="font-black text-red-500">Золотую медаль</span></h1>
                                <Image src="/icons/goldmedal.svg" width={100} height={100} />
                            </div>
                        </>
                    )}
                    {score > 2 && score <= 6 && (
                        <>
                            <Confetti />
                            <div className="flex items-center flex-col gap-5">
                                <h1 className='text-2xl font-bold'>Поздравляем! Вы получили <span className="font-black text-red-500">Серебряную медаль</span></h1>
                                <Image src="/icons/silvermedal.svg" width={100} height={100} />
                            </div>
                        </>
                    )}
                    {score <= 2 && (
                        <>
                            <Confetti />
                            <div className="flex items-center flex-col gap-5">
                                <h1 className='text-2xl font-bold'>Поздравляем! Вы получили <span className="font-black text-red-500">Бронзовую медаль</span></h1>
                                <Image src="/icons/bronzemedal.svg" width={100} height={100} />
                            </div>
                        </>
                    )}
                    <h1 className='text-1xl font-bold mt-1'>На основе вашего результата мы создаем путь обучения для изучения </h1>
                    <Card className={cn("p-5 whitespace-normal min-w-[320px] sm:w-[500px] md:min-w-[600px]")}>
                        <div className={styles.textwrapper}>
                            <Markdown className={cn("w-full h-full ")}>{`${output}`}</Markdown>
                        </div>
                    </Card>
                    {/* Создать ссылку для перехода на /leaderboard */}
                    <Link href="/Leaderboard">
                        <Button>Перейти к таблице лидеров</Button>
                    </Link>
                    <div className="flex gap-4 mt-4">
                        {/* Кнопка для возврата на главную страницу */}
                        <Link href="/">
                            <Button>Вернуться на главную</Button>
                        </Link>
                        {/* Кнопка для возврата ко всем курсам */}
                        <Link href="/Home">
                            <Button>Вернуться ко всем курсам</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}