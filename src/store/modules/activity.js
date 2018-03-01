import {
    EXPAND_ACTION,
    SET_SHOW_EXPAND,
    SHOW_DIALOG_MUT,
    SHOW_APPOINT_DIALOG_MUT,
    UPDATE_LOADING_STATUS,
    SHOW_ERROR_TOAST
} from '@/store/mutation-types'
import {
    GET_HAS_RAFFLE_CHANCE,
    TO_RAFFLE,
    LIST_MY_RAFFLE,
    GET_CASH_VOUCHER,
    LIST_RAFFLE_GAME
} from '@/store/apis'

const state = {
    gameLoaded: false,
    showAll: false,
    showExpand: false,
    showBanner: false,
    gameDetail: null,
    giftbags: null,
    recommendGames: null,
    appointDialog: false,
    showDialog: false,
    wxShareShow: false,
    guideImgs: null
}
const mutations = {

    [EXPAND_ACTION](state, init) {
        if (init) {
            state.showAll = false
        } else {
            state.showAll = !state.showAll
        }
    },
    [SET_SHOW_EXPAND](state, bool) {
        state.showExpand = bool
    },
    [SHOW_DIALOG_MUT](state, bool) {
        state.showDialog = bool
    },
    [SHOW_APPOINT_DIALOG_MUT](state, bool) {
        state.appointDialog = bool
    }
}
const actions = {
    // 获取是否有抽奖机会
    hasRaffleChance({ commit, rootState }) {
        return new Promise((resolve, reject) => {
            commit(UPDATE_LOADING_STATUS, true)
            rootState.http.post(GET_HAS_RAFFLE_CHANCE, {
            }).then((res) => {
                commit(UPDATE_LOADING_STATUS, false)
                if (res.code !== '200') {
                    alert(res.message)
                    return false
                } else {
                    const data = res.data
                    resolve(data)
                }
            }).catch((error) => {
                commit(UPDATE_LOADING_STATUS, false)
                commit(SHOW_ERROR_TOAST, error)
            })
        })
    },
    // 去抽奖
    toRaffle({ commit, rootState }) {
        return new Promise((resolve, reject) => {
            rootState.http.post(TO_RAFFLE, {
            }).then((res) => {
                resolve(res)
            }).catch((error) => {
                commit(SHOW_ERROR_TOAST, error)
                reject(error)
            })
        })
    },
    // 我的奖励
    listMyRaffle({ commit, rootState }) {
        return new Promise((resolve, reject) => {
            rootState.http.post(LIST_MY_RAFFLE, {
            }).then((res) => {
                resolve(res)
            }).catch((error) => {
                commit(SHOW_ERROR_TOAST, error)
                reject(error)
            })
        })
    },
    // 获取代金券
    getCashVoucher({ commit, rootState }, {
        cashId,
        gameId
    }) {
        return new Promise((resolve, reject) => {
            rootState.http.post(GET_CASH_VOUCHER, {
                gameId,
                cashId
            }).then((res) => {
                resolve(res)
            }).catch((error) => {
                commit(SHOW_ERROR_TOAST, error)
                reject(error)
            })
        })
    },
    // 活动游戏列表
    listGameList({ commit, rootState }, {osType}) {
        return new Promise((resolve, reject) => {
            rootState.http.post(LIST_RAFFLE_GAME, {
                osType
            }).then((res) => {
                resolve(res)
            }).catch((error) => {
                commit(SHOW_ERROR_TOAST, error)
                reject(error)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}