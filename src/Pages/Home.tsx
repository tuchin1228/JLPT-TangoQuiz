import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div role="alert" className="alert my-3">
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
        <span>選擇練習內容</span>
      </div>
      <button
        className="btn text-2xl py-2 btn-warning block my-4 text-center w-full"
        onClick={() => navigate("/NounWord")}
      >
        名詞練習
      </button>
      <button
        className="btn text-2xl py-2 btn-warning block my-4 text-center w-full"
        onClick={() => navigate("/CountWord")}
      >
        數量名詞練習
      </button>
      <button
        className="btn text-2xl py-2 btn-warning block my-4 text-center w-full"
        onClick={() => navigate("/TimeWord")}
      >
        時間名詞練習
      </button>
      <button
        className="btn text-2xl py-2 btn-warning block my-4 text-center w-full"
        onClick={() => navigate("/VerbWord")}
      >
        動詞練習
      </button>
      <button
        className="btn text-2xl py-2 btn-warning block my-4 text-center w-full"
        onClick={() => navigate("/NewWord")}
      >
        新單字練習
      </button>
    </div>
  );
}
