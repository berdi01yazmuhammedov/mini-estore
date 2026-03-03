import React, { useRef, useEffect } from 'react';

const NotFound = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;  // включаем звук
        videoRef.current.play().catch(() => {}); // запускаем видео
      }
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    // Слушаем клик или тап на любой части страницы
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Фоновый шум */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Ряд с 4 0 4 */}
        <div className="flex items-center gap-5">
          <span className="text-[clamp(120px,20vw,220px)] font-extrabold -tracking-[4px] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            4
          </span>

          {/* Видео-ноль */}
          <div className="relative w-[clamp(120px,18vw,200px)] h-[clamp(120px,18vw,200px)] rounded-full overflow-hidden flex-shrink-0 animate-breathe shadow-[0_0_0_5px_rgba(255,255,255,0.9),0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(255,255,255,0.08)]">
            <video
              ref={videoRef}
              src="/head.mp4"
              autoPlay
              loop
              muted // старт с мутом, чтобы разрешил autoplay
              playsInline
              className="w-full h-full object-cover block"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-500 text-sm p-3 hidden">
              Видео отсутствует
            </div>
          </div>

          <span className="text-[clamp(120px,20vw,220px)] font-extrabold -tracking-[4px] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            4
          </span>
        </div>

        {/* Текст под числом */}
        <div className="text-center">
          <h1 className="text-[clamp(18px,3vw,28px)] font-bold mb-2">Страница не найдена</h1>
          <p className="text-[clamp(13px,1.8vw,17px)] text-gray-400">
            Возможно, она переехала или никогда не существовала.
          </p>
        </div>

        {/* Кнопка */}
        <a
          href="/"
          className="mt-2 px-9 py-3 border-2 border-white/85 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all"
        >
          На главную
        </a>
      </div>

      {/* Мелкий код */}
      <span className="fixed bottom-6 font-mono text-xs text-gray-600 select-none">
        error_code: 404
      </span>

      {/* Анимация дыхания */}
      <style>
        {`
          @keyframes breathe {
            0%, 100% { box-shadow: 0 0 0 5px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.2); }
            50% { box-shadow: 0 0 0 5px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,0.35); }
          }
          .animate-breathe { animation: breathe 4s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default NotFound;