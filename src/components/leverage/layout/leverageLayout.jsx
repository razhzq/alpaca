/* eslint-disable */

import React, { useEffect, useState } from "react";
import CustomSelect from "../../select/Select";
import { Slider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import LeverageBox from "./leverageBox";
import axios from "axios";
import Web3 from "web3";

import Dai from "../../../contractABI/DAIcontract.json";
import GMXRouter from "../../../contractABI/GMXRouter.json";
import GMXPositionRouter from "../../../contractABI/GMSPositionRouter.json";
import GNSTrading from "../../../contractABI/GNSTradingContract.json";
import GNSPairABI from "../../../contractABI/GNSPrice.json";

const DaiAddress = "0x04B2A6E51272c82932ecaB31A5Ab5aC32AE168C3"; //'0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'
const GMXRouterAddress = "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064";
const GMXPositionAddress = "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868";
const GNSTradingAddress = "0x5E5BfDA2345218c9Ee92B6d60794Dab5A4706342"; //'0x5E5BfDA2345218c9Ee92B6d60794Dab5A4706342'
const GNSStorageAddress = "0xcFa6ebD475d89dB04cAd5A756fff1cb2BC5bE33c"; //'0xcFa6ebD475d89dB04cAd5A756fff1cb2BC5bE33c'
const GNSBTC = "0x6ce185860a4963106506C203335A2910413708e9"; //'0x6ce185860a4963106506C203335A2910413708e9'
const GNSETH = "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612";
const GNSLINK = "0x86E53CF1B870786351Da77A57575e79CB55812CB";
const GNSUNI = "0x9C917083fDb403ab5ADbEC26Ee294f6EcAda2720";

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const select1 = [
  { value: "BTC/USD", label: "BTC/USD" },
  { value: "ETH/USD", label: "ETH/USD" },
  { value: "LINK/USD", label: "LINK/USD" },
  { value: "UNI/USD", label: "UNI/USD" },
];
const select2 = [
  { value: true, label: "Long" },
  { value: false, label: "Short" },
];

const LeverageLayout = ({ title }) => {
  const [calStatus, setCalStatus] = useState(false);
  const [leverage, setLeverage] = useState(2);
  const [address, setAddress] = useState("");
  const [asset, setAsset] = useState("");
  const [gmxPrice, setGmxPrice] = useState(0);
  const [gnsPrice, setGnsPrice] = useState(0);
  const [orderType, setOrderType] = useState("");
  const [isLong, setIsLong] = useState(true);
  const [daiContract, setDaiContract] = useState({});
  const [gmxRouterContract, setGMXRouterContract] = useState({});
  const [gmxPositionRouterContract, setGmxPosContract] = useState({});
  const [gnsTradingContract, setGnsTrading] = useState({});
  const [gnsBTC, setGnsBTC] = useState({});
  const [gnsETH, setGnsETH] = useState({});
  const [gnsLINK, setGnsLINK] = useState({});
  const [gnsUNI, setGnsUNI] = useState({});
  const [gmxBest, setGmxBest] = useState(false);
  const [priceDiffPercent, setPriceDiffPercent] = useState();
  const [collateral, setCollateral] = useState();
  const [pairIndex, setPairIndex] = useState();
  const [pairGMXAddress, setPairGMXAddress] = useState("");

  const [price, setPrice] = useState();

  const onCalculate = () => {
    setCalStatus(true);
  };

  useEffect(() => {
    const fetchGMXPrice = async () => {
      let response;
      try {
        response = await axios.get("https://api.gmx.io/prices");
        setPrice(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchGMXPrice();
  }, []);

  const handleLeverageChange = (value) => {
    const validValues = [2, 25, 50, 75, 100, 125, 150];
    const closestValue = validValues.reduce((a, b) => {
      return Math.abs(b - value) < Math.abs(a - value) ? b : a;
    });
    setLeverage(closestValue);
  };

  const comparePrice = (gns, gmx, isLong) => {
    let difference;
    let gmxConv = gmx / 10 ** 30;
    console.log(`orderss`, isLong);
    if (isLong === false) {
      if (gns > gmxConv) {
        setGmxBest(false);
        difference = ((gmxConv - gns) / gmxConv) * 100;
        setPriceDiffPercent(difference);
        console.log(difference);
      } else {
        setGmxBest(true);
        difference = ((gns - gmxConv) / gmxConv) * 100;
        setPriceDiffPercent(difference);
        console.log(difference);
      }
    } else if (isLong === true) {
      if (gns < gmxConv) {
        setGmxBest(false);
        difference = ((gmxConv - gns) / gmxConv) * 100;
        setPriceDiffPercent(difference);
        console.log(difference);
      } else {
        setGmxBest(true);
        difference = ((gns - gmxConv) / gmxConv) * 100;
        setPriceDiffPercent(difference);
        console.log(difference);
      }
    }

    console.log("difference =>", difference);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);

      // await window.ethereum.enable()

      const account = await web3.eth.getAccounts();
      console.log("account", account);
      const walletAddress = account[0];

      console.log(gnsBTC);
      setAddress(walletAddress);
      if (window.ethereum.networkVersion !== 42161) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(42161) }],
          });
        } catch (err) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: "Arbitrum One",
                  chainId: Web3.utils.toHex(42161),
                  nativeCurrency: {
                    name: "ETH",
                    decimals: 18,
                    symbol: "MATIC",
                  },
                  rpcUrls: ["https://rpc.arb1.arbitrum.gateway.fm"],
                },
              ],
            });
          }
        }
      }
      // loadContract()
      console.log(account);
    } else {
      console.log("no wallet");
    }
  };

  const getGMXPrice = async (asset) => {
    try {
      switch (asset) {
        case "BTC/USD":
          setGmxPrice(price["0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f"]);
          setPairGMXAddress("0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f");
          break;
        case "ETH/USD":
          setGmxPrice(price["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"]);
          setPairGMXAddress("0x82aF49447D8a07e3bd95BD0d56f35241523fBab1");
          break;
        case "LINK/USD":
          setGmxPrice(price["0xf97f4df75117a78c1A5a0DBb814Af92458539FB4"]);
          setPairGMXAddress("0xf97f4df75117a78c1A5a0DBb814Af92458539FB4");
          break;
        case "UNI/USD":
          setGmxPrice(price["0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0"]);
          setPairGMXAddress("0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0");
          break;
        default:
          setGmxPrice(0);
      }
      console.log("gmxPrice--->", gmxPrice);
      // return gmxPrice
    } catch (error) {
      console.log(error);
    }
  };

  const getGNSPrice = async (asset) => {
    let price;
    let priceBig;
    let convPrice;
    try {
      switch (asset) {
        case "BTC/USD":
          price = await gnsBTC.methods.latestAnswer().call();
          convPrice = BigInt(price) / BigInt(10 ** 8);
          setGnsPrice(convPrice.toString());
          setPairIndex(0);
          break;
        case "ETH/USD":
          price = await gnsETH.methods.latestAnswer().call();
          convPrice = BigInt(price) / BigInt(10 ** 8);
          setGnsPrice(convPrice.toString());
          setPairIndex(1);

          break;
        case "LINK/USD":
          price = await gnsLINK.methods.latestAnswer().call();
          convPrice = BigInt(price) / BigInt(10 ** 8);
          setGnsPrice(convPrice.toString());
          setPairIndex(2);
          break;
        case "UNI/USD":
          price = await gnsUNI.methods.latestAnswer().call();
          convPrice = BigInt(price) / BigInt(10 ** 8);
          setGnsPrice(convPrice.toString());
          setPairIndex(17);
          break;
        default:
          setGnsPrice(0);
      }
      // return gnsPrice;
    } catch (error) {
      console.log(error);
    }
    comparePrice(gnsPrice, gmxPrice, isLong);
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else if (window.innerWidth > 720 && !window.web3) {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadContract = async () => {
    // window.web3 = new Web3(window.web3.currentProvider)
    const web3 = window.web3;

    const dai = new web3.eth.Contract(Dai, DaiAddress);
    setDaiContract(dai);
    const gmxRoute = new web3.eth.Contract(GMXRouter, GMXRouterAddress);
    setGMXRouterContract(gmxRoute);
    const gmxPos = new web3.eth.Contract(GMXPositionRouter, GMXPositionAddress);
    setGmxPosContract(gmxPos);
    const gns = new web3.eth.Contract(GNSTrading, GNSTradingAddress);
    setGnsTrading(gns);

    const btc = new web3.eth.Contract(GNSPairABI, GNSBTC);
    setGnsBTC(btc);
    const eth = new web3.eth.Contract(GNSPairABI, GNSETH);
    setGnsETH(eth);
    const link = new web3.eth.Contract(GNSPairABI, GNSLINK);
    setGnsLINK(link);
    const uni = new web3.eth.Contract(GNSPairABI, GNSUNI);
    setGnsUNI(uni);
    // console.log(daiContract)
    // console.log('gnsbtc:', gnsBTC)
  };

  const openTradeGMX = async () => {
    let collateralConv = collateral * 10 ** 18;
    let gmxConv = gmxPrice / 10 ** 30;
    let slippage = (gmxConv * 1.5) / 100;

    let acceptablePrice = 0;

    if (isLong == true) {
      acceptablePrice = gmxConv + slippage;
    } else {
      acceptablePrice = gmxConv - slippage;
    }

    const contractPrice = acceptablePrice * 10 ** 30;

    const sizeDelta = collateral * leverage * 10 ** 30;

    try {
      await daiContract.methods
        .approve(GMXPositionAddress, BigInt(collateralConv))
        .send({
          from: address,
          gasLimit: "5000000",
          transactionBlockTimeout: 200,
        })
        .on("transactionHash", (hash) => {
          gmxRouterContract.methods
            .approvePlugin(GMXPositionAddress)
            .send({
              from: address,
              gasLimit: "5000000",
              transactionBlockTimeout: 200,
            })
            .on("transactionHash", (hash) => {
              gmxPositionRouterContract.methods
                .createIncreasePosition(
                  [DaiAddress],
                  pairGMXAddress,
                  BigInt(collateralConv),
                  0,
                  BigInt(sizeDelta),
                  isLong,
                  BigInt(contractPrice),
                  BigInt(180000000000000),
                  "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "0x0000000000000000000000000000000000000000"
                )
                .send({
                  from: address,
                  gasLimit: "5000000",
                  transactionBlockTimeout: 200,
                });
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const openTradeGNS = async () => {
    let collateralConv = collateral * 10 ** 18;
    let gnsOpenWithSlippage = Math.floor(gnsPrice * 1.0005 + 0.5);
    let gnsOpenPrice = gnsOpenWithSlippage * 10 ** 10;
    //  console.log('collateral conversion:', collateralConv)
    //  console.log('open price gns:', gnsOpenPrice)
    //  console.log('collateral:', Number.isInteger(collateralConv))
    //  console.log('openpriceint:', Number.isInteger(gnsOpenPrice))
    const tp = gnsPrice + 0.01 * gnsPrice * (15 / leverage);
    const tpConv = tp * 10 ** 10;
    let tradeTuple = {
      trader: address,
      pairIndex: pairIndex,
      index: 0, //tradeIndex
      initialPosToken: 0,
      positionSizeDai: BigInt(collateralConv), // collateral in 1e18
      openPrice: BigInt(gnsOpenPrice),
      buy: isLong,
      leverage: leverage, //leverage adjustable by slider on frontend
      tp: BigInt(tpConv),
      sl: 0,
    };

    //  console.log(`tradettuple `, tradeTuple)
    try {
      await daiContract.methods
        .approve(GNSStorageAddress, BigInt(collateralConv))
        .send({
          from: address,
          gasLimit: "5000000",
          transactionBlockTimeout: 200,
        })
        .on("transactionHash", (hash) => {
          gnsTradingContract.methods
            .openTrade(
              tradeTuple,
              0,
              0,
              "12492725505",
              "0x0000000000000000000000000000000000000000"
            )
            .send({
              from: address,
              gasLimit: "5000000",
              transactionBlockTimeout: 200,
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCalculate = async () => {
    onCalculate();
    getGNSPrice(asset);
    comparePrice(gnsPrice, gmxPrice, isLong);
  };

  useEffect(() => {
    if (address) {
      loadContract();
    }
    // loadContract()
  }, [address]);

  const handleIsLong = (e) => {
    getGMXPrice(asset);
  };
  return (
    <div className="container-main w-full flex flex-col gap-8 py-10">
      <div className="w-full">
        <p className="text-black text-lg md:text-2xl font-mainRegular md:text-start text-center">
          {title}
        </p>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-8">
        <LeverageBox title="Asset Pair">
          <CustomSelect onPairChange={setAsset} options={select1} />
          <div className="flex flex-col  gap-5 h-full">
            <p className="text-md text-black font-mainRegular"></p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-[120px,auto] gap-6 items-center">
              <input
                type="number"
                defaultValue="0"
                placeholder="0"
                className="bg-transparent outline-none text-[46px] md:text-[68px] text-blue font-mainBold"
                onChange={(e) => setCollateral(e.target.value)}
              />
              <CustomSelect
                onPairChange={(e) => handleIsLong(e)}
                options={select2}
              />
            </div>

            <div className="p-2">
              <div className="flex justify-between items-center">
                <p className="text-[18px] font-bold">
                  Leverage{" "}
                  <span className="text-[18px] font-normal">(2x~150x)</span>
                </p>
                <input
                  className="w-[100px] text-center py-2 text-[18px] font-bold rounded-[4px]"
                  min={2}
                  max={150}
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Slider
                  defaultValue={0}
                  step={25}
                  graduated
                  progress
                  value={leverage}
                  onChange={handleLeverageChange}
                  min={2}
                  max={152}
                  renderMark={(mark) => {
                    if ([2, 27, 52, 77, 102, 127, 152].includes(mark)) {
                      return <span>{mark == 2 ? mark : mark - 2}</span>;
                    }
                    return null;
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={handleCalculate}
                className="w-full py-2 bg-blue rounded-[6px] text-sm sm:text-base md:text-md text-white font-mainSemibold"
              >
                Calculate
              </button>
              <button
                onClick={() => connectWallet()}
                className="w-full py-2 bg-blueDark rounded-[6px] text-sm sm:text-base md:text-md text-white font-mainSemibold"
              >
                {address ? <div>{address}</div> : <div>Connect Wallet</div>}
              </button>
            </div>
          </div>
        </LeverageBox>
        <LeverageBox
          title="Select a route to perform a swap"
          subTitle="Best route is selected based on net output after the gas fees."
        >
          <div className="w-full flex flex-col gap-[16px]">
            <div
              onClick={() => openTradeGMX()}
              className={`${
                calStatus ? "flex" : "hidden"
              } group hover:bg-blueDark bg-white w-full items-center justify-between px-4 py-1 rounded-[6px] transition-all`}
            >
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  {gmxPrice / 10 ** 30}
                </p>
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {gmxBest ? (
                  <p className="text-success text-sm sm:text-base font-mainRegular">
                    Best
                  </p>
                ) : (
                  <p className="text-error text-sm sm:text-base font-mainRegular">
                    {priceDiffPercent}%
                  </p>
                )}
                {/* <p className="text-success text-sm sm:text-base font-mainRegular">
                  Best
                </p> */}
                <p className="text-end group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  via GMX
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                openTradeGNS();
              }}
              className={`${
                calStatus ? "flex" : "hidden"
              } group hover:bg-blueDark bg-white w-full items-center justify-between px-4 py-1 rounded-[6px] transition-all`}
            >
              <div className="flex flex-col gap-1">
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  {gnsPrice}
                </p>
                <p className="group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  ≥ $-0.7 after fees
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {gmxBest ? (
                  <p className="text-error text-sm sm:text-base font-mainRegular">
                    {priceDiffPercent}%
                  </p>
                ) : (
                  <p className="text-success text-sm sm:text-base font-mainRegular">
                    Best
                  </p>
                )}
                <p className="text-end group-hover:text-white transition-all text-black text-sm sm:text-base font-mainRegular">
                  via gains.trade
                </p>
              </div>
            </div>
          </div>
        </LeverageBox>
      </div>
    </div>
  );
};
export default LeverageLayout;
