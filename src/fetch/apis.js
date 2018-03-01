import axios from 'axios'

export default (baseUrl, router) => {
    const instance = (baseURL, router) => {
        const instance = axios.create({
            // 设置超时时间
            timeout: 30000,
            // 请求的baseUrl
            baseURL: baseURL,
            // 请求头部信息
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // 请求参数转换
            transformRequest: [function (data, headers) {
                let ret = ''
                for (let it in data) {
                    if (ret !== '') ret += '&'
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
                }
                return ret
            }]
        })
        instance.interceptors.response.use((res) => {
            if (res.data.code === '201') {
                sessionStorage.clear()
                router.replace('/login')
                return null
            }
            if (!res) {
                return {
                    code: '500',
                    message: '请求数据异常'
                }
            }
            return res.data
        }, (error) => {
            return Promise.reject(error)
        })
        return instance
    }

    const httpCancel = (config, $this, cancel) => {
        if ($this) {
            config.cancelToken = new CancelToken(function executor(c) {
                $this[cancel] = c
            })
        }
    }

    const createAPI = (url, method, data, $this, cancel) => {
        let config = {
            method: method,
            url: url,
            data
        }
        httpCancel(config, $this, cancel)
        return instance(config)
    }
    let api = {
        listMessagesByUid: (data, $this, cancel) => createAPI(`/web/message/listMessagesByUid${window.suffix}`, 'post', data, $this, cancel),
        // 获取订单详情
        getCatPointTradeFlow: (data, $this, cancel) => createAPI(`/web/message/getCatPointTradeFlow${window.suffix}`, 'post', data, $this, cancel),
        // 判断是否需要预注册
        isPreRegister: (data, $this, cancel) => createAPI(`/web/game/isPreRegister${window.suffix}`, 'post', data, $this, cancel),
        // 发送预注册验证码
        sendPrebindVcode: (data, $this, cancel) => createAPI(`/web/user/sendPrebindVcode${window.suffix}`, 'post', data, $this, cancel),
        // 预注册
        prebind: (data, $this, cancel) => createAPI(`/web/user/prebind${window.suffix}`, 'post', data, $this, cancel),
        // 获取热门游戏
        listHotGame: (data, $this, cancel) => createAPI(`/web/game/listHotGame${window.suffix}`, 'post', data, $this, cancel)
    }
    return api
}