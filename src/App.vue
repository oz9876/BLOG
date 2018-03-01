<template>
    <div id="app">
        <transition name="fade">
            <!-- <keep-alive> -->
                <router-view></router-view>
            <!-- </keep-alive> -->
        </transition>
        <!-- <div v-transfer-dom>
            <loading :show="isLoading"></loading>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
// import { Loading, TransferDomDirective as TransferDom } from 'vux'
import {
    SHOW_ERROR_TOAST,
    UPDATE_PUSH_LINK,
    UPDATE_REPLACE_LINK
} from '@/store/mutation-types'

export default {
    // directives: {
    //     TransferDom
    // },
    components: {
        // Loading
    },
    computed: mapState({
        // isLoading: state => state.isLoading,
        pageState: state => state.pageState,
        toastMsg: state => state.toastMsg,
        pushLink: state => state.pushLink,
        replaceLink: state => state.replaceLink
    }),
    created(){
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
.fade-enter-active {
    animation: fade-in 0.3s;
}

.fade-leave-active {
    animation: fade-out 0.3s;
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

.move-enter-active{
  animation: move-in 0.3s;
  width: 100%;
  position: fixed;
}
.move-leave-active {
  animation: move-out 0.3s;
  width: 100%;
  position: fixed;
}

@keyframes move-in {
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
}
@keyframes move-out {
  0% {
    left: 0%;
  }
  100% {
    left: 100%;
  }
}
</style>