"use client";

import React from "react";
import { IconPhoto, IconPencil } from "@tabler/icons-react";

export type ImageRatio = "16:9" | "4:5" | "1:1" | "3:4" | "2:1";

interface ImageSlotProps {
  ratio?: ImageRatio;
  label: string;
  source?: "placeholder" | string;
  className?: string;
  onEdit?: () => void;
  sublabel?: string;
  actionText?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  ratio = "16:9",
  label,
  source = "placeholder",
  className = "",
  onEdit,
  sublabel,
  actionText,
}) => {
  const getRatioClass = (r: ImageRatio) => {
    switch (r) {
      case "16:9":
        return "aspect-[16/9]";
      case "4:5":
        return "aspect-[4/5]";
      case "1:1":
        return "aspect-square";
      case "3:4":
        return "aspect-[3/4]";
      case "2:1":
        return "aspect-[2/1]";
      default:
        return "aspect-[16/9]";
    }
  };

  const isRealImage = source && source !== "placeholder" && source.startsWith("http");

  return (
    <div
      className={`relative w-full ${getRatioClass(ratio)} overflow-hidden rounded-[20px] sm:rounded-[24px] border border-border-subtle bg-soft-olive/40 flex flex-col items-center justify-center p-6 text-center transition-all ${className}`}
    >
      {isRealImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={source}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center max-w-[85%]">
          <div className="w-12 h-12 rounded-full bg-white/80 border border-border-subtle flex items-center justify-center text-muted-green mb-3 shadow-xs">
            <IconPhoto size={24} stroke={1.5} />
          </div>
          <span className="text-sm sm:text-base font-medium text-ink-dark">
            {label}
          </span>
          <span className="text-xs text-muted-green mt-1">
            {sublabel || `สัดส่วน ${ratio} • พื้นที่ภาพตัวอย่าง`}
          </span>
          {actionText && (
            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-ink-dark border border-border-subtle">
              <IconPencil size={13} stroke={1.8} />
              {actionText}
            </span>
          )}
        </div>
      )}

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 border border-border-subtle text-ink-dark hover:bg-white shadow-xs transition-colors"
          title="แก้ไขรูปภาพ"
        >
          <IconPencil size={16} stroke={1.8} />
        </button>
      )}
    </div>
  );
};
