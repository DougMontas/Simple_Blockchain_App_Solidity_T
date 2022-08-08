import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function App() {

  const [greet, setGreet] = useState("")
  const [balance, setBalance] = useState("")
  const [greetingValue, setGreetingValue] = useState("")
  const [depositValue, setDepositValue] = useState("")

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3" //contract address
  // const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" //meta-mask wallet address
  

  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const contract = new ethers.Contract(contractAddress, ABI, signer)

  
  useEffect (() => {
    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);
    }
    const getBalance = async () => {
      // Get the balance of an account (by address or ENS name, if supported by network)
      const balance = await provider.getBalance(contractAddress) 
      const balanceFormatted = ethers.utils.formatEther(balance)
      setBalance(balanceFormatted);
    }
      const getGreeting = async () => {
        const greeting = await contract.greet();
        setGreet(greeting);
    }

    connectWallet() 
      .catch(console.error);

    getBalance()
      .catch(console.error);

    getGreeting()
      .catch(console.error);
  })
  

  const handleDepositChange = (e) => {
    setDepositValue(e.target.value);
    // console.log(depositValue)
    
  }

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    const ethValue = ethers.utils.parseEther(depositValue);
    const depositEth = await contract.deposit({value: ethValue});
    await depositEth.wait();
    const balance = await provider.getBalance(contractAddress)
    const balanceFormatted = ethers.utils.formatEther(balance)
    setBalance(balanceFormatted);
    setDepositValue(0);
  }


  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value);
    // console.log(greetingValue)

  }

  const handleGreetingSubmit = async (e) => {
    e.preventDefault()
    const greetingUpdate = await contract.setGreeting(greetingValue)
    await greetingUpdate.wait()
    setGreet(greetingValue)
    setGreetingValue('')
  }

  console.log("balance", balance)
  console.log('greetingValue', greetingValue)
  console.log("greet", greet)
  console.log("depositValue", depositValue)
  console.log("contractAddress", contractAddress)
  // console.log("getBalance", getBalance)

  return (
    <div className="container">
      <div className="container">
        <div className="row">
          <div className="col mt-5" >
            <h3>{greet}</h3>
            <p>Contract Balance:{balance} ETH</p>
          </div>
          <div className="col">

            <form className="mt-5" onSubmit={handleDepositSubmit}>
              <div className="mb-3">
        
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  onChange={handleDepositChange} value={depositValue}
                />
               </div>
              <button type="submit" className="btn btn-success">
                Deposit
              </button>
            </form>
            <form className="mt-5" onSubmit={handleGreetingSubmit}>
              <div className="mb-3">
        
                <input
                  type="numbtexter"
                  className="form-control"
                  onChange={handleGreetingChange} value={greetingValue}
                />
               </div>
              <button type="submit" className="btn btn-dark">
                Change
              </button>

              
            </form>


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
