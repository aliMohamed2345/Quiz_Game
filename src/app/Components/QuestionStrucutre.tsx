import { useState, useEffect, useCallback } from 'react';
import Msg from './Msg';
import { checkProps, decodeHtmlEntities, HintsProps, RandomizeOptions, ShowMsgProps } from '../utils/action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SetHints, SetScore, SetQuestionNumber, SetIsCorrectAnswer } from '../redux/Slices/QuestionStructureSlice';

function QuestionStructure() {
    // Redux variables
    const { QuestionContent, QuestionNumber, Score, Hints, IncorrectAnswers, correctAnswer } = useSelector(
        (state: RootState) => state.QuestionStructure
    );
    const dispatch = useDispatch();

    // React Hooks
    const [activeOption, setActiveOption] = useState<null | number>(null)
    const [checkBtn, setCheckBtn] = useState<checkProps>({ checked: false, isCorrectAnswer: false });
    const [hint, setHint] = useState<HintsProps>({ Hints: Hints || 0, IsUsed: false });
    const [shuffle, setShuffle] = useState<string[]>([]);
    const [showMsg, setShowMsg] = useState<ShowMsgProps>({ show: false, isCorrect: false });
    const [currentScore, setCurrentScore] = useState(Score);

    // Shuffle answers on question change
    useEffect(() => {
        setShuffle(RandomizeOptions(IncorrectAnswers, correctAnswer));
    }, [correctAnswer, IncorrectAnswers]);

    // Update Redux with the latest local state values
    useEffect(() => {
        dispatch(SetQuestionNumber(QuestionNumber));
        dispatch(SetIsCorrectAnswer(showMsg.isCorrect));
        dispatch(SetScore(currentScore!));
        dispatch(SetHints(hint.Hints));
    }, [QuestionNumber, showMsg.isCorrect, currentScore, hint.Hints, dispatch]);

    // Handle hint click, disabling incorrect answers
    const handleHintClick = useCallback(() => {
        setHint(prevHint => ({
            Hints: prevHint.Hints > 0 ? prevHint.Hints - 1 : 0,
            IsUsed: true,
        }));

    }, [setHint]);

    // Check answer and update state accordingly
    const handleCheckBtn = () => {
        setShowMsg({ show: true, isCorrect: checkBtn.isCorrectAnswer });
        setCurrentScore(prevScore => prevScore! + (checkBtn.isCorrectAnswer ? (hint.IsUsed ? 5 : 10) : 0));
    };
    console.log(correctAnswer);
    return (
        <div className="container w-full sm:w-4/5 mx-auto text-center min-h-[580px] text-white rounded-xl absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 p-6">
            <p className="font-bold text-4xl mb-4 mt-2">
                Question <span className="text-green-500">{QuestionNumber}</span>
            </p>
            <p className="text-2xl font-bold text-gray-500 mb-4">
                Score: <span className="text-green-500">{currentScore}</span>
            </p>
            <button
                type="button"
                disabled={hint.Hints <= 0 || hint.IsUsed}
                onClick={handleHintClick}
                className={`bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out mb-3 py-2 px-4 rounded  disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Hint: <span>{hint.Hints}</span>
            </button>
            <p className="text-gray-800 my-5 text-sm sm:text-lg md:text-xl">{decodeHtmlEntities(QuestionContent)}</p>
            <div className="options">
                <ul className="list-none  grid grid-cols-1 sm:grid-cols-2  sm:mb-12  gap-4">
                    {shuffle.map((answer, i) => (
                        <li key={i} >
                            <button
                                onClick={() => { setActiveOption(i); setCheckBtn({ checked: true, isCorrectAnswer: answer === correctAnswer }) }}
                                className={`w-full p-2 border-2 rounded-md border-blue-500 hover:bg-blue-500 duration-300  hover:text-white ${activeOption === i ? "bg-blue-500 text-white" : "text-blue-500"} focus:outline-none disabled:bg-gray-500/90 disabled:border-gray-500/90 disabled:text-white`}
                                disabled={hint.IsUsed && (IncorrectAnswers !== null && (answer === IncorrectAnswers[0] || answer === IncorrectAnswers[1]))} // Disable incorrect answers when hint is used
                            >
                                {decodeHtmlEntities(answer)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                type="button"
                onClick={handleCheckBtn}
                className={`mt-3 sm:mt-1 py-2 px-4 w-1/2 rounded bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out active:scale-90 text-white ${checkBtn.checked ? '' : 'opacity-50 cursor-not-allowed'}`}
            >
                Check
            </button>
            {showMsg.show && <Msg />}
        </div>
    );
}

export default QuestionStructure;
