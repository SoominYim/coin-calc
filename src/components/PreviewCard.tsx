interface PreviewCardProps {
  coinName: string;
  side: "long" | "short";
  leverage: number;
  pnl: number;
  pnlPercent: number;
  positionSize: number;
  entryPrice: number;
  markPrice: number;
}

export default function PreviewCard({
  coinName,
  side,
  leverage,
  pnl,
  pnlPercent,
  positionSize,
  entryPrice,
  markPrice,
}: PreviewCardProps) {
  const formatNumber = (num: number, digits = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  };

  return (
    <div className="rounded-[26px] border border-neutral-800 bg-black px-5 pt-0.5 pb-5 text-white">
      {/* Top Graphic */}
      <div>
        <div className="relative h-[16px] w-full">
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-neutral-800"></div>
          <div className="absolute left-[120px] bottom-[1px] h-[1.8px] w-[100px] rounded-full bg-white"></div>
        </div>
      </div>

      {/* Header */}
      <div className="mt-4 flex items-center justify-between text-[15px]">
        <div className="flex items-center pl-[18px]">
          <button className="flex h-[19px] w-[19px] items-center justify-center rounded-[3.5px] bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[15px] w-[15px] text-black"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </button>
          <span className="pl-[10px] text-[14px] font-[300] tracking-[0.04em]">All Markets</span>
          <svg
            className="ml-[22px] h-[17px] w-[17px]"
            viewBox="0 0 128 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="56.127" width="71.3812" height="12.1877" rx="6.09386" fill="white" />
            <rect x="56.127" y="31.0212" width="71.3812" height="12.1877" rx="6.09386" fill="white" />
            <rect x="56.127" y="62.0424" width="71.3812" height="12.1877" rx="6.09386" fill="white" />
            <rect
              x="18.6738"
              y="68.136"
              width="68.0642"
              height="12.1877"
              rx="6.09386"
              transform="rotate(-90 18.6738 68.136)"
              fill="white"
            />
            <path
              d="M22.3537 73.4471C23.6007 74.9743 25.9346 74.9743 27.1816 73.4471L42.0628 55.2224C43.7248 53.187 42.2766 50.1348 39.6488 50.1348H9.88646C7.25873 50.1348 5.8105 53.187 7.47248 55.2224L22.3537 73.4471Z"
              fill="white"
            />
          </svg>
        </div>
        <button className="pr-[18px] text-[14.5px] font-[450] text-neutral-50">Close All</button>
      </div>

      <div className="mt-4 h-[1px] w-full bg-neutral-800"></div>

      {/* Main Content */}
      <div className="pl-[18px] mt-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[16.6px] font-[530] tracking-[0.001em]">{coinName || "-"}</span>
            <div className="inline-flex items-center justify-center rounded-full bg-[#141A1C] px-[7px] py-[3px]">
              <span
                className={`text-[15px] font-[400] leading-none tracking-tight ${
                  side === "long" ? "text-[#59A97F]" : "text-[#CB5165]"
                }`}
              >
                {side === "long" ? "Long" : "Short"}
              </span>
            </div>
          </div>
          <div className="text-[12px] font-light">
            Cross <span>{Math.round(leverage)}</span>x
          </div>
        </div>
        <div className="text-right pr-[18px]">
          <div className="flex items-center justify-end gap-[3px] text-[11px] text-neutral-500 tracking-[0.02em] font-[400]">
            <span>Unrealized P&L</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[18px] w-[18px] pb-[2px]"
              aria-hidden="true"
            >
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
          </div>
          <div className="mt-1 flex items-center justify-end">
            <span className={`text-[17px] font-[500] leading-none ${pnl >= 0 ? "text-[#25B773]" : "text-[#CB5165]"}`}>
              {formatNumber(pnl)} ({formatNumber(pnlPercent)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="pl-[18px] pr-[18px] mt-6 flex justify-between text-[11.5px] text-neutral-500 whitespace-nowrap">
        <div>
          <div className="text-left">Position Size</div>
          <div className="mt-1 text-[14px] font-[300] text-left text-white">
            {positionSize ? positionSize.toLocaleString() : "--"}
          </div>
        </div>
        <div>
          <div className="text-left">
            <span className="relative inline-block">
              Entry Price
              <span className="pointer-events-none absolute left-0 right-0 -bottom-[0.5px] h-[1px] border-b border-dotted border-neutral-800"></span>
            </span>
          </div>
          <div className="mt-1 text-[14px] font-[300] text-left text-white">{entryPrice || "--"}</div>
        </div>
        <div>
          <div className="text-left">Mark Price</div>
          <div className="mt-1 text-[14px] font-[300] text-left text-white">{markPrice || "--"}</div>
        </div>
        <div className="text-right">
          <div>
            <span className="relative inline-block">
              Estimated Liq. Price
              <span className="pointer-events-none absolute left-0 right-0 -bottom-[0.5px] h-[1px] border-b border-dotted border-neutral-800"></span>
            </span>
          </div>
          <div className="mt-1 text-[14px] font-[300] text-[#D1A44A]">--</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pl-[18px] pr-[18px] mt-5 flex gap-3 text-[14.5px] text-center font-[480]">
        <button className="flex-1 rounded-full border border-neutral-700 px-5 py-[6px]">Set TP/SL</button>
        <button className="flex-1 rounded-full border border-neutral-700 px-5 py-[5px]">Trailing Stop</button>
        <button className="flex-1 rounded-full border border-neutral-700 px-5 py-[5px]">Close By</button>
      </div>
    </div>
  );
}
