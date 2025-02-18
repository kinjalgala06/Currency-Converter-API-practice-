
import { useEffect } from "react";
import { useState } from "react";
import CurrencyDropdown from "./Dropdown.jsx";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvert=()=> {
    const[currencies,setCurrencies]=useState([])
    const[amount,setAmount]=useState(1)

    const[fromCurrency,setFromCurrency]=useState("USD")
    const[toCurrency,setToCurrency]=useState("INR")

    const[convertedAmount,setConvertedAmount]=useState(null)
    const[converting,setConverting]=useState(false)

    const[favorites,setFavourites]=useState(JSON.parse(localStorage.getItem('favourites'))|| ['INR','EUR']);

    // https://api.frankfurter.app/currencies
    const fetchCurrencies=async()=>{
        try{
            const res=await fetch("https://api.frankfurter.app/currencies")
            const data=await res.json();

            setCurrencies(Object.keys(data))
        }catch(error){
            console.log("Error Fetching",error);
            
        }
    }

    useEffect(()=>{
        fetchCurrencies();
    },[])

    console.log(currencies);

       // https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}
    const convertCurrency=async()=>{
        if(!amount)return;
        setConverting(true)
        try{
            const res=await fetch(`
               https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            const data=await res.json();

            setConvertedAmount(data.rates[toCurrency]+" "+toCurrency)
        }catch(error){
            console.log("Error Fetching",error);
            
        }finally{
            setConverting(false)
        }
    }

    const handleFavorite=(currency)=>{
        let updateFavourites=[...favorites];
        if(favorites.includes(currency)){
            updateFavourites=updateFavourites.filter((fav)=>fav!==currency)
        }else{
            updateFavourites.push(currency);
        }
        setFavourites(updateFavourites)
        localStorage.setItem('favourites',JSON.stringify(updateFavourites))
    }

    const swapCurrencies=(currency)=>{
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }
    
    // https://api.frankfurter.app/latest?from=USD&to=INR
        
      
    return(
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
            <h2 className="mb-5 text-2x1 font-semibold text-gray-700">CurrencyConvertor</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <CurrencyDropdown currencies={currencies} 
                favorites={favorites}
                title="From:" 
                currency={fromCurrency}
                setcurrency={setFromCurrency}
                handleFavorite={handleFavorite}/>

                {/* swap Currency button */}
                
                <div className="flex justify-center -mb-5 sm:mb-0">
                    <button className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" onClick={swapCurrencies}>
                        <HiArrowsRightLeft className="text-xl text-gray-700"/>
                    </button>
                </div>

                <CurrencyDropdown currencies={currencies} 
                favorites={favorites}
                title="To:" 
                currency={toCurrency}
                setcurrency={setToCurrency}
                handleFavorite={handleFavorite}/>
            </div>
            <div className="mt-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
                <input value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" 
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"/>
            </div>
            <div className="flex justify-end mt-6">
                <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting?"animate-pulse":""}`}>Convert</button>
                {/* <button onClick={convertCurrency} className={`${converting}? "":"" `} > Convert:</button> */}
            </div>
            {convertedAmount &&(<div className="mt-4 text-lg font-medium text-right text-green-600">
                Converted Amount:{convertedAmount}
            </div>)}
        </div>
    )
};
export default CurrencyConvert;