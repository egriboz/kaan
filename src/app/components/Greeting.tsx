import React, { useEffect, useState } from "react";

const greetings: Record<string, string> = {
  tr: "MERHABA DE!",
  en: "SAY HELLO!",
  es: "¡DI HOLA!",
  fr: "DIS BONJOUR!",
  it: "DI CIAO!",
  ja: "こんにちはと言ってください",
  zh: "说你好",
};

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string>("HI!"); // Varsayılan selam

  useEffect(() => {
    const language = navigator.language;
    const langCode = language.split("-")[0]; // 'tr', 'en' vb.
    setGreeting(greetings[langCode] || "HI!"); // Varsayılan selam
  }, []);
  return (
    <>
      <span>{greeting}</span>
    </>
  );
};
export default Greeting;
