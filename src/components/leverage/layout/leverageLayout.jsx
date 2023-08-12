import CustomSelect from "../../select/Select";
import LeverageBox from "./leverageBox";

const select1 = [
  { value: "BTC/USD", label: "BTC/USD" },
  { value: "BTC", label: "Bitcoin(BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "BNB", label: "Tether (USDT)" },
  { value: "USDC", label: "USD Coin (USDC)" },
  { value: "XPR", label: "XRP (XRP)" },
  { value: "ADA", label: "Cardano (ADA)" },
  { value: "MATIC", label: "Polygon (MATIC)" },
];
const select2 = [
  { value: "long", label: "Long" },
  { value: "short", label: "Short" },
];

function LeverageLayout({ title }) {
  return (
    <div className="container-main w-full flex flex-col gap-8 py-10">
      <div className="w-full">
        <p className="text-black text-2xl font-mainRegular">{title}</p>
      </div>
      <div className="w-full grid grid-cols-2 gap-8">
        <LeverageBox title="Asset Pair">
          <CustomSelect options={select1} />
          <div className="flex flex-col  gap-5 h-full">
            <p className="text-md text-black font-mainRegular"></p>
            <div className="w-full grid grid-cols-[120px,auto] gap-6 items-center">
              <p className="text-[68px] text-blue font-mainBold">100</p>
              <CustomSelect options={select2} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <button className="w-full py-1 bg-blue rounded-[6px] text-md text-white font-mainSemibold">
                Calculate
              </button>
              <button className="w-full py-1 bg-blueDark rounded-[6px] text-md text-white font-mainSemibold">
                Connect Wallet
              </button>
            </div>
          </div>
        </LeverageBox>
        <LeverageBox
          title="Select a route to perform a swap"
          subTitle="Best route is selected based on net output after the gas fees."
        >
          <div className="w-full flex flex-col gap-[16px]">
            <div className="group hover:bg-blueDark bg-white w-full flex items-center justify-between px-4 py-1 rounded-[6px] transition-all">
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  1.9971DA
                </p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-success text-base font-mainRegular">Best</p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  $5.0728via KyberSwap
                </p>
              </div>
            </div>
            <div className="group hover:bg-blueDark bg-white w-full flex items-center justify-between px-4 py-1 rounded-[6px] transition-all">
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  1.9971DA
                </p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-error text-base font-mainRegular">-123%</p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  $5.0728via KyberSwap
                </p>
              </div>
            </div>
            <div className="group hover:bg-blueDark bg-white w-full flex items-center justify-between px-4 py-1 rounded-[6px] transition-all">
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  1.9971DA
                </p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-success text-base font-mainRegular">Best</p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  $5.0728via KyberSwap
                </p>
              </div>
            </div>
            <div className="group hover:bg-blueDark bg-white w-full flex items-center justify-between px-4 py-1 rounded-[6px] transition-all">
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  1.9971DA
                </p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-error text-base font-mainRegular">-123%</p>
                <p className="group-hover:text-white transition-all text-black text-base font-mainRegular">
                  $5.0728via KyberSwap
                </p>
              </div>
            </div>
          </div>
        </LeverageBox>
      </div>
    </div>
  );
}
export default LeverageLayout;
