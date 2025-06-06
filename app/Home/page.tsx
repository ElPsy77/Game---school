"use client"

import Image from "next/image"
import styles from "@/styles/home.module.css"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import toast, { Toaster } from "react-hot-toast"

export default function Home() {
    return (
        <div className={styles.container}>
            <Toaster />
            <div className={styles.navbar}>
                <div className={styles.logobar}>
                    <Image src="/logo.png" width={40} height={40} alt="logo" />
                    <div className={styles.logoText}>ameSchool</div>
                </div>
                <div className={`${styles.navitems}`}>
                    
                    <Link href="/Details" className={styles.navlist}>
                        Курсы
                    </Link>
                    <Link href="https://almatypolytech.edu.kz" className={styles.navlist}>
                        Блог
                    </Link>
                    <UserButton afterSignOutUrl="/">
                        Выйти
                    </UserButton>
                </div>
            </div>
            <div className={`${styles.herosection} mt-20`}>
                <div className={styles.herocontent}>
                    <div className={styles.heroheading}>
                        <h1 className={styles.h1}>Что за PameSchool</h1>
                    </div>
                    <div className={styles.wrapper}>
                        <p className={`${styles.heroheading} ${styles.p}`}>
                            PameSchool - уникальная система управления обучением студентов, цель которой - сделать обучение таким же увлекательным, как игра. Начните свое путешествие c PameSchool и зарабатывайте баллы, значки и награды по мере обучения.
                        </p>
                        {/* Кнопка для перехода на страницу курсов */}
                        <Link href="/Courses/html5">
                            <button className={styles.btnpink}>Выберите Лого и Учитесь</button>
                        </Link>
                    </div>
                </div>
                <div className={cn(`flex flex-wrap w-[500px] gap-6 p-2 ${styles.heroimg}`)}>
                    {/* Пример логотипов курсов */}
                    <Link href="/Courses/html5">
                        <Image src="/icons/html5.svg" width={90} height={90} alt="html5" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/css3">
                        <Image src="/icons/css3.svg" width={90} height={90} alt="css3" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/javascript">
                        <Image src="/icons/javascript.svg" width={90} height={90} alt="javascript" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/typescript">
                        <Image src="/icons/typescript.svg" width={90} height={90} alt="typescript" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/mongodb">
                        <Image src="/icons/mongodb.svg" width={90} height={90} alt="mongodb" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/reactjs">
                        <Image src="/icons/reactjs.svg" width={90} height={90} alt="reactjs" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/express">
                        <Image src="/icons/express.svg" width={90} height={90} alt="express" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/tailwindcss">
                        <Image src="/icons/tailwindcss.svg" width={90} height={90} alt="tailwindcss" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/nextjs">                        
                        <Image src="/icons/nextjs.svg" width={90} height={90} alt="nextjs" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/azure">
                        <Image src="/icons/azure.svg" width={90} height={90} alt="azure" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/devops">
                        <Image src="/icons/devops.svg" width={90} height={90} alt="devops" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/github">
                        <Image src="/icons/github.svg" width={90} height={90} alt="github" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/git">
                        <Image src="/icons/git.svg" width={90} height={90} alt="git" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/docker">
                        <Image src="/icons/docker.svg" width={90} height={90} alt="docker" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/graphql">
                        <Image src="/icons/graphql.svg" width={90} height={90} alt="graphql" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                    <Link href="/Courses/kubernetes">
                        <Image src="/icons/kubernetes.svg" width={90} height={90} alt="graphql" className="transition ease-in-out duration-500 hover:scale-110" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
