import { useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toPng } from "html-to-image";
import FormInput from "./components/FormInput";
import SideToggle from "./components/SideToggle";
import PreviewCard from "./components/PreviewCard";
import "./App.css";

// Zod 스키마 정의
const formSchema = z.object({
  coinName: z.string().min(1, "Coin name is required").max(20, "Coin name must be less than 20 characters"),
  positionSize: z
    .string()
    .refine(val => val !== "" && !isNaN(Number(val)), {
      message: "Position size must be a valid number",
    })
    .refine(val => Number(val) > 0, {
      message: "Position size must be greater than 0",
    }),
  entryPrice: z
    .string()
    .refine(val => val !== "" && !isNaN(Number(val)), {
      message: "Entry price must be a valid number",
    })
    .refine(val => Number(val) > 0, {
      message: "Entry price must be greater than 0",
    }),
  markPrice: z
    .string()
    .refine(val => val !== "" && !isNaN(Number(val)), {
      message: "Mark price must be a valid number",
    })
    .refine(val => Number(val) > 0, {
      message: "Mark price must be greater than 0",
    }),
  leverage: z
    .string()
    .refine(val => val !== "" && !isNaN(Number(val)), {
      message: "Leverage must be a valid number",
    })
    .refine(val => Number(val) > 0 && Number(val) <= 125, {
      message: "Leverage must be between 0 and 125",
    }),
  side: z.enum(["long", "short"]),
});

type FormData = z.infer<typeof formSchema>;

function App() {
  const previewRef = useRef<HTMLDivElement>(null);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      coinName: "POPCATUSDT",
      positionSize: "350000",
      entryPrice: "0.1665",
      markPrice: "0.1856",
      leverage: "10",
      side: "long",
    },
  });

  // useWatch로 실시간 값 구독 (리렌더링 트리거)
  const formValues = useWatch({ control });

  // 문자열을 숫자로 변환하는 헬퍼 함수
  const parseFloatOrZero = (value: string | undefined): number => {
    if (!value) return 0;
    const num = parseFloat(value.replace(/,/g, ""));
    return isNaN(num) ? 0 : num;
  };

  // 계산을 위한 숫자 값 추출
  const positionSize = parseFloatOrZero(formValues.positionSize);
  const entryPrice = parseFloatOrZero(formValues.entryPrice);
  const markPrice = parseFloatOrZero(formValues.markPrice);
  const leverage = parseFloatOrZero(formValues.leverage);

  // 안전한 값 추출
  const coinName = formValues.coinName ?? "POPCATUSDT";
  const side = formValues.side ?? "long";

  // PnL 계산
  const quantity = positionSize;
  const direction = side === "short" ? -1 : 1;
  const priceDiff = markPrice - entryPrice;

  const pnl = entryPrice && markPrice && quantity ? priceDiff * quantity * direction : 0;

  const notional = entryPrice && quantity ? entryPrice * quantity : 0;
  const margin = notional && leverage ? notional / leverage : 0;
  const pnlPercent = margin ? (pnl / margin) * 100 : 0;

  // 스크린샷 다운로드 핸들러
  const handleScreenshot = async () => {
    if (!previewRef.current) return;

    try {
      const dataUrl = await toPng(previewRef.current, {
        backgroundColor: "#000",
        pixelRatio: 2, // 고해상도
      });

      const link = document.createElement("a");
      link.download = `${coinName}_position.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Screenshot failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="section w-full py-10">
        <h1 className="mb-6 text-xl font-semibold">Coin Position Preview</h1>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* Left: Form */}
          <div className="space-y-4 rounded-2xl bg-neutral-900 p-6 shadow-soft">
            <h2 className="text-lg font-medium">Inputs</h2>
            <p className="text-sm text-neutral-400">
              Edit the values on the left and see the preview update on the right.
            </p>

            <div className="space-y-3 pt-2">
              <FormInput
                label="Coin Name"
                type="text"
                value={formValues.coinName || ""}
                onChange={e => setValue("coinName", e.target.value, { shouldValidate: true })}
                placeholder="e.g. POPCATUSDT"
                error={errors.coinName}
              />

              <FormInput
                label="Position Size"
                type="number"
                value={formValues.positionSize || ""}
                onChange={e => setValue("positionSize", e.target.value, { shouldValidate: true })}
                placeholder="e.g. 350000"
                step="1"
                min="0"
                error={errors.positionSize}
                onlyNumeric
              />

              <FormInput
                label="Entry Price"
                type="number"
                value={formValues.entryPrice || ""}
                onChange={e => setValue("entryPrice", e.target.value, { shouldValidate: true })}
                placeholder="e.g. 0.1665"
                step="0.0001"
                min="0"
                error={errors.entryPrice}
                onlyNumeric
              />

              <FormInput
                label="Mark Price"
                type="number"
                value={formValues.markPrice || ""}
                onChange={e => setValue("markPrice", e.target.value, { shouldValidate: true })}
                placeholder="e.g. 0.1856"
                step="0.0001"
                min="0"
                error={errors.markPrice}
                onlyNumeric
              />

              <FormInput
                label="Leverage (x)"
                type="number"
                value={formValues.leverage || ""}
                onChange={e => setValue("leverage", e.target.value, { shouldValidate: true })}
                placeholder="e.g. 10"
                step="1"
                min="0"
                error={errors.leverage}
                onlyNumeric
              />

              <SideToggle side={side} onSideChange={newSide => setValue("side", newSide)} />
            </div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-4 max-w-[500px]">
            <div ref={previewRef}>
              <PreviewCard
                coinName={coinName}
                side={side}
                leverage={leverage}
                pnl={pnl}
                pnlPercent={pnlPercent}
                positionSize={positionSize}
                entryPrice={entryPrice}
                markPrice={markPrice}
              />
            </div>
            <button
              type="button"
              onClick={handleScreenshot}
              className="w-full rounded-lg bg-neutral-800 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Screenshot
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
