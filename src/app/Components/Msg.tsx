'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
function Msg() {
    const { Score, Hints, QuestionNumber, IsCorrectAnswer, Difficulty, Topic } = useSelector((state: RootState) => state.QuestionStructure);
    const nextQuestion = IsCorrectAnswer ? QuestionNumber + 1 : QuestionNumber;

    return (
        <>
            {/* Overlay */}
            <div className="absolute w-[200vw] h-[200vh] inset-[-250px] bg-black bg-opacity-70 z-10 animate-opacity-animation"></div>

            {/* Message Box */}
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-xl p-5 text-center rounded-4 w-10/12  h-auto z-20 animate-popup"
                aria-live="polite"
            >
                <h3 className={`text-md sm:text-xl md:text-2xl font-bold ${IsCorrectAnswer ? 'text-green-500' : 'text-red-500'}`}>
                    {IsCorrectAnswer ? "Your Answer is Correct" : "Your Answer is Wrong, please try again"}
                </h3>
                <p className="text-white font-bold my-4">Score: {Score}</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row md:flex-row gap-3 sm:gap-5 justify-center items-center">
                    <Link
                        href={{ pathname: `/`, query: { Score } }}
                        className="rounded-full bg-red-600 text-white p-3"
                    >
                        Go To Home
                    </Link>
                    {IsCorrectAnswer && (
                        <Link
                            href={{
                                pathname: `/question/${nextQuestion}`,
                                query: { Difficulty, Topic, Hints, Score }
                            }}
                            className="rounded-full bg-green-600 text-white p-3"
                        >
                            Next Question
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default Msg;
