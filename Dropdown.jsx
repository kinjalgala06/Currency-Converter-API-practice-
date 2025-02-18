import { HiOutlineStar } from "react-icons/hi";
import { HiStar } from "react-icons/hi";
const CurrencyDropdown=(
  {  currencies,
    currency,
    setcurrency,
    favorites,
    handleFavorite,
    title="",}
)=>{

    const isFavourite=curr=>favorites.includes(curr)

    return(
        <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor={title} >{title} </label>
            <div className="mt-1 relative">
                <select className="w-full p-2 border border-gray-300 bg-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500" value={currency} onChange={(e)=>setcurrency(e.target.value)} >
                    
                    {favorites.map((currency)=>
                        {
                            return(
                                <option className="bg-gray-200" value={currency} key={currency} >{currency} </option>
                            );
                        }
                    )}

                    <hr />
                    {currencies
                    .filter(c=>!favorites.includes(c))
                    .map((currency)=>{
                        return(
                            <option value={currency} key={currency} >{currency} </option>
                        );
                    })}
                </select>
                <button className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5" onClick={()=>handleFavorite(currency)} >
                    {isFavourite(currency)?
                    <HiStar />:<HiOutlineStar />
                }
                </button>
            </div>   
        </div>
    )
}
export default CurrencyDropdown;