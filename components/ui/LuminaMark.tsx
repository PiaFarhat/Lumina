import Image from "next/image";
import { images } from "@/lib/lumina-data";

type LuminaMarkProps = {
  size?: "sm" | "md";
  alt?: string;
};

const sizes = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
};

export function LuminaMark({ size = "sm", alt = "Lumina L light symbol" }: LuminaMarkProps) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-2xl border border-[#D8D4CC] bg-[#F4F1EA] shadow-sm ${sizes[size]}`}>
      <Image
        src={images.mark}
        alt={alt}
        fill
        sizes={size === "sm" ? "44px" : "56px"}
        className="object-cover -translate-y-0.5"
      />
    </span>
  );
}
