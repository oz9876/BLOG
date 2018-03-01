import axios from 'axios'
const CancelToken = axios.CancelToken

// 公共配置
export const init = (baseURL, router) => {
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
export const httpCancel = (config, $this, cancel) => {
    if ($this) {
        config.cancelToken = new CancelToken(function executor(c) {
            $this[cancel] = c
        })
    }
}