import React, { useState } from 'react';
import CustomSelect from "../../select/Select";
import { Slider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
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


const LeverageLayout = ({ title }) => {
  const [ calStatus, setCalStatus ] = useState(false);
  const [ leverage, setLeverage ] = useState(2);

  const onCalculate = () => {
    setCalStatus(true);
  }

  const handleLeverageChange = (value) => {
    const validValues = [2, 25, 50, 75, 100, 125, 150];
    const closestValue = validValues.reduce((a, b) => {
      return Math.abs(b - value) < Math.abs(a - value) ? b : a;
    });
    setLeverage(closestValue);
  };

  return (
    <div className="container-main w-full flex flex-col gap-8 py-10">
      <div className="w-full">
        <p className="text-black text-lg md:text-2xl font-mainRegular md:text-start text-center">{title}</p>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-8">
        <LeverageBox title="Asset Pair">
          <CustomSelect options={select1} />
          <div className="flex flex-col  gap-5 h-full">
            <p className="text-md text-black font-mainRegular"></p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-[120px,auto] gap-6 items-center">
              <input type="text" defaultValue="100" placeholder="0" className="bg-transparent outline-none text-[46px] md:text-[68px] text-blue font-mainBold"/>
              <CustomSelect options={select2} />
            </div>

            <div className='p-2'>
              <div className='flex justify-between items-center'>
                <p className='text-[18px] font-bold'>Leverage <span className='text-[18px] font-normal'>(2x~150x)</span></p>
                  <input className='w-[100px] text-center py-2 text-[18px] font-bold rounded-[4px]' min={2} max={150} type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)}/>
              </div>
              <div className='mt-4'>
                <Slider
                  defaultValue={0}
                  step={25}
                  graduated
                  progress
                  value={leverage}
                  onChange={handleLeverageChange}
                  min={2}
                  max={152}
                  renderMark={mark => {
                    if ([2, 27, 52, 77, 102, 127, 152].includes(mark)) {
                      return <span>{ mark == 2 ? mark : mark-2}</span>;
                    }
                    return null;
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <button onClick={onCalculate} className="w-full py-2 bg-blue rounded-[6px] text-sm sm:text-base md:text-md text-white font-mainSemibold">
                Calculate
              </button>
              <button className="w-full py-2 bg-blueDark rounded-[6px] text-sm sm:text-base md:text-md text-white font-mainSemibold">
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
            <div className={`${calStatus ? 'flex': 'hidden'} group hover:bg-blueDark bg-white w-full items-center justify-between px-4 py-1 rounded-[6px] transition-all`}>
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  1.9971DA
                </p>
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-success text-sm sm:text-base font-mainRegular">Best</p>
                <p className="text-end group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  $5.0728via KyberSwap
                </p>
              </div>
            </div>
            <div className={`${calStatus ? 'flex': 'hidden'} group hover:bg-blueDark bg-white w-full items-center justify-between px-4 py-1 rounded-[6px] transition-all`}>
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  1.9971DA
                </p>
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-error text-sm sm:text-base font-mainRegular">-123%</p>
                <p className="text-end group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
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
