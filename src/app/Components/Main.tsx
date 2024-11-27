"use client";
import { EnumToArray } from '../utils/action';
import { CategoryId } from '../utils/Objects';
import DropDownMenu from './DropDownMenu';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

interface DataOptionsTypes {
    Difficulty: string;
    Topic: string;
}

export const initialDataOptions: DataOptionsTypes = {
    Difficulty: "",
    Topic: "",
};

function Main() {
    const [data, setData] = useState<DataOptionsTypes>(initialDataOptions);
    const [highScore, setHighScore] = useState<number>(0);
    const hintsNumber = 3;

    const router = useSearchParams();
    const score = +(router.get("Score")!) || 0;

    // Initialize high score from localStorage
    useEffect(() => {
        const storedHighScore = +(localStorage.getItem("HighScore")!) || 0;
        if (score > storedHighScore) {
            localStorage.setItem("HighScore", score.toString());
            setHighScore(score);
        } else {
            setHighScore(storedHighScore);
        }
    }, [score]);

    // Handle data change
    const handleDataChange = (key: keyof DataOptionsTypes, value: string) => {
        setData(prevData => ({ ...prevData, [key]: value }));
    };

    // Memoize query object
    const queryObject = useMemo(() => ({
        Difficulty: data.Difficulty,
        Topic: data.Topic,
        Hints: hintsNumber,
        Score: 0,
    }), [data, hintsNumber]);

    return (
        <div className="mt-60 text-center container rounded-lg bg-amber-400 p-4  h-3/4 w-full sm:w-4/5 mx-auto">
            <h2 className="text-black/50 font-bold text-center text-3xl">Quiz Game</h2>
            <div>
                <p className=" pt-2 text-dark/50">Select the difficulty</p>
                <DropDownMenu
                    InitialDropDownValue="Difficulty"
                    Theme="primary"
                    DropDownOptions={["easy", "medium", "hard"]}
                    onChange={(difficulty) => handleDataChange("Difficulty", difficulty)}
                />
                <p className="pt-3 text-dark/50">Select the topic</p>
                <DropDownMenu
                    InitialDropDownValue="Topic"
                    Theme="primary"
                    DropDownOptions={EnumToArray(CategoryId)}
                    onChange={(topic) => {
                        const fullName = Object.keys(CategoryId).find(
                            fullCat => fullCat === `Entertainment: ${topic}` || fullCat === `Science: ${topic}` || fullCat === topic
                        ) || topic;
                        handleDataChange("Topic", fullName);
                    }}
                />
                <p className="text-write py-4">High Score: {highScore}</p>
                <Link
                    href={{
                        pathname: `/question/${1}`,
                        query: queryObject,
                    }}
                    className={`bg-blue-500 hover:bg-blue-600 rounded-md p-2 text-white m-auto block w-1/2 fw-bold ${!data.Difficulty || !data.Topic ? `pointer-events-none bg-gray-400 cursor-not-allowed` : ``}`}
                    onClick={(e) => {
                        if (!data.Difficulty || !data.Topic) {
                            e.preventDefault();
                        }
                    }}
                >
                    Start
                </Link>
            </div>
        </div>
    );
}

export default Main;
