import Vue from 'vue'
import Vuex from 'vuex'
import {init, httpCancel} from '@/fetch/initFetch'

Vue.use(Vuex)
// store初始化
const getStore = function (router) {
    const store = new Vuex.Store({
        state: {
            toastMsg: null,
            replaceLink: null,
            pushLink: null,
            isLoading: false,
            pageState: 1,
            http: init(window.baseUrl, router),
            httpCancel: httpCancel
        },
        mutations: {
        },
        modules: {
        }
    })
    // if (module.hot) {
    //     module.hot.accept([
    //         './modules/game'
    //     ], () => {
    //         const game = require('./modules/game').default
    //         store.hotUpdate({
    //             modules: {
    //                 // activity,
    //                 game
    //             }
    //         })
    //     })
    // }
    return store
}
export default getStore
