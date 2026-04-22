import  { useMemo, useState } from "react";
import { X, Expand, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Заменишь пути на свои реальные картинки
import img1 from "../../public/images/img1.jpg";
import img2 from "../../public/images/img2.jpg";
import img3 from "../../public/images/img3.jpg";

// import img4 from "./images/img4";
// import img5 from "./images/img5";
// import img6 from "./images/img6";
// import img7 from "./images/img7";
// import img8 from "./images/img8";
// import img9 from "./images/img9";
// import img10 from "./images/img10";

type GalleryItem = {
  id: number;
  title: string;
  img: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Изображение 1", img: img1 },
  { id: 2, title: "Изображение 2", img: img2 },
  { id: 3, title: "Изображение 3", img: img3 },
//   { id: 4, title: "Изображение 4", img: img4 },
//   { id: 5, title: "Изображение 5", img: img5 },
//   { id: 6, title: "Изображение 6", img: img6 },
//   { id: 7, title: "Изображение 7", img: img7 },
//   { id: 8, title: "Изображение 8", img: img8 },
//   { id: 9, title: "Изображение 9", img: img9 },
//   { id: 10, title: "Изображение 10", img: img10 },
];

export default function ProjectorImageWall() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = useMemo(() => {
    if (selectedIndex === null) return null;
    return galleryItems[selectedIndex] ?? null;
  }, [selectedIndex]);

  const closeModal = () => setSelectedIndex(null);

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryItems.length);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 md:px-10">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/40">
              Lecture Gallery
            </p>
           
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Всего изображений
            </p>
            <p className="mt-1 text-2xl font-semibold">{galleryItems.length}</p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/20 transition"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white/35">
                    <ImageIcon className="h-10 w-10" />
                    <span className="text-sm">Подставь своё изображение</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 p-2 text-white/90 backdrop-blur-md">
                  <Expand className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-lg font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/45">
                    Нажми, чтобы открыть полностью
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                  {String(item.id).padStart(2, "0")}
                </span>
              </div>
            </motion.button>
          ))}
        </section>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl md:p-8"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex max-h-[95vh] w-full max-w-7xl items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/45 p-3 text-white transition hover:scale-105 hover:bg-black/70"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 px-4 py-3 text-xl text-white transition hover:scale-105 hover:bg-black/70 md:left-5"
                aria-label="Предыдущее изображение"
              >
                ←
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 px-4 py-3 text-xl text-white transition hover:scale-105 hover:bg-black/70 md:right-5"
                aria-label="Следующее изображение"
              >
                →
              </button>

              <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                {selectedItem.title}
              </div>

              <div className="flex max-h-[85vh] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-black/30">
                <img
                  src={selectedItem.img}
                  alt={selectedItem.title}
                  className="max-h-[85vh] w-auto max-w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
