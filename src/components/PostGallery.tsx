import { useState } from "react";
import { cn } from "@/lib/cn";

interface PostGalleryProps {
  imageUrls: string[];
  alt: string;
  credit: string;
}

function GalleryFallback() {
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-neutral-50 text-sm text-neutral-400">
      이미지가 없습니다
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <GalleryFallback />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="aspect-[4/3] w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function PostGallery({ imageUrls, alt, credit }: PostGalleryProps) {
  const [index, setIndex] = useState(0);
  const hasImages = imageUrls.length > 0;
  const current = hasImages ? imageUrls[index] : null;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="relative">
        {current ? <GalleryImage src={current} alt={alt} /> : <GalleryFallback />}
        <p className="absolute bottom-2 right-3 text-xs text-neutral-500">made by. {credit}</p>
      </div>
      {hasImages && imageUrls.length > 1 ? (
        <div className="flex justify-center gap-1.5 py-2">
          {imageUrls.map((url, dotIndex) => (
            <button
              key={url}
              type="button"
              aria-label={`${dotIndex + 1}번째 사진`}
              className={cn(
                "size-1.5 rounded-full",
                dotIndex === index ? "bg-neutral-800" : "bg-neutral-300",
              )}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
