interface SideToggleProps {
  side: "long" | "short";
  onSideChange: (side: "long" | "short") => void;
}

export default function SideToggle({ side, onSideChange }: SideToggleProps) {
  return (
    <div className="pt-2">
      <span className="mb-1 block text-neutral-300">Side</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSideChange("long")}
          className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
            side === "long" ? "border-[#59A97F] text-[#59A97F]" : "border-neutral-700 text-neutral-400"
          }`}
        >
          Long
        </button>
        <button
          type="button"
          onClick={() => onSideChange("short")}
          className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
            side === "short" ? "border-[#CB5165] text-[#CB5165]" : "border-neutral-700 text-neutral-400"
          }`}
        >
          Short
        </button>
      </div>
    </div>
  );
}
