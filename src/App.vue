<template>
    <div id="app">
        <transition name="unfade" >
            <div class="init-loading" v-show="!initLoaded">
                <InitLoading/>
            </div>
        </transition>
        
        <transition name="fade" >
            <div v-show="initLoaded">
            <!-- <keep-alive> -->
                <router-view></router-view>
            <!-- </keep-alive> -->
            </div>
        </transition>
        
        <!-- <div v-transfer-dom>
            <loading :show="isLoading"></loading>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import { Loading, TransferDomDirective as TransferDom } from 'vux'
import InitLoading from './components/initLoading'
import {
    SHOW_ERROR_TOAST,
    UPDATE_PUSH_LINK,
    UPDATE_REPLACE_LINK
} from '@/store/mutation-types'

export default {
    // directives: {
    //     TransferDom
    // },
    data() {
        return {
            initLoaded: false
        }
    },
    components: {
        // Loading
        InitLoading
    },
    computed: mapState({
        // isLoading: state => state.isLoading,
        pageState: state => state.pageState,
        toastMsg: state => state.toastMsg,
        pushLink: state => state.pushLink,
        replaceLink: state => state.replaceLink
    }),
    created(){
        setTimeout(()=>{
            this.initLoaded = true
        },3000)
        // 滚轮高度监听
        function getScrollTop(){   
            if(document.documentElement&&document.documentElement.scrollTop){   
                return document.documentElement.scrollTop;   
            }else if(document.body){   
                return document.body.scrollTop;   
            }
        }   
        document.onscroll = function(){
            console.log(getScrollTop())      
        }  
    },
    watch: {
        pageState(val) {
        },
        toastMsg({message}) {
            message && this.$vux.toast.show({
                text: message,
                type: 'warn',
                position: 'top'
            })
            message && this.$store.commit(SHOW_ERROR_TOAST, {})
        },
        pushLink(val) {
            val && this.$router.push(val)
            this.$store.commit(UPDATE_PUSH_LINK)
        },
        replaceLink(val) {
            val && this.$router.replace(val)
            this.$store.commit(UPDATE_REPLACE_LINK)
        }
    }
}
</script>

<style lang="less">
@import './App.less';
</style>
<style lang="less">

.unfade-leave-active {
    animation: unfade-hidden 1s;
}

.fade-enter-active {
    animation: fade-in 0.5s;
}

.fade-leave-active {
    animation: fade-out 0.5s;
}


@keyframes unfade-hidden {
    0% {
        opacity: 1;
    }
    100% {
        height: 0;
        opacity: 0;
    }
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>