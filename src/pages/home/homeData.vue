<template>
    <div class="home-data">
        <el-collapse-transition>
            <nav v-show="show3">
                <article class="article" v-for="item in homeDataList" :key="item.key">
                    <h3>标题123213213</h3>
                    <div class="article-img">
                        <img src="http://www.yangqq.com/d/file/download/div/2018-02-22/d1a7145c2a92931340632d0d64ffe199.jpg"/>
                        <div class="article-summary">
                            <p>Html5+css3个人博客模板，主题《心蓝时间轴》，使用css3技术实现网站动画效果，主要模块是时间轴部分.主题颜色为蓝色.目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载....目前版本还在测试当中,喜欢的可以先下载...</p>
                            <div class="time">2017-5-5</div>
                        </div>
                    </div>
                </article>
            </nav>
        </el-collapse-transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            activeIndex: '1',
            homeDataList: [1,23,23,4],
            show3: false
        }
    },
    components: {
        // XDialog,
    },
    watch: {

    },
    created() {
        setTimeout(()=>{
            this.show3 = true
        },2000)
        
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

</style>
<style lang="less" >
    .home-data{
        box-shadow: inset #a9a9a9 0px 0px 7px 10px;
        background: #c1c1c1;
        min-height: 200px;
        padding: 15px;
        margin-top: 20px;
        nav{
            margin: 10px;
            width: 650px;
        }
        .article{
            padding: 10px;
            padding-top: 1px;
            word-wrap: break-word;
            padding-bottom: 20px;
            border-bottom: 1px;
            border-bottom-style: dotted;
            h3{
                margin: 10px 0;
            }
            transition: 500ms;
        }
        .article:hover{
            background: #b6b6b7;
        }
        .article-img{
            display: -webkit-box;
            display: -moz-box;
            height: 120px;
            overflow: hidden;
            img{
                width: 200px;
            }
            .article-summary{
                width: 410px;
                margin-left: 20px;
                p{
                    height: 90px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;
                    overflow: hidden;
                    margin: 0;
                }
                .time{
                    margin-top: 8px;
                }
            }
        }
    }
</style>
