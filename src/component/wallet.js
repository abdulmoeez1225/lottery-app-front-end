// import detectEthereumProvider from "@metamask/detect-provider";
import { Contract, ethers } from "ethers";
// import Web3 from "web3";

const contractAddress = "0x6e894E7633F8d9faaC4CE6834640fdbeAB3A746f";

const minAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPlayers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "players",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "random",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const connectMetaMaskaction = async () => {
  // Check metamask is install or not
  if (window.ethereum) {
    // await window.ethereum.enable();
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    // window.web3 = new Web3(window.ethereum);

    // const provider = await detectEthereumProvider();
    // if (provider !== window.ethereum) {
    //   // console.log("top provider");
    //   // @ts-ignore
    //   window.web3 = new Web3(window.ethereum);
    // } else {
    // console.log("bottom provider");
    // @ts-ignore

    //window.open("https://support.wwf.org.uk", "_blank");
    // }
    window.ethereum &&
      window.ethereum.request({ method: "eth_chainId" }).then((chainId) => {});
    window.ethereum &&
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        const chainId = window.ethereum.chainId;

        // if (window.ethereum) {

        // }
      });

    window.ethereum &&
      window.ethereum.on("accountsChanged", async (accounts) => {
        window.location.reload();
      });
    window.ethereum &&
      window.ethereum.on("chainChanged", async (chainId) => {
        // console.log("chainChanged............");
      });
    window.ethereum &&
      window.ethereum.on("disconnect", () => {
        window.location.reload();
      });

    const metamaskResult = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // .then(async () => {
    //   const chainId = window.ethereum.chainId;
    //   const accounts = await window.web3.eth.getAccounts();
    //   const balance = await window.web3.eth.getBalance(accounts[0]);
    //   return true;
    // })
    // .catch((error) => {
    //   // console.log("error::::", error);
    //   return false;
    // });
    if (metamaskResult) {
      return true;
    } else {
      return false;
    }
  }
};

export const LotteryContract = async () => {
  // const data = await window.web3.eth.Contract(minAbi, contractAddress);
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  // const provider = new ethers.providers.JsonRpcProvider(rpc);

  const signer = provider.getSigner();
  return await new Contract(contractAddress, minAbi, signer);
};
export const getAccount = async () => {
  return await window.ethereum.request({
    method: "eth_requestAccounts",
  });
};

export const getBalance = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  let provider = new ethers.providers.Web3Provider(window.ethereum);

  let intractWithWeb3 = await LotteryContract();
  const managerAddress = await intractWithWeb3.manager();
  let balance = await provider.getBalance(managerAddress);
  return await ethers.utils.formatEther(balance);
};

export const EnterLottery = async (value) => {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let intractWithWeb3 = await LotteryContract();
  const sendAmount = await intractWithWeb3.enter({
    value: ethers.utils.parseEther(value),
  });
  return sendAmount;
};

export const PickaWinner = async (value) => {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let intractWithWeb3 = await LotteryContract();
  const sendAmount = await intractWithWeb3.pickWinner();
  return sendAmount;
};
