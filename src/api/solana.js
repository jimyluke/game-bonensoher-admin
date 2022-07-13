import request from '@/utils/request'

class SolanaApi {

  updateSettings(settings){
    return request({
      url: '/solana/update-settings',
      method: 'post',
      data: {
        settings: settings,
        timestamp: new Date().getTime()
      }
    })
  }

  generateWallet(){
    return request({
      url: '/solana/generate-wallet',
      method: 'post'
    })
  }

  loadWallets(){
    return request({
      url: '/solana/load-wallets',
      method: 'get'
    })
  }

  getBalanceWallets(){
    return request({
      url: '/solana/get-balance-wallets',
      method: 'get'
    })
  }

  setPrimaryWallet(data){
    return request({
      url: '/solana/set-primary-wallet',
      method: 'post',
      data
    })
  }

  checkWalletInfo(data){
    return request({
      url: '/solana/check-wallet-info',
      method: 'post',
      data
    })
  }

  addWallet(data){
    return request({
      url: '/solana/add-wallet',
      method: 'post',
      data
    })
  }
}

const Solana = new SolanaApi()
export { Solana as default }
