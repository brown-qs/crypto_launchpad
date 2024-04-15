import tokens from './tokens';

export const PoolCategory = {
    CORE: 'Core',
    COMMUNITY: 'Community',
    BINANCE: 'Binance',
    AUTO: 'Auto'
};

const pools = [
  // {
  //   sousId: 0,
  //   stakingToken: tokens.bris,
  //   earningToken: tokens.bris,
  //   contractAddress: {
  //     97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
  //     56: '0xbe69572b574165658251e19469Ec47AF26AC508F',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
  // {
  //   sousId: 3,
  //   stakingToken: tokens.cake,
  //   earningToken: tokens.oddz,
  //   contractAddress: {
  //     97: '',
  //     56: '0x44d1f81e80e43e935d66d65874354ef91e5e49f6',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   sortOrder: 999,
  //   tokenPerBlock: '0.4843',
  // },
  {
    sousId: 3,
    stakingToken: tokens.bpad,
    earningToken: tokens.wbrise,
    contractAddress: {
      97: '',
      56: '',
      32520: '0x294037a277FF365500efFD7a5f84d119F88C408a'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: true,
    sortOrder: 999,
    tokenPerBlock: '100000',
  },
  {
    sousId: 4,
    stakingToken: tokens.bpad,
    earningToken: tokens.vef,
    contractAddress: {
      97: '',
      56: '',
      32520: '0x29DFcB5a2aBAe05D9B0c802Cd1E585dADb51E6F6'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: true,
    sortOrder: 99,
    tokenPerBlock: '69',
  },
  {
    sousId: 5,
    stakingToken: tokens.vef,
    earningToken: tokens.bpad,
    contractAddress: {
      97: '',
      56: '',
      32520: '0xDe4339F4d002840FA3Aa558337a730Be3cF5F8B0'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: true,
    sortOrder: 97,
    tokenPerBlock: '12',
  },
  {
    sousId: 6,
    stakingToken: tokens.bpad,
    earningToken: tokens.vef,
    contractAddress: {
      97: '',
      56: '',
      32520: '0x6E3e836c5B39B83dA53EF5758B47c8dF83E69af5'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: false,
    sortOrder: 99,
    tokenPerBlock: '69',
  },
  {
    sousId: 7,
    stakingToken: tokens.vef,
    earningToken: tokens.bpad,
    contractAddress: {
      97: '',
      56: '',
      32520: '0x153771be4C0B50648De7B4734adFd6A7C740ED73'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: false,
    sortOrder: 97,
    tokenPerBlock: '12',
  },
  {
    sousId: 8,
    stakingToken: tokens.bpad,
    earningToken: tokens.wbrise,
    contractAddress: {
      97: '',
      56: '',
      32520: '0x73776f95Deb907436d8A852C551D0eBb7480E5c3'
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    isFinished: false,
    sortOrder: 97,
    tokenPerBlock: '150000 ',
  }
  // {
  //   sousId: 4,
  //   stakingToken: tokens.cos,
  //   earningToken: tokens.ktn,
  //   contractAddress: {
  //     97: '',
  //     56: '0x48852322a185dc5fc733ff8c8d7c6dcbd2b3b2a2',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   sortOrder: 999,
  //   tokenPerBlock: '0.01215',
  // },

]

export default pools
