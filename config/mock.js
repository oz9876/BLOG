module.exports = {
    // 获取游戏详情
    'POST::/web/game/getGameDetail.json': 'mock::/web/game/getGameDetail.json',
    // 获取ios安装包
    'ALL::/web/game/getIOSAppPkgUrl.json':  'mock::/web/game/getIOSAppPkgUrl.json',
    // 获取ios安装包
    'ALL::/web/game/checkChannelId.json':  'mock::/web/game/checkChannelId.json',
    // 获取游戏安装包
    'ALL::/web/game/getGameDownloadUrl.json':  'mock::/web/game/getGameDownloadUrl.json',
    // 获取热门游戏
    'ALL::/web/game/listHotGame.json':  'mock::/web/game/listHotGame.json',
    // 获取小写列表
    'ALL::/web/message/listMessagesByUid.json':  'mock::/web/message/listMessagesByUid.json',
    // 获取订单消息详情
    'ALL::/web/message/getCatPointTradeFlow.json':  'mock::/web/message/getCatPointTradeFlow.json',
    // 判断是搜需要预注册
    'ALL::/web/game/isPreRegister.json':  'mock::/web/game/isPreRegister.json',
    // 发送验证码
    'ALL::/web/user/sendPrebindVcode.json':  'mock::/web/user/sendPrebindVcode.json',
    // 预注册
    'ALL::/web/user/prebind.json':  'mock::/web/user/prebind.json',
    // 元旦活动-是否有抽奖机会
    'ALL::/web/raffle/hasRaffleChance.json':  'mock::/web/raffle/hasRaffleChance.json',
    // 元旦活动-抽奖
    'ALL::/web/raffle/toRaffle.json':  'mock::/web/raffle/toRaffle.json',
    // 元旦活动-我的奖品
    'ALL::/web/raffle/listMyRaffle.json':  'mock::/web/raffle/listMyRaffle.json',
    // 元旦活动-领取代金券
    'ALL::/web/raffle/getCashVoucher.json':  'mock::/web/raffle/getCashVoucher.json',
    // 元旦活动-游戏列表
    'ALL::/web/raffle/listRaffleGame.json':  'mock::/web/raffle/listRaffleGame.json'
  }