"use client"
import React from 'react';
import { Card } from '@/components/ui/card';

export default function LeaderboardPage() {
    return (
        <div className='flex justify-center items-center p-20 h-screen'>
            <Card className='p-20'>
                <table>
                    <tr>
                        <th>Имя</th>
                        <th>Очки</th>
                    </tr>
                    <tr>
                        <td>Макжан</td>
                        <td>500pts</td>
                    </tr>
                    <tr>
                        <td>Александр</td>
                        <td>400pts</td>
                    </tr>
                    <tr>
                        <td>Абдурахман</td>
                        <td>300pts</td>
                    </tr>
                    <tr>
                        <td>Кирилл</td>
                        <td>200pts</td>
                    </tr>
                </table>
            </Card>
        </div>
    );
}
