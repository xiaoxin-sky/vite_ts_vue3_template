# 移动端通用模板

### 模板描述：

vue3.2 + typescript + vite，一套移动端模板。不适合用来创建 pc 项目。

### 特点：

**请求配置相关**

1. 支持自动取消重复请求（默认开启）

   当上个请求没有完成之前，再次请求同一个接口，会自动取消上次的请求。

   如果需要忽略可以传递 `requestOptions.ignoreCancelToken:false ` ，如下：

   ```typescript
   try {
     const res = await get<string>({ url: '/api', requestOptions: { ignoreCancelToken: false } })
     console.log(res)
   } catch (error) {
     console.log('获取数据错误', error as Error)
   }
   ```

2. 支持自动获取 token（默认关闭）

   如需开启，可以传递 `requestOptions.withToken:true `

   ```typescript
   try {
     const res = await get<string>({ url: '/api', requestOptions: { withToken: true } })
     console.log(res)
   } catch (error) {
     console.log('获取数据错误', error as Error)
   }
   ```

   注意，携带的 token 会在请求头 `Authorization` 中进行携带。

3. 自定义配置 token 匹配模式

   自定义请求头匹配信息，如下:

   ```typescript
   try {
     const res = await get<string>({ url: '/api',requestOptions:{withToken:true，authenticationScheme:'token'}  })
     console.log(res)
   } catch (error) {
     console.log('获取数据错误', error as Error)
   }
   ```

   注意：必须在开启 `withToken` 下，才能生效。

4. 完善 TS 请求返回值的支持。

   请求返回值的类型，完全支持自定义。泛型参数代表的是服务端传递回来的 data 的类型。

   ```typescript
   try {
     const res = await get<string[]>({ url: '/api',requestOptions:{withToken:true，authenticationScheme:'token'}  })
     // res 的类型是
     /*
     	{
         data:string[]
         code:number
         msg:string
       }
     */
     console.log(typeof res.data === string[])
   } catch (error) {
     console.log('获取数据错误', error as Error)
   }
   ```

   注意：如果后端返回数据结构类型与默认的不一致，可以自行修改 IBaseResponse 进行自定义。

**打包配置相关**

1. 可以在.env.\* 文件中（如：.env.development ），配置是否开启手机端调试面板（eruda）。
2. 自定义配置 API 接口地址（ baseAPI path）
