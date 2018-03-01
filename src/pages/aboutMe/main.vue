<template>
    <div>
        水电费水电费水电费123123123
    </div>
</template>

<script>
// import { SHOW_DIALOG_MUT, SHOW_APPOINT_DIALOG_MUT, WX_SHARE_SHOW } from '@/store/mutation-types'
import { mapState } from 'vuex'

export default {
    // directives: {
    //     TransferDom
    // },
    data() {
        return {
            activeIndex: '1'
        }
    },
    components: {
        // XDialog,
    },
    watch: {
        $route: function() {
            if (this.$route.path.startsWith('/gamePage/') && (this.gameId !== this.$route.params.gameId || this.channelId !== this.$route.params.channelId)) {
                this.afterPreRegister = false
                this.gameId = this.$route.params.gameId
                this.channelId = this.$route.params.channelId
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
                this.$store.dispatch('checkChannelId', {
                    params: this.$route.params,
                    callback: 'getGameDetail'
                })
            }
        }
    },
    created() {
        // this.$store.commit(WX_SHARE_SHOW, false)
        // this.$store.dispatch('checkChannelId', {
        //     params: this.$route.params,
        //     callback: 'getGameDetail'
        // })
        // setTimeout(() => {
        //     this.popupShow = false
        // }, 3000)
    },
    computed: mapState({
        wxShareShow: state => state.game.wxShareShow,
        gameLoaded: state => state.game.gameLoaded,
        gameDetail: state => state.game.gameDetail,
        isAndroid: state => state.isAndroid,
        isIOS: state => state.isIOS,
        appointDialog: state => state.game.appointDialog,
        showDialog: state => state.game.showDialog,
        guideImgs: state => state.game.guideImgs
    }),
    methods: {

        // 查看简历
        toAboutMe(){
            this.$router.push({
                name: 'aboutMe'
            })
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        // 发送验证码
        sendCode() {
            this.$validator.validate('mobile2', this.mobile, 'popup-init').then((result) => {
                if (result) {
                    this.$vux.loading.show()
                    this.$apis.sendPrebindVcode({
                        mobile: this.mobile,
                        afsToken: this.afs.token,
                        afsSource: 2
                    }).then((res) => {
                        this.$vux.loading.hide()
                        if (res.code === '200' && res.data) {
                            this.wait = 60
                            localStorage.sendCodeTime = Date.now()
                            this.intervalHandler()
                        } else {
                            this.$vux.toast.show({
                                type: 'warn',
                                text: res.message,
                                position: 'top'
                            })
                        }
                    }).catch((error) => {
                        this.$vux.loading.hide()
                        this.$vux.toast.show({
                            type: 'warn',
                            text: error.message,
                            position: 'top'
                        })
                    })
                } else {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: this.errors.first('mobile2', 'popup-init'),
                        position: 'top'
                    })
                }
            })
        },
        // 验证码发送倒计时
        intervalHandler() {
            if (this.interval) {
                return
            }
            let waitTime
            if (localStorage.sendCodeTime) {
                waitTime = parseInt((localStorage.sendCodeTime - Date.now()) / 1000 + 60)
            }
            if (this.wait === 0 && waitTime > 0) {
                this.wait = waitTime
            }
            this.interval = setInterval(() => {
                if (this.wait === 0) {
                    clearInterval(this.interval)
                    this.interval = null
                    return
                }
                this.wait--
            }, 1000)
        },
        // 获取福利
        getWelfare() {
            this.$validator.validateAll('popup-init').then((result) => {
                if (result) {
                    this.$vux.loading.show()
                    this.$apis.prebind({
                        mobile: this.mobile,
                        gameId: this.gameId,
                        channelId: this.channelId,
                        vcode: this.vcode
                    }).then((res) => {
                        this.$vux.loading.hide()
                        if (res.code === '200') {
                            this.popupStep = ''
                            this.popupPreStep = 'success'
                            this.afterPreRegister = true
                        } else {
                            this.$vux.toast.show({
                                type: 'warn',
                                text: res.message,
                                position: 'top'
                            })
                        }
                    }).catch((error) => {
                        this.$vux.loading.hide()
                        this.$vux.toast.show({
                            type: 'warn',
                            text: error.message,
                            position: 'top'
                        })
                    })
                } else {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: this.errors.all('popup-init')[0],
                        position: 'top'
                    })
                }
            })
        },
        // 弹窗动画控制
        nextStep () {
            if (this.popupPreStep) {
                this.popupStep = this.popupPreStep
            }
        },
        // 初始化预注册弹窗
        showPopup() {
            this.mobile = ''
            this.vcode = ''
            this.popupShow = true
            this.popupStep = 'init'
            this.$validator.reset()
            this.intervalHandler()
        },
        // 关闭弹窗
        closePopup(popupName) {
            this[popupName] = false
            this.colouredShow = false
            this.popupPreStep = false
        },
        downloadHandler() {
            this.$store.dispatch('gameCatDownLoad')
        },
        showDialogHandler(bool) {
            this.$store.commit(SHOW_DIALOG_MUT, bool)
        },
        routeReplace(path) {
            this.$router.replace(path)
        },
        showAppointDialog(bool) {
            this.mobile = ''
            this.$validator.validate('mobile').then((result) => {
                this.$store.commit(SHOW_APPOINT_DIALOG_MUT, bool)
            })
        },
        submit() {
            this.$validator.validate('mobile').then((result) => {
                // localStorage.isAppoint = 1
                if (result) {
                    this.isAppoint = 1
                    this.$store.commit(SHOW_APPOINT_DIALOG_MUT, false)
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .home nav{
        height: inherit;
        line-height: inherit;
        position: absolute;
        right: 0;
        top: 0;
        ul{
            position: fixed;
            right: 0px;
            li{
                list-style: none;
                margin: 0;
                padding: 0;
                white-space: nowrap;
                a{
                    border: 0;
                    color: #fff;
                    display: block;
                    font-size: 0.8em;
                    letter-spacing: 0.225em;
                    padding-right: 1.5em;
                    text-transform: uppercase;
                }
                a:after{
                    content: "";
                    position: absolute;
                    top: 50%;
                    margin-top: -2px;
                    left: 2px;
                    background-color: #fff;
                    box-shadow: 0 -2px 0 0 #fff, 0 2px 0 0 #fff;
                    background-color: #ffffff;
                    box-shadow: 0 -7px 0 0 #ffffff, 0 7px 0 0 #ffffff;
                    background-position: right center;
                    background-repeat: no-repeat;
                    height: 3px;
                    vertical-align: top;
                    width: 21px;
                }
            }
        }
    }
    .title{
        height: 100px;
        display: block;
        line-height: 100px;
        font-weight: 900;
        font-size: 28px;
        color: #ffffff;
        font-family: cursive;
    }
</style>
<style lang="less" >

// .popup-init-enter {
//     animation: 300ms initAnimate;
// }
// .popup-init-close {
//     animation: 300ms closeAnimate;
// }
// .popup-enter {
//     animation: 300ms enterAnimate;
// }
// .popup-leave {
//     animation: 300ms leaveAnimate;
// }
// .popup-coloured-enter {
//     animation: 500ms colouredAnimate;
// }
// @keyframes initAnimate {
//     from {
//         opacity: 0;
//         transform: scale(0)
//     }
//     to {
//         opacity: 1;
//         transform: scale(1)
//     }
// }
// @keyframes closeAnimate {
//     from {
//         opacity: 1;
//     }
//     to {
//         opacity: 0;
//     }
// }

// @keyframes enterAnimate {
//     from {
//         opacity: 0;
//         transform: rotateY(-90deg)
//     }
// }
// @keyframes leaveAnimate {
//     to {
//         opacity: 0;
//         transform: rotateY(90deg)
//     }
// }
// @keyframes colouredAnimate {
//     0% {
//         transform: scale(0);
//     }
//     33% {
//         transform: scale(0);
//     }
//     60% {
//         transform: scale(1.3)
//     }
//     80% {
//         transform: scale(1)
//     }
//     92% {
//         transform: scale(1.05)
//     }
//     100% {
//         transform: scale(1)
//     }
// }
</style>
