# 日文背單字小遊戲

幫助記憶日文單字，順便練習 Typescript

## 立即體驗

🌐 [DEMO：https://japan-learn-ts.vercel.app/](https://japan-learn-ts.vercel.app/)

## 功能特點

- 支援多種單字類別（N3、N4、動詞、名詞等）
- 互動式學習介面
- 複習模式
- 使用 TypeScript 開發，提供型別安全
- 基於 React 和 Vite 建構

## 執行方式

- 套件安裝

```shell
npm install
```

- 執行

```shell
npm run dev
```

## 專案結構

```
src/
  ├── Pages/         # 頁面組件
  ├── Jsonfiles/     # 單字資料檔案
  └── assets/        # 靜態資源
```

## 更新日誌
### 2025年
- 2025/7/27 整併 N5、N4 單字，新增單字發音功能
  - 新增單字表與測驗中的語音播放功能
  - 支援重音標記顯示
- 2025/7/10 新增 N3 單字，並加入篩選練習單字
- 2025/6/27 系統優化及新增 N3 單字
- 2025/6/02 N4 單字測試新增複習視窗，改進選擇模式
- 2025/5/01 調整 N4 單字內容

### 2024年
- 2024/12/19 新增 N4 單字
- 2024/08/22 新增基礎單字
- 2024/08/09 改進 TypeScript 配置，擴充單字庫
- 2024/05/28 初始化專案，建立基礎架構
  - 設置 TypeScript 開發環境
  - 建立 JSON 資料結構
  - 完成基礎文件建置

## 技術堆疊

- TypeScript
- React
- Vite
- Tailwind CSS