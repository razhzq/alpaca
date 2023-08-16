/* eslint-disable */ 
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey);

import Dai from '../../../contractABI/DAIcontract.json'
import GMXRouter from '../../../contractABI/GMXRouter.json'
import GMXPositionRouter from '../../../contractABI/GMSPositionRouter.json'
import GNSTrading from '../../../contractABI/GNSTradingContract.json'
import GNSPairABI from '../../../contractABI/GNSPrice.json'


const DaiAddress = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'
const GMXRouterAddress = '0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064'
const GMXPositionAddress = '0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868'
const GNSTradingAddress = '0x5E5BfDA2345218c9Ee92B6d60794Dab5A4706342'
const GNSStorageAddress = '0xcFa6ebD475d89dB04cAd5A756fff1cb2BC5bE33c'
const GNSBTC = '0x6ce185860a4963106506C203335A2910413708e9'
const GNSETH = '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612'
const GNSLINK = '0x86E53CF1B870786351Da77A57575e79CB55812CB'
const GNSUNI = '0x9C917083fDb403ab5ADbEC26Ee294f6EcAda2720'


export const DaiContract = new web3.eth.Contract(
    Dai,
    DaiAddress
)

export const GmxRouterContract = new web3.eth.Contract(
    GMXRouter,
    GMXRouterAddress
)

export const GMXPositionContract = new web3.eth.Contract(
    GMXPositionRouter,
    GMXPositionAddress
)

export const GNSTradingContract = new web3.eth.Contract(
    GNSTrading,
    GNSTradingAddress
)

export const BTCPair = new web3.eth.Contract(
    GNSPairABI,
    GNSBTC
)

export const ETHPair = new web3.eth.Contract(
    GNSPairABI,
    GNSETH
)

export const LINKPair = new web3.eth.Contract(
    GNSPairABI,
    GNSLINK
)

export const UNIPair = new web3.eth.Contract(
    GNSPairABI,
    GNSUNI
)