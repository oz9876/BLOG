<template>
    <div class="home-data">
        <article >
            水电费水电费水电费
        </article>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            activeIndex: '1'
        }
    },
    components: {
        // XDialog,
    },
    watch: {

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

</style>
<style lang="less" >
    .home-data{
        background: rgba(169, 169, 169, 0.2);
        min-height: 200px;
        padding: 15px;
        margin-top: 20px;
        article{
            background: rgba(169, 169, 169, 0.25);
            min-height: 200px;
            box-shadow: rgba(169, 169, 169, 0.35) 0px 1px 8px 1px;
        }
    }
</style>
