<template>
    
    <header class="home">
        <nav>
            <ul>
                <li class="special">
                    <a href="#menu" class="menuToggle"><span>Menu</span></a>
                </li>
            </ul>
        </nav>
        <title class="title">
            <router-link to="/home">XXXX个人</router-link>
        </title>
        <el-menu
            :default-active="activeIndex"
            class="header-menu"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
                <router-link to="/home">首页</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">学无止境</template>
                <el-menu-item index="2-1">前端</el-menu-item>
                <el-menu-item index="2-2">产品</el-menu-item>
                <el-menu-item index="2-3">经济</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">慢生活</el-menu-item>
            <el-menu-item index="4">大神手记</el-menu-item>
            <el-menu-item index="5" @click='toAboutMe'>关于我</el-menu-item>
        </el-menu>
        <main>
            <HomeData v-if="this.$route.path=='/home'"></HomeData>
            <router-view v-else></router-view>
        </main>
    </header>
</template>

<script>
// import { SHOW_DIALOG_MUT, SHOW_APPOINT_DIALOG_MUT, WX_SHARE_SHOW } from '@/store/mutation-types'
import { mapState } from 'vuex'
import HomeData from './homeData'

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
        HomeData
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
        // wxShareShow: state => state.game.wxShareShow,
        // gameLoaded: state => state.game.gameLoaded,
        // gameDetail: state => state.game.gameDetail,
        // isAndroid: state => state.isAndroid,
        // isIOS: state => state.isIOS,
        // appointDialog: state => state.game.appointDialog,
        // showDialog: state => state.game.showDialog,
        // guideImgs: state => state.game.guideImgs
    }),
    methods: {
        // 查看简历
        toAboutMe(){
            
            this.$router.push({
                name: 'aboutMe'
            })
        },
        handleSelect(key, keyPath) {
            debugger
            console.log(key, keyPath, );
        },
        routeReplace(path) {
            this.$router.replace(path)
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
                    box-shadow: 0 -2px 0 0 #ffffff, 0 2px 0 0 #ffffff;
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
        display: inline-block;
        line-height: 100px;
        font-weight: 900;
        font-size: 28px;
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
