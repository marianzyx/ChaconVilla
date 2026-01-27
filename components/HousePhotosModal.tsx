"use client";

import Image from "next/image";

type Props = {
  open: boolean;
  title: string;
  images: { src: string; alt: string }[];
  onClose: () => void;
};

export default function HousePhotosModal({ open, title, images, onClose }: Props) {
  if (!open) return null;

  // Prevent closing when clicking inside the modal content
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[var(--bg)] shadow-2xl overflow-hidden"
        onClick={stop}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <p className="font-semibold">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-2)] transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.src}
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-2)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--muted)] mt-4">
            Tip: replace these placeholder paths with your real interior photos in{" "}
            <span className="font-semibold">public/images/interiors/</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
