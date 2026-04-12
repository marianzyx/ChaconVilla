"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  title: string;
  images: { src: string; alt: string }[];
  onClose: () => void;
};

export default function HousePhotosModal({ open, title, images, onClose }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!open) return null;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      {/* Grid modal */}
      <div
        className="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className="w-full max-w-5xl rounded-2xl border border-white/10 bg-(--bg) shadow-2xl overflow-hidden"
          onClick={stop}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
            <p className="font-semibold">{title}</p>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg border border-(--border) hover:bg-(--bg-2) transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-5 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setLightbox(img.src)}
                  className="relative w-full aspect-4/3 rounded-xl overflow-hidden border border-(--border) bg-(--bg-2) cursor-zoom-in"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-200 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-2xl px-3 py-1 rounded-lg hover:bg-white/10 transition"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={stop}>
            <Image
              src={lightbox}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
