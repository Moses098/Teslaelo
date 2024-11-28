import useSWR from 'swr';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useCryptoRates = () => {
  const { data, error, isLoading } = useSWR(
    `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,solana,the-open-network,tether&vs_currencies=usd`,
    fetcher,
    { refreshInterval: 60000 } // Refresh every minute
  );

  const rates = {
    bitcoin: data?.bitcoin?.usd || 0,
    ethereum: data?.ethereum?.usd || 0,
    solana: data?.solana?.usd || 0,
    ton: data?.['the-open-network']?.usd || 0,
    usdt: data?.tether?.usd || 0,
  };

  return { rates, error, isLoading };
};