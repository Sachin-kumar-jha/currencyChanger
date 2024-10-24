
import { useEffect, useState} from "react"
import {InputBox} from "./components";
import useCurrencyInfo from "./hooks/useCurrencyinfo"
function App() {
  const [amount,setAmount]=useState(0);
  const [from,setFrom]=useState("usd");
  const [to,setTo]=useState("inr");
  const [convertedAmount,setConvertedAmount]=useState(0);
  
const currencyInfo=useCurrencyInfo(from)
  const options=Object.keys(currencyInfo)

  const swap=()=>{
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(Math.trunc(convertedAmount))
  }

const convert=()=>{
  setConvertedAmount(amount*currencyInfo[to]);
}

const setDefault=()=>{
    if(convert){
        setTo(to);
    }
}
useEffect(()=>{
setDefault()
},[]);

return (
  <div
      className="w-full h-screen flex flex-wrap justify-center items-center  bg-cover bg-no-repeat"
      style={{
          backgroundImage:'url("/bg.jpg")',
      }}
  >
      <div className="w-full">
          <div className="w-full flex flex-col max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <h1 className="text-3xl text-center py-2 font-semibold text-black ">Made By Sachin!</h1>
              <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      convert();
                  }}
              >
                  <div className="w-full mb-1">
                      <InputBox
                          label="from"
                          amount={amount} 
                          currencyOptions={options}
                          selectedCurrency={from}
                          onCurrencyChange={(currency) =>setFrom(currency)}
                          onAmountChange={(amount)=>setAmount(amount)}
                          />
                  </div>
                  <div className="relative w-full h-0.5">
                      <button
                          type="button"
                          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                          onClick={swap}
                      >
                          swap
                      </button>
                  </div>
                  <div className="w-full mt-1 mb-4">
                      <InputBox
                          label="to"
                          amount={convertedAmount}
                          currencyOptions={options}
                          onCurrencyChange={(currency)=>
                            setTo(currency)
                          }
                          selectedCurrency={to}
                          amountDisable
                      />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                      Convert {from.toUpperCase()} to {to.toUpperCase()}
                  </button>
              </form>
          </div>
      </div>
  </div>
);
}

export default App
