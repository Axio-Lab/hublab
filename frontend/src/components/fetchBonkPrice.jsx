"use client";

import axios from "axios";
const bonkAddress = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"


export const fetchBonkPrice = async () => {
const apiUrl = 'https://api.coingecko.com/api/v3/simple/token_price/solana';
const contractAddress = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';
const vsCurrency = 'usd';

const headers = {
  accept: 'application/json', 
  'x-cg-demo-api-key': 'CG-Y7mEFovJHTRuet9ePMUeho9M'
}

try {
  const response = await axios.get(apiUrl, {
    params: {
      contract_addresses: contractAddress,
      vs_currencies: vsCurrency
    },
    headers: headers
  });

  if(response.status === 200){
    return response.data[bonkAddress].usd
  }
  else (
    console.log("Error fetching bonk price")
  )
  
} catch (error) {
  console.error('Error fetching Bonk price:', error);
  return null;
}
};

