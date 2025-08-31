import { useEffect, useState } from "react";
import WordData from "../Jsonfiles/N3Word.json";
import { useNavigate } from "react-router-dom";
import { useJapaneseTTS } from "../useJapaneseTTS";

// LocalStorage key 常數
const FAVORITE_WORDS_KEY = "favoriteWordsN3";


interface WordDataType {
  word: string,
  kana: string,
  chi: string,
  accent?: number | null,
}

export default function NewWord() {
  const navigate = useNavigate();
  const { speak } = useJapaneseTTS();
  const [favoriteWords, setFavoriteWords] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITE_WORDS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const GoWordTable = () => {
    navigate("/N3WordTable");
  };

  const GoFavoriteWordTable = () => {
    navigate("/N3FavoriteWordTable");
  };

  // 處理收藏/取消收藏
  const toggleFavorite = (word: string) => {
    setFavoriteWords(prev => {
      const newFavorites = prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word];
      localStorage.setItem(FAVORITE_WORDS_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
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
  // 新增起始和終點編號狀態
  const [startIndex, setStartIndex] = useState<number>(1);
  const [endIndex, setEndIndex] = useState<number>(WordDataCount);

  // 每題複習
  const [ReviewModel, setReviewModel] = useState<boolean>(false);

  useEffect(() => {
    setOptions([]);
    setAnswer(null);
    setBingo(null);
    setContinueBingo(0);
  }, [GuessIndex, AnswerIndex]);

  // 開始產題
  const StartGuessWord = () => {
    if (GuessIndex == AnswerIndex) {
      alert("禁止猜同一個欄位");
      return null;
    }

    // 從WordData的資料長度中，隨機產四個變數，此四個變數代表WordData資料的index，並將四個index的資料取出做為選項，並隨機使用一筆作為答案，如果GuessIndex或AnswerIndex為word，那麼要把該選項移除，並重新抽選補齊四個選項
    const getRandomIndexes = () => {
      const indexes: number[] = [];
      // 修正計算方式，確保包含起點和終點編號
      const validStart = Math.max(0, startIndex - 1);
      const validEnd = Math.min(WordDataCount - 1, endIndex - 1);

      if (validStart > validEnd) {
        alert("起始編號必須小於或等於終點編號");
        return indexes;
      }

      const range = validEnd - validStart + 1;
      if (range < 4) {
        alert("選擇的範圍必須至少包含 4 個單字");
        return indexes;
      }

      while (indexes.length < 4) {
        const randomIndex = Math.floor(Math.random() * range) + validStart;
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
          <div className="text-2xl text-center font-bold">
            {option.word}
            {option.accent != null && <span className="text-sm ml-1">[{option.accent}]</span>}
          </div>
        );
        break;
      case "kana":
        content = (
          <div className="text-2xl text-center font-bold">
            {option.kana}
            {option.accent != null && <span className="text-sm ml-1">[{option.accent}]</span>}
          </div>
        );
        break;
      case "chi":
        content = (
          <div className="text-2xl text-center font-bold">{option.chi}</div>
        );
        break;
      default:
        content = (
          <div className="text-2xl text-center font-bold">
            {option.word}
            {option.accent != null && <span className="text-sm ml-1">[{option.accent}]</span>}
          </div>
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
          content = Answer.word + (Answer.accent != null ? ` [${Answer.accent}]` : '');
          break;
        case "kana":
          content = Answer.kana + (Answer.accent != null ? ` [${Answer.accent}]` : '');
          break;
        case "chi":
          content = Answer.chi;
          break;
        default:
          content = Answer.word + (Answer.accent != null ? ` [${Answer.accent}]` : '');
          break;
      }
    }
    return (
      <div
        className={`text-4xl font-bold text-center p-5 border-2 `}
      >
        {content}
      </div>
    );
  };

  // 檢查答案
  // const CheckAnswer = ({ option }: { option: WordDataType }) => {
  //   console.log("option", option);
  //   console.log("Answer", Answer);
  //   // 判斷 word、kana
  //   if (option?.word == Answer?.word && option?.kana == Answer?.kana) {
  //     // 答對
  //     setBingo(null);
  //     StartGuessWord();
  //     setContinueBingo(ContinueBingo + 1);
  //     return null;
  //   }

  //   // 答錯
  //   setBingo(false);
  //   setContinueBingo(0);
  //   return null;
  // };


  // 檢查答案
  const CheckAnswer = ({ option }: { option: WordDataType }) => {
    console.log("option", option);
    console.log("Answer", Answer);
    // 判斷 word、kana
    if (Answer && option?.word == Answer.word && option?.kana == Answer.kana) {
      // 答對
      setBingo(null);
      //   StartGuessWord();
      setContinueBingo(ContinueBingo + 1);
    } else {
      // 答錯
      setBingo(false);
      setContinueBingo(0);
    }

    setReviewModel(true);
    return null;
  };


  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a onClick={() => navigate("/")}>首頁</a>
          </li>
          <li>N3單字測試</li>
        </ul>
      </div>
      <div className="text-right">
        <button className="btn btn-warning ml-1" onClick={() => GoWordTable()}>
          N3單字
        </button>
        <button className="btn btn-warning ml-1" onClick={() => GoFavoriteWordTable()}>
          收藏單字
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
              <span className="label-text  mx-2">單字</span>
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
              <span className="label-text  mx-2">單字</span>
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
      <div className="my-2 border-2 p-4 rounded-lg">
        <h3>進階篩選</h3>
        <div className="flex items-center gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">起始編號 (1-{WordDataCount})</span>
            </label>
            <input
              type="number"
              min="1"
              max={WordDataCount}
              value={startIndex}
              onChange={(e) => setStartIndex(Math.max(1, Math.min(parseInt(e.target.value) || 1, WordDataCount)))}
              className="input input-bordered w-24"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">終點編號 (1-{WordDataCount})</span>
            </label>
            <input
              type="number"
              min="1"
              max={WordDataCount}
              value={endIndex}
              onChange={(e) => setEndIndex(Math.max(1, Math.min(parseInt(e.target.value) || 1, WordDataCount)))}
              className="input input-bordered w-24"
            />
          </div>
        </div>
      </div>

      <div className="my-2 ">
        <button
          className="btn btn-warning w-full"
          onClick={() => {
            if (ContinueBingo > 0) {
              if (window.confirm('重新刷題將會重置連續答對次數，確定要繼續嗎？')) {
                setContinueBingo(0);
                StartGuessWord();
              }
            } else {
              StartGuessWord();
            }
          }}
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

      {/* 複習視窗 */}
      <div
        className={`modal ${ReviewModel ? "modal-open" : ""}`}
      // onClick={() => setReviewModel(false)}
      >
        <div
          className="modal-box w-11/12 max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold">複習</h2>
          <div className="text-4xl font-bold text-center p-5 border-2 border-gray-500">
            {/* 排版 Options 內容 */}
            {Options.map((option) => (
              <div className="m-2 p-2 border-2 flex items-center justify-between">
                <div className="text-xl text-center font-bold flex items-center gap-4">
                  <button
                    onClick={() => {
                      speak(option.word);
                    }}
                    className="btn btn-circle btn-sm btn-ghost"
                    title="播放發音"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </button>
                  <span>{option.word}{option.accent != null && ` [${option.accent}]`} ({option.kana}{option.accent != null && ` [${option.accent}]`})</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xl text-center font-bold">
                    {option.chi}
                  </div>
                  <button
                    onClick={() => toggleFavorite(option.word)}
                    className="btn btn-circle btn-sm btn-ghost"
                    title={favoriteWords.includes(option.word) ? "取消收藏" : "加入收藏"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill={favoriteWords.includes(option.word) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-center text-red-600 text-2xl font-bold mt-4">
              {Bingo == false ? "答錯!!" : "正確!!"}
            </p>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                setReviewModel(false);
                StartGuessWord();
              }}
            >
              下一題
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
