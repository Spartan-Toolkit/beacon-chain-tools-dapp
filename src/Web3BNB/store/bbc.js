import { createSlice } from "@reduxjs/toolkit";
import { getChainIdLS, getWalletTypeLS } from "../utils/network";

const initialState = {
  error: null,
  chainId: getChainIdLS(), // ie. "bbc-mainnet" || "bbc-testnet" || "bsc-mainnet" || "bsc-testnet"
  walletType: getWalletTypeLS(), // ie. "BW" || "MM" || "WC" --- (aka. BinanceWallet, MetaMask, WalletConnect)
  addrArray: undefined, // Array of all addresses derived from selected wallet
  address: undefined, // User's selected wallet address
  balances: undefined, // User's array of each token with a balance held
};

const debug = true;

export const bbcSlice = createSlice({
  name: "bbc",
  initialState,
  reducers: {
    updateError: (state, action) => {
      debug && console.log("Debug:", action.payload);
      state.error = action.payload;
    },
    updateChainId: (state, action) => {
      state.chainId = action.payload;
      window.localStorage.setItem("sptk_chainId", action.payload);
    },
    updateWalletType: (state, action) => {
      state.walletType = action.payload;
      window.localStorage.setItem("sptk_walletType", action.payload);
    },
    updateAddrArray: (state, action) => {
      state.addrArray = action.payload;
      // No local storage management required
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
      window.localStorage.setItem("sptk_address", action.payload);
    },
    updateBalances: (state, action) => {
      state.balances = action.payload;
      // No local storage management required
    },
    clearWallet: (state) => {
      state.walletType = undefined;
      state.address = undefined;
      window.localStorage.removeItem("sptk_walletType");
      window.localStorage.removeItem("sptk_address");
    },
  },
});

export const {
  updateError,
  updateChainId,
  updateWalletType,
  updateAddrArray,
  updateAddress,
  updateBalances,
  clearWallet,
} = bbcSlice.actions;

export default bbcSlice.reducer;
