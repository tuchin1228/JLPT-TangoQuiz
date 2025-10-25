import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end mb-2">
        <a
          href="https://github.com/tuchin1228/JapanLearn-TS"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-circle btn-ghost"
          title="查看原始碼"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      <div role="alert" className="alert mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
        <button
          className="aspect-square rounded-xl border-2 border-gray-300 bg-white/80 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center shadow-sm hover:shadow-md group relative overflow-hidden"
          onClick={() => navigate("/N5Word")}
        >
          <span className="text-5xl font-extrabold mb-2 text-blue-500 group-hover:text-blue-600 transition-colors duration-200">N5</span>
          <span className="text-lg font-bold text-gray-700  tracking-wide">單字練習</span>
        </button>
        <button
          className="aspect-square rounded-xl border-2 border-gray-300 bg-white/80 hover:bg-green-50 transition-all duration-300 flex flex-col items-center justify-center shadow-sm hover:shadow-md group relative overflow-hidden"
          onClick={() => navigate("/N4Word")}
        >
          <span className="text-5xl font-extrabold mb-2 text-green-500 group-hover:text-green-600 transition-colors duration-200">N4</span>
          <span className="text-lg font-bold text-gray-700  tracking-wide">單字練習</span>
        </button>
        <button
          className="aspect-square rounded-xl border-2 border-gray-300 bg-white/80 hover:bg-yellow-50 transition-all duration-300 flex flex-col items-center justify-center shadow-sm hover:shadow-md group relative overflow-hidden"
          onClick={() => navigate("/N3Word")}
        >
          <span className="text-5xl font-extrabold mb-2 text-yellow-500 group-hover:text-yellow-600 transition-colors duration-200">N3</span>
          <span className="text-lg font-bold text-gray-700  tracking-wide">單字練習</span>
        </button>
        <button
          className="aspect-square rounded-xl border-2 border-gray-300 bg-white/80 hover:bg-purple-50 transition-all duration-300 flex flex-col items-center justify-center shadow-sm hover:shadow-md group relative overflow-hidden"
          onClick={() => navigate("/OnomatopeWord")}
        >
          <span className="text-5xl font-extrabold mb-2 text-purple-500 group-hover:text-purple-600 transition-colors duration-200">擬聲詞</span>
          <span className="text-lg font-bold text-gray-700  tracking-wide">擬聲擬態詞練習</span>
        </button>
      </div>

    </div>
  );
}
