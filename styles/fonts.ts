import localFont from 'next/font/local';

const CoinbaseMono = localFont({
  src: [
    {
      path: '../assets/CoinbaseFont/Coinbase-Mono/Coinbase_Mono-Light-web.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Mono/Coinbase_Mono-Regular-web.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Mono/Coinbase_Mono-Medium-web.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Mono/Coinbase_Mono-Bold-web.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const CoinbaseSans = localFont({
  src: [
    {
      path: '../assets/CoinbaseFont/Coinbase-Sans/Coinbase_Sans-Light-web-1.32.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Sans/Coinbase_Sans-Regular-web-1.32.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Sans/Coinbase_Sans-Medium-web-1.32.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Sans/Coinbase_Sans-Regular-web-1.32.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const CoinbaseText = localFont({
  src: [
    {
      path: '../assets/CoinbaseFont/Coinbase-Text/Coinbase_Text-Extra_Light-web-1.32.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Text/Coinbase_Text-Light-web-1.32.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Text/Coinbase_Text-Regular-web-1.32.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Text/Coinbase_Text-Medium-web-1.32.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/CoinbaseFont/Coinbase-Text/Coinbase_Text-Bold-web-1.32.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export { CoinbaseMono, CoinbaseSans, CoinbaseText };
