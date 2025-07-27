import WordData from "../Jsonfiles/N4Word.json";
import { useNavigate } from "react-router-dom";

export default function NewWordTable() {
  const navigate = useNavigate();

  const speak = (text: string) => {
    // 移除方括號中的音調標記（例如：）
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // 設定日語發音
    utterance.rate = 1; // 語速稍微放慢
    window.speechSynthesis.speak(utterance);
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
              <a onClick={() => navigate("/N4Word")}>N4單字測試</a>
            </li>
            <li>N4單字列表</li>
          </ul>
        </div>
        <div role="alert" className="alert my-2">
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
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-2xl font-bold bg-base-200">
              <th>漢字</th>
              <th>假名</th>
              <th>中文</th>
              <th>發音</th>
            </tr>
          </thead>
          <tbody>
            {WordData
              ? WordData.map((word, idx) => (
                <tr className={`${idx % 2 != 0 ? "bg-base-200" : ""}`}>
                  <td className="text-xl font-semibold">
                    {word.word ? word.word : ""}
                  </td>
                  <td className="text-xl font-semibold">{word.kana}</td>
                  <td className="text-xl font-semibold">{word.chi}</td>
                  <td>
                    <button
                      onClick={() => speak(word.word)}
                      className="btn btn-circle btn-sm btn-ghost"
                      title="播放發音"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </button>
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
