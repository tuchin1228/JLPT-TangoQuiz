import { useState } from "react";
import WordData from "../Jsonfiles/Onomatope.json";
import { useNavigate } from "react-router-dom";

// LocalStorage key 常數
const FAVORITE_WORDS_KEY = "favoriteWordsOnomatope";

export default function NewWordTable() {
  const navigate = useNavigate();
  const [favoriteWords, setFavoriteWords] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITE_WORDS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

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

  return (
    <div>
      <div className="overflow-x-auto ">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a onClick={() => navigate("/")}>首頁</a>
            </li>
            <li>
              <a onClick={() => navigate("/OnomatopeWord")}>擬聲詞測試</a>
            </li>
            <li>擬聲詞列表</li>
          </ul>
        </div>
        <div className="flex justify-between items-center gap-4 my-2">
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>共 {WordData.length} 個單字</span>
          </div>
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-info shrink-0"
              fill={favoriteWords.length > 0 ? "currentColor" : "none"}
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
            <span>已收藏 {favoriteWords.length} 個單字</span>
          </div>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-2xl font-bold bg-base-200">
              <th>編號</th>
              <th>漢字</th>
              <th>假名</th>
              <th>中文</th>
              <th>動作</th>
            </tr>
          </thead>
          <tbody>
            {WordData
              ? WordData.map((word, idx) => (
                <tr key={idx} className={`${idx % 2 !== 0 ? "bg-base-200" : ""}`}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="text-xl font-semibold">
                    <div className="flex items-center gap-2">
                      {word.word ? word.word : ""}  
                    </div>
                  </td>
                  <td className="text-xl font-semibold">{word.kana} </td>
                  <td className="text-xl font-semibold">{word.chi}</td>
                  <td>
                    <div className="flex items-center gap-2">
                                        <button
                        onClick={() => toggleFavorite(word.word)}
                        className="btn btn-circle btn-sm btn-ghost"
                        title={favoriteWords.includes(word.word) ? "取消收藏" : "加入收藏"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill={favoriteWords.includes(word.word) ? "currentColor" : "none"}
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
                  </td>
                </tr>
              ))
              : null}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
