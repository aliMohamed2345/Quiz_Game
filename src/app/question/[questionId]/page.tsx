"use client";
import { useEffect, useState } from "react";
import QuestionStructure from "@/app/Components/QuestionStrucutre";
import { CategoryId } from "@/app/utils/Objects";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
    SetDifficulty,
    SetCorrectAnswer,
    SetTopic,
    SetScore,
    SetIncorrectAnswers,
    SetHints,
    SetQuestionNumber,
    SetQuestionContent,
} from "@/app/redux/Slices/QuestionStructureSlice";
import Loading from "@/app/loading";

export interface DataProps {
    QuestionContent: string;
    options: string[];
    correct_answers: string;
    incorrect_answers: string[];
}

const initialContentData: DataProps = {
    QuestionContent: "",
    correct_answers: "",
    incorrect_answers: [],
    options: [],
};

function Question() {
    const dispatch = useDispatch();
    const [data, setData] = useState<DataProps>(initialContentData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const currentPage = useParams().questionId;
    const router = useSearchParams();

    // Extracting query parameters with fallback for types
    const Difficulty = router.get("Difficulty") || "";
    const Topic = router.get("Topic") || "";
    const Hints = parseInt(router.get("Hints") || "0", 10);
    const Score = parseInt(router.get("Score") || "0", 10);

    // Function to get Topic ID
    function GetTheTopicID(CategoryId: object, Topic: string | null): number {
        for (const [key, value] of Object.entries(CategoryId)) {
            if (key === Topic) return value;
        }
        return -1;
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_QUIZ_GAME_API}?amount=1&difficulty=${Difficulty}&type=multiple&category=${GetTheTopicID(
                        CategoryId,
                        Topic
                    )}`
                );
                const result = await response.json();

                if (result.results?.length > 0) {
                    const { question, correct_answer, incorrect_answers } = result.results[0];
                    setData({
                        ...initialContentData,
                        incorrect_answers,
                        QuestionContent: question,
                        correct_answers: correct_answer,
                    });
                }
            } catch (error) {
                console.error("Fetching data failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Call the fetch function with a delay
        const timeoutId = setTimeout(() => {
            fetchData();
        }, 2000);

        return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, [Difficulty, Topic]);

    // Dispatching the data to store
    useEffect(() => {
        dispatch(SetDifficulty(Difficulty));
        dispatch(SetQuestionNumber(parseInt(currentPage?.toString() || "1", 10)));//+
        dispatch(SetQuestionContent(data.QuestionContent));
        dispatch(SetScore(Score));
        dispatch(SetTopic(Topic));
        dispatch(SetIncorrectAnswers(data.incorrect_answers));
        dispatch(SetCorrectAnswer(data.correct_answers));
        dispatch(SetHints(Hints));
    }, [Difficulty, currentPage, Score, Topic, data, Hints, dispatch]);

    return isLoading ? <Loading /> : <QuestionStructure />;
}

export default Question;