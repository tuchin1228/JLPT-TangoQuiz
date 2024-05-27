import React, { useEffect, useState } from "react";
import WordData from "../Jsonfiles/TimeWordData.json";
import { useNavigate } from "react-router-dom";

interface WordDataType {
  word: string,
  kana: string,
  chi: string,
}

export default function Word() {
  const navigate = useNavigate();
  const GoWordTable = () => {
    navigate("/TimeWordTable");
  };

  const WordDataCount = WordData.length;
  // 題目欄位
  const [GuessIndex, setGuessIndex] = useState<string>("word");
  // 解答欄位
  const [AnswerIndex, setAnsertIndex] = useState<string>("word");
  // 題目選項
  const [Options, setOptions] = useState<WordDataType[]>([]);
  // 解答
  const [Answer, setAnswer] = useState<WordDataType | null>();
  // 答題狀態
  const [Bingo, setBingo] = useState<boolean | null>();
  // 連續答對題數
  const [ContinueBingo, setContinueBingo] = useState<number>(0);

  useEffect(() => {
    setOptions([]);
    setAnswer(null);
    setBingo(null);
    setContinueBingo(0);
  }, [GuessIndex, AnswerIndex]);

  // 開始產題
  const StartGuessWord = () => {
    if (GuessIndex == AnswerIndex) {
      alert("一樣是要猜殺毀");
      return null;
    }

    // 從WordData的資料長度中，隨機產四個變數，此四個變數代表WordData資料的index，並將四個index的資料取出做為選項，並隨機使用一筆作為答案，如果GuessIndex或AnswerIndex為word，那麼要把該選項移除，並重新抽選補齊四個選項
    const getRandomIndexes = () => {
      const indexes: number[] = [];
      while (indexes.length < 4) {
        const randomIndex = Math.floor(Math.random() * WordDataCount);
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
        }
      }
      return indexes;
    };
    let randomIndexes: number[] = [];
    let options: WordDataType[] = [];
    randomIndexes = getRandomIndexes();
    options = randomIndexes.map((index) => WordData[index]);
    // while (true) {
    //   randomIndexes = getRandomIndexes();
    //   options = randomIndexes.map((index) => WordData[index]);
    //   if (
    //     (GuessIndex == "word" || AnswerIndex == "word") &&
    //     options.some((option) => option.word === null)
    //   ) {
    //     console.log("====================================");
    //     console.log("有漢字為null 重新抓");
    //     console.log("====================================");
    //   } else {
    //     break;
    //   }
    // }

    const answerIndex = randomIndexes[Math.floor(Math.random() * 4)];
    const answer = WordData[answerIndex];

    setOptions(options);
    setAnswer(answer);
  };

  //選項渲染
  const AnswerAreaTemplate = (option: WordDataType) => {
    let content: JSX.Element = <></>;
    switch (AnswerIndex) {
      case "word":
        content = (
          <div className="text-2xl text-center font-bold">{option.word}</div>
        );
        break;
      case "kana":
        content = (
          <div className="text-2xl text-center font-bold">{option.kana}</div>
        );
        break;
      case "chi":
        content = (
          <div className="text-2xl text-center font-bold">{option.chi}</div>
        );
        break;
      default:
        content = (
          <div className="text-2xl text-center font-bold">{option.word}</div>
        );
    }

    return <div>{content}</div>;
  };

  // 題目渲染
  const GuessAreaTemplate = () => {
    let content = "點擊按鈕出題";
    if (Answer?.chi) {
      switch (GuessIndex) {
        case "word":
          content = Answer.word;
          break;
        case "kana":
          content = Answer.kana;
          break;
        case "chi":
          content = Answer.chi;
          break;
        default:
          content = Answer.word;
          break;
      }
    }
    return (
      <div
        className={`text-4xl font-bold text-center p-5 border-2 ${Bingo == false ? "border-red-500" : "border-gray-500"
          }`}
      >
        {content}
      </div>
    );
  };

  // 檢查答案
  const CheckAnswer = ({ option }: { option: WordDataType }) => {
    console.log("option", option);
    console.log("Answer", Answer);
    // 判斷 word、kana
    if (option?.word == Answer?.word && option?.kana == Answer.kana) {
      // 答對
      setBingo(null);
      StartGuessWord();
      setContinueBingo(ContinueBingo + 1);
      return null;
    }

    // 答錯
    setBingo(false);
    setContinueBingo(0);
    return null;
  };

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a onClick={() => navigate("/")}>首頁</a>
          </li>
          <li>時間單字測試</li>
        </ul>
      </div>
      <div className="text-right">
        <button className="btn btn-warning" onClick={() => GoWordTable()}>
          時間單字列表
        </button>
      </div>
      <div className="my-2 border-2 p-4 rounded-lg">
        <h3>題目看得</h3>
        <div className="flex items-center">
          <div className="form-control mx-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="Guess"
                id="GuessWord"
                className="radio  "
                onChange={() => setGuessIndex("word")}
                checked={GuessIndex == "word"}
              />
              <span className="label-text  mx-2">名詞</span>
            </label>
          </div>
          <div className="form-control mx-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="Guess"
                id="Guesskana"
                className="radio  "
                onChange={() => setGuessIndex("kana")}
                checked={GuessIndex == "kana"}
              />
              <span className="label-text  mx-2">假名</span>
            </label>
          </div>
          <div className="form-control mx-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="Guess"
                id="GuessChi"
                className="radio  "
                onChange={() => setGuessIndex("chi")}
                checked={GuessIndex == "chi"}
              />
              <span className="label-text  mx-2">中文</span>
            </label>
          </div>
        </div>
      </div>
      <div className=" my-2 border-2 p-4 rounded-lg">
        <h3>選項看得</h3>
        <div className="flex items-center">
          <div className="form-control mx-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="Answer"
                className="radio "
                onChange={() => setAnsertIndex("word")}
                checked={AnswerIndex == "word"}
              />
              <span className="label-text  mx-2">名詞</span>
            </label>
          </div>
          <div className="form-control mx-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="Answer"
                className="radio  "
                onChange={() => setAnsertIndex("kana")}
                checked={AnswerIndex == "kana"}
              />
              <span className="label-text  mx-2">假名</span>
            </label>
          </div>
          <div className="form-control mx-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="Answer"
                className="radio  "
                onChange={() => setAnsertIndex("chi")}
                checked={AnswerIndex == "chi"}
              />
              <span className="label-text  mx-2">中文</span>
            </label>
          </div>
        </div>
      </div>
      <div className="my-2 ">
        <button
          className="btn btn-warning w-full"
          onClick={() => StartGuessWord()}
        >
          開始刷題
        </button>
      </div>

      {/* 答題區 */}
      <div>
        <h4>連續答對題數：{ContinueBingo}</h4>
        {GuessAreaTemplate()}
        {Options && Options.length > 0 ? (
          <div>
            {Options.map((option) => (
              <div
                className="m-2 p-2 border-2 hover:border-black hover:bg-gray-200"
                onClick={() => CheckAnswer({ option: option })}
              >
                {AnswerAreaTemplate(option)}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
