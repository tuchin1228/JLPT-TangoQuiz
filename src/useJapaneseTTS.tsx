import { useEffect, useState, useCallback } from "react";

/**
 * Hook 回傳類型
 */
export interface JapaneseTTSHook {
  /** 朗讀指定文字（僅支援日語） */
  speak: (text: string) => void;
  /** 語音清單是否已載入完成 */
  ready: boolean;
}

/**
 * 取得第一個日語 Voice；若未安裝日語語音會回傳 `undefined`。
 */
function getJaVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | undefined {
  return synth.getVoices().find((v) => v.lang?.startsWith("ja"));
}

/**
 * React Hook：提供日語 TTS 朗讀功能。
 *
 * @example
 * const { speak, ready } = useJapaneseTTS();
 * speak("こんにちは");
 */
export function useJapaneseTTS(): JapaneseTTSHook {
  const synth = window.speechSynthesis;
  const [ready, setReady] = useState<boolean>(false);

  /* 初始化：等待 voices 列舉完成 */
  useEffect(() => {
    if (synth.getVoices().length) {
      setReady(true);
    } else {
      const handler = () => setReady(true);
      synth.addEventListener("voiceschanged", handler, { once: true });
      return () => synth.removeEventListener("voiceschanged", handler);
    }
  }, [synth]);

  /**
   * 朗讀指定文字。
   * @param text - 要朗讀的日文內容。
   */
  const speak = useCallback(
    (text: string): void => {
      if (!ready) return; // 尚未就緒時忽略

      const jaVoice = getJaVoice(synth);
      if (!jaVoice) {
        window.alert(
          "尚未安裝日語語音，請到 iOS『輔助使用 ➜ 朗讀內容 ➜ 聲音 ➜ 日語』下載後再試。"
        );
        return;
      }

      synth.cancel(); // 清空佇列，避免多段重疊播放

      const utterance = new SpeechSynthesisUtterance(text);
      // 等待語音載入完成
      const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        const googleJapanese = voices.find(voice =>
          voice.name === 'Google 日本語' && voice.lang === 'ja-JP'
        );

        if (googleJapanese) {
          utterance.voice = googleJapanese;
          utterance.lang = 'ja-JP';
          utterance.rate = 1.0;  // 固定語速
          utterance.pitch = 1.0; // 固定音調
          utterance.volume = 1.0; // 固定音量
          speechSynthesis.speak(utterance);
        } else {
          console.error('找不到 Google 日本語語音');
        }
      };

      // 語音列表可能需要時間載入
      if (speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        speechSynthesis.onvoiceschanged = setVoice;
      }
    },
    [ready, synth]
  );

  return { speak, ready };
}