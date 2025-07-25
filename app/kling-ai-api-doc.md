「可灵AI」新系统 API 接口文档

可灵AI API新系统上线，当前仅开放给新用户（上线前无API购买行为的用户）抢先体验，老用户（上线前有过API购买行为的用户）预计 6 月份全面开放，届时会同步提供积分迁移工具，帮助您完成老系统到新系统的积分迁移。
新系统使用手册可见：「可灵 AI」API 新系统使用手册
注意：新系统调用域名已由 https://api.klingai.com 变更为 https://api-beijing.klingai.com更新时间	更新说明
2025.5.13	● 【图像生成】支持V2.0模型
	○ 支持V2.0文生图模型
● 【视频生成】支持V2.0模型
	○ 支持V2.0文生视频模型、图生视频模型
	○ V2.0暂不支持mode参数
● 【多图参考生视频】全新上线
	○ 最多支持从4张图片中选取主体
	○ 支持自定义生成视频的长宽比：16:9，9:16，1:1
2025.4.25	● 【视频生成-视频特效】新增单图特效
	○ 新增「单图特效」：2款，“花花世界bloombloom”、“魔力转圈圈dizzydizzy”
	○ 包括创建任务、查询任务（单个）、查询任务（列表）接口
2025.3.31	● 【视频生成】V1.6模型支持仅尾帧生成视频
	○ 可通过V1.6 高品质模型基于图片生成图片前几秒的视频画面
● 【视频生成】V1.5模型、V1.6模型支持视频延长
	○ 可基于V1.5模型和V1.6模型生成的视频，续写之后4~5秒的内容
	○ 如果是用“仅尾帧”生成的视频，则续写之前4~5秒的内容
2025.3.25	● 【图像生成】V1.5模型支持角色特征参考和人物长相参考
	○ 角色特征参考：通过文本描述即可随意改变人物的服装、发型、配饰、场景等元素，且可保持人物长相与参考图高度相似，轻易实现单人物多场景的创作需求
	○ 人物长相参考：适用于人物和常见动物角色，可控信息由长相扩大到主体，同时支持用户分别调节长相和主体的相似强度，通过文本描述，可以将角色置于任何场景，为用户在创作阶段提供单角色多镜头多场景的稳定素材支持
2025.3.12	● 【视频生成-视频特效】新增单图特效
	○ 开放「单图特效」：3款，“快来惹毛我fuzzyfuzzy”、“捏捏乐squish”与“万物膨胀expansion”
	○ 包括创建任务、查询任务（单个）、查询任务（列表）接口
● 【视频生成】新模型支持首尾帧、仅尾帧、动态笔刷、运镜控制
	○ V1.5支持首尾帧、仅尾帧、动态笔刷、运镜控制
	○ V1.6支持首尾帧
● 【视频生成】对口型支持自定义视频，支持更多可用音色
	○ 支持为任意1080p或720p、10s内视频对口型
	○ 新增8个中、英文音色可直接用于给对口型视频配音
● 【图像生成】支持V1.5模型
	○ 画面美感提升：构图与光影更加协调，尤其是人像美观度大幅提升，呈现更高级的美学效果
	○ 画面质量提升：增强了画面细节表现，色彩还原更加自然，层次感更加丰富
	○ 长宽比支持支持21:9
2025.3.5	● 【视频生成】新增能力：视频创意特效
	○ 开放「双人互动特效」：3款，“拥抱hug”、亲吻kiss”、比心heart_gesture”
	○ 包括创建任务、查询任务（单个）、查询任务（列表）接口
相比通用的视频生成接口，视频特效接口开放了更灵活的调用参数、封装了特效场景所需的前后处理能力（例如双人特效，支持传入两张人像图、并完成两张人像图的自动拼接，用拼接后的整图进行视频生成），调用更方便快捷
2025.2.14	● 【图像生成】model字段变更
请您注意，为了保持命名统一，原 model字段变更为 model_name字段，未来请您使用该字段来指定需要调用的模型版本。
● 同时，我们保持了行为上的向前兼容，如您继续使用原 model字段，不会对接口调用有任何影响、不会有任何异常，等价于 model_name为空时的默认行为（即调用V1模型）
2025.1.7	● 【视频生成】V1.6模型正式上线
	○ 支持文生视频标准模式（STD），图生视频标准模式（STD）和高品质模式（PRO）
	○ 暂不支持尾帧和运动笔刷、运镜等控制类功能
请您注意，为了保持命名统一，原 model字段变更为 model_name字段，未来请您使用该字段来指定需要调用的模型版本。
● 同时，我们保持了行为上的向前兼容，如您继续使用原 model字段，不会对接口调用有任何影响、不会有任何异常，等价于 model_name为空时的默认行为（即调用V1模型）
2024.12.30	● 【虚拟试穿】新增V1.5模型
	○ V1.5模型是V1.0模型的全面升级版本
	○ V1.5模型支持单个服装（上装upper、下装lower、与连体装dress）试穿，以及“上装+下装”形式服装的组合试穿
2024.12.23	● 【视频生成】新增能力：对口型
	○ 可灵 1.0 模型、可灵 1.5 模型生成的视频，只要满足视频画面的人脸条件，均支持对口型
	○ 包括创建任务、查询任务（单个）、查询任务（列表）接口
2024.12.9	● 【视频生成】V1.5模型，正式开放标准模式（STD）调用，支持视频生成 - 图生视频，暂不支持文生视频
	○ 支持标准模式
	○ 不支持尾帧控制
	○ 其他参数均支持
请您注意，为了保持命名统一，原 model字段变更为 model_name字段，未来请您使用该字段来指定需要调用的模型版本。
● 同时，我们保持了行为上的向前兼容，如您继续使用原 model字段，不会对接口调用有任何影响、不会有任何异常，等价于 model_name为空时的默认行为（即调用V1模型）
2024.12.2	● 【视频生成】能力地图
	○ 由于视频生成模型有多个模型版本（V1，V1.5），且有多种插件能力（镜头控制/首尾帧/运动笔刷/续写...），为了方便大家更直观的查询不同版本、不同能力的开放情况，我们制作了“能力地图”方便大家查阅（详见“3-0能力地图”）
2024.11.29	● 【视频生成 - 图生视频】新增运动笔刷
	○ 仅支持V1.0模型的标准模式 5s 与高品质模式 5s，V1.5模型暂不支持
2024.11.15	● 【视频生成】V1.5模型，正式开放高品质模式（PRO）调用，支持视频生成 - 图生视频，暂不支持文生视频
	○ 仅支持高品质模式
	○ 不支持尾帧控制
	○ 其他参数均支持
● 【视频生成】新增能力：视频延长
	○ 支持对V1.0模型生成的视频直接进行延长，每次增加4-5s的视频时长
	○ 包括创建任务、查询任务（单个）、查询任务（列表）接口
● 【视频生成】其他
	○ 新增“external_task_id”字段，您可以在创建任务时自定义任务id，查询时也可以通过该自定义id查询视频
● 请您注意，为了保持命名统一，原 model字段变更为 model_name字段，未来请您使用该字段来指定需要调用的模型版本。
● 同时，我们保持了行为上的向前兼容，如您继续使用原 model字段，不会对接口调用有任何影响、不会有任何异常，等价于 model_name为空时的默认行为（即调用V1模型）
2024.10.30	新增“查询资源包列表及余量”接口，方便您自主查询，见“六、账号信息查询”
2024.10.25	增加对于模型生成物（图片/视频）存储时长的说明
● 为保障信息安全，生成的图片/视频会在30天后被清理，辛苦大家及时转存
2024.10.15	增加生成鉴权信息的Java示例代码
2024.9.19	视频生成相关API
● 创建任务时，请求参数里的正向提示词（prompt）和负向提示词（negative_prompt），字符数限制更新为：不超过2500个字符
2024.9.19	正式支持“AI虚拟试穿”相关API（kolors-virtual-try-on）

一、通用信息
1. 调用域名
https://api-beijing.klingai.com
⚠️注意：新系统调用域名已由 https://api.klingai.com 变更为 https://api-beijing.klingai.com

2. 接口鉴权
● Step-1：获取 AccessKey + SecretKey
● Step-2：您每次请求API的时候，需要按照固定加密方法生成API Token
	○ 加密方法：遵循JWT（Json Web Token, RFC 7519）标准
	○ JWT由三个部分组成：Header、Payload、Signature
	○ 示例代码（Python）：
\`\`\`
import time
import jwt

ak = "" # 填写access key
sk = "" # 填写secret key

def encode_jwt_token(ak, sk):
    headers = {
        "alg": "HS256",
        "typ": "JWT"
    }
    payload = {
        "iss": ak,
        "exp": int(time.time()) + 1800, # 有效时间，此处示例代表当前时间+1800s(30min)
        "nbf": int(time.time()) - 5 # 开始生效的时间，此处示例代表当前时间-5秒
    }
    token = jwt.encode(payload, sk, headers=headers)
    return token

api_token = encode_jwt_token(ak, sk)
print(api_token) # 打印生成的API_TOKEN
\`\`\`
● 示例代码（Java）：
\`\`\`
package test;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTDemo {

    static String ak = ""; // 填写access key
    static String sk = ""; // 填写secret key

    public static void main(String[] args) {
        String token = sign(ak, sk);
        System.out.println(token); // 打印生成的API_TOKEN
    }
    static String sign(String ak,String sk) {
        try {
            Date expiredAt = new Date(System.currentTimeMillis() + 1800*1000); // 有效时间，此处示例代表当前时间+1800s(30min)
            Date notBefore = new Date(System.currentTimeMillis() - 5*1000); //开始生效的时间，此处示例代表当前时间-5秒
            Algorithm algo = Algorithm.HMAC256(sk);
            Map<String, Object> header = new HashMap<String, Object>();
            header.put("alg", "HS256");
            return JWT.create()
                    .withIssuer(ak)
                    .withHeader(header)
                    .withExpiresAt(expiredAt)
                    .withNotBefore(notBefore)
                    .sign(algo);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
\`\`\`

● Step-3：用第二步生成的API Token组装成Authorization，填写到 Request Header 里
	○ 组装方式：Authorization = "Bearer XXX"， 其中XXX填写第二步生成的API Token（注意Bearer跟XXX之间有空格）

3. 错误码HTTP状态码	业务码	业务码定义	业务码解释	建议解决方案
200	0	请求成功	-	-
401	1000	身份验证失败	身份验证失败	检查Authorization是否正确
401	1001	身份验证失败	Authorization为空	在Request Header中填写正确的Authorization
401	1002	身份验证失败	Authorization值非法	在Request Header中填写正确的Authorization
401	1003	身份验证失败	Authorization未到有效时间	检查token的开始生效时间，等待生效或重新签发
401	1004	身份验证失败	Authorization已失效	检查token的有效期，重新签发
429	1100	账户异常	账户异常	检查账户配置信息
429	1101	账户异常	账户欠费（后付费场景）	进行账户充值，确保余额充足
429	1102	账户异常	资源包已用完/已过期（预付费场景）	购买额外的资源包，或开通后付费服务（如有）
403	1103	账户异常	请求的资源无权限，如接口/模型	检查账户权限
400	1200	请求参数非法	请求参数非法	检查请求参数是否正确
400	1201	请求参数非法	参数非法，如key写错或value非法	参考返回体中message字段的具体信息，修改请求参数
404	1202	请求参数非法	请求的method无效	查看接口文档，使用正确的request method
404	1203	请求参数非法	请求的资源不存在，如模型	参考返回体中message字段的具体信息，修改请求参数
400	1300	触发策略	触发平台策略	检查是否触发平台策略
400	1301	触发策略	触发平台的内容安全策略	检查输入内容，修改后重新发起请求
429	1302	触发策略	API请求过快，超过平台速率限制	降低请求频率、稍后重试，或联系客服增加限额
429	1303	触发策略	并发或QPS超出预付费资源包限制	降低请求频率、稍后重试，或联系客服增加限额
429	1304	触发策略	触发平台的IP白名单策略	联系客服
500	5000	内部错误	服务器内部错误	稍后重试，或联系客服
503	5001	内部错误	服务器暂时不可用，通常是在维护	稍后重试，或联系客服
504	5002	内部错误	服务器内部超时，通常是发生积压	稍后重试，或联系客服

二、图像生成
2-0 能力地图kling-v1
	1:1	16:9	4:3	3:2	2:3	3:4	9:16
文生图	-	✅	✅	✅	✅	✅	✅	✅
图生图	通用垫图	✅	✅	✅	✅	✅	✅	✅

	其他能力	-	-	-	-	-	-	-kling-v1-5
	1:1	16:9	4:3	3:2	2:3	3:4	9:16	21:9
文生图	-	✅	✅	✅	✅	✅	✅	✅	✅
图生图	通用垫图	-	-	-	-	-	-	-	-

	角色特征	✅	✅	✅	✅	✅	✅	✅	✅

	人物长相	✅	✅	✅	✅	✅	✅	✅	✅kling-v2
	1:1	16:9	4:3	3:2	2:3	3:4	9:16	21:9
文生图	-	✅	✅	✅	✅	✅	✅	✅	✅
图生图	风格转绘	✅	✅	✅	✅	✅	✅	✅	✅

	其他能力	-	-	-	-	-	-	-	-图片编辑相关	是否支持
扩图	✅
其他	-模型	kling-v1
	kling-v1-5
	kling-2

模式	文生图	图生图	文生图	图生图	文生图	图生图
清晰度	1K	1K	1K	1K	1K/2K	1K


2-1【图像生成】创建任务网络协议	https
请求地址	/v1/images/generations
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体
请您注意，为了保持命名统一，原 model字段变更为 model_name字段，未来请您使用该字段来指定需要调用的模型版本。
● 同时，我们保持了行为上的向前兼容，如您继续使用原 model字段，不会对接口调用有任何影响、不会有任何异常，等价于 model_name为空时的默认行为（即调用V1模型）字段	类型	必填	默认值	描述
model_name	string	可选	kling-v1	模型名称
● 枚举值：kling-v1, kling-v1-5, kling-v2
prompt	string	必须	无	正向文本提示词
● 不能超过2500个字符
negative_prompt	string	可选	空	负向文本提示词
● 不能超过2500个字符
注：图生图（即image字段不为空时）场景下，不支持负向提示词
image	string	可选	空	参考图片
● 支持传入图片Base64编码或图片URL（确保可访问）
请注意，若您使用base64的方式，请确保您传递的所有图像数据参数均采用Base64编码格式。在提交数据时，请不要在Base64编码字符串前添加任何前缀，例如data:image/png;base64,。正确的参数格式应该直接是Base64编码后的字符串。
示例：
正确的Base64编码参数：
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
错误的Base64编码参数（包含data:前缀）：
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
请仅提供Base64编码的字符串部分，以便系统能够正确处理和解析您的数据。
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于300px，图片宽高比介于1:2.5 ~ 2.5:1之间
● image_reference参数不为空时，当前参数必填
image_reference	string	可选	无	图片参考类型
● 枚举值：subject（角色特征参考）, face（人物长相参考）
● 使用face（人物长相参考）时，上传图片需仅含1张人脸。
● 使用kling-v1-5且image参数不为空时，当前参数必填
image_fidelity	float	可选	0.5	生成过程中对用户上传图片的参考强度
● 取值范围：[0,1]，数值越大参考强度越大
仅 kling-v1, kling-v1-5 支持当前参数
human_fidelity	float	可选	0.45	面部参考强度，即参考图中人物五官相似度
● 取值范围：[0,1]，数值越大参考强度越大
● 仅image_reference参数为subject时生效
仅 kling-v1-5 支持当前参数
resolution	string	可选	1k	生成图片的清晰度
● 枚举值：1k, 2k
	○ 1k：1K标清
	○ 2k：2K高清
不同模型版本支持范围不同，详见当前文档2-0能力地图
n	int	可选	1	生成图片数量
● 取值范围：[1,9]
aspect_ratio	string	可选	16:9	生成图片的画面纵横比（宽:高）
● 枚举值：16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, 21:9
不同模型版本支持范围不同，详见当前文档2-0能力地图
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”响应体
{
	"code": 0, //错误码；具体定义错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}

2-2【图像生成】查询任务（单个）网络协议	https
请求地址	/v1/images/generations/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	必须	无	图片生成的任务ID
● 请求路径参数，直接将值填写在请求路径中请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    "task_result":{
    	"images":[
        {
        	"index": int, //图片编号，0-9
          "url": "string" //生成图片的URL，例如：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        }
      ]
    }
  }
}

2-3【图像生成】查询任务（列表）网络协议	https
请求地址	/v1/images/generations
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
/v1/images/generations?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
      "task_result":{
        "images":[
          {
            "index": int, //图片编号，0-9
            "url": "string" //生成图片的URL，例如：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
          }
      	]
      }
    }
  ]
}

2-4【扩图】创建任务网络协议	https
请求地址	/v1/images/editing/expand
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体字段	类型	必填	默认值	描述
image	string	必须	空	参考图片
● 支持传入图片Base64编码或图片URL（确保可访问）
请注意，若您使用base64的方式，请确保您传递的所有图像数据参数均采用Base64编码格式。在提交数据时，请不要在Base64编码字符串前添加任何前缀，例如data:image/png;base64,。正确的参数格式应该直接是Base64编码后的字符串。
示例：
正确的Base64编码参数：
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
错误的Base64编码参数（包含data:前缀）：
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
请仅提供Base64编码的字符串部分，以便系统能够正确处理和解析您的数据。
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片分辨率不小于300*300px，图片宽高比要在1:2.5 ~ 2.5:1之间
up_expansion_ratio	float	必须	0	向上扩充范围；基于原图高度的倍数而计算
● 取值范围：[0,2]，新图片整体面积不得超过原图片3倍
● 如原图高20，当前参数值为0.1，则：
	○ 原图顶边距离新图顶边为20 x 0.1 = 2，区域内均为扩图范围
bottom_expansion_ratio	float	必须	0	向下扩充范围；基于原图高度的倍数而计算
● 取值范围：[0,2]，新图片整体面积不得超过原图片3倍
● 如原图高20，当前参数值为0.2，则：
	○ 原图底边距离新图底边为20 x 0.2 = 4，区域内均为扩图范围
left_expansion_ratio	float	必须	0	向左扩充范围；基于原图宽度的倍数而计算
● 取值范围：[0,2]，新图片整体面积不得超过原图片3倍
● 如原图宽30，当前参数值为0.3，则：
	○ 原图左边距离新图左边为30 x 0.3 = 9，区域内均为扩图范围
right_expansion_ratio	float	必须	0	向右扩充范围；基于原图宽度的倍数而计算
● 取值范围：[0,2]，新图片整体面积不得超过原图片3倍
● 如原图宽30，当前参数值为0.4，则：
	○ 原图右边距离新图右边为30 x 0.4 = 12，区域内均为扩图范围
prompt	string	可选	无	正向文本提示词
● 不能超过2500个字符
n	int	可选	1	生成图片数量
● 取值范围：[1,9]
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”
external_task_id	string	可选	无	自定义任务ID
● 用户自定义任务ID，传入不会覆盖系统生成的任务ID，但支持通过该ID进行任务查询
● 请注意，单用户下需要保证唯一性响应体
{
	"code": 0, //错误码；具体定义错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_info":{ //任务创建时的参数信息
       "external_task_id": "string"//客户自定义任务ID
    },
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}
示例代码
import math

def calculate_expansion_ratios(width, height, area_multiplier, aspect_ratio):
    """
    计算图片外围扩展区域的上下左右比例。

    参数:
    - width: 原始图片宽度
    - height: 原始图片高度
    - area_multiplier: 外围区域面积是原图的倍数
    - aspect_ratio: 外围区域的宽高比（width/height）

    返回:
    - 格式化为四位小数的字符串，如 "0.1495,0.1495,0.6547,0.6547"
    """
    # 计算目标总面积
    target_area = area_multiplier * width * height

    # 计算目标高度和宽度（保持宽高比）
    target_height = math.sqrt(target_area / aspect_ratio)
    target_width = target_height * aspect_ratio

    # 计算扩展像素
    expand_top = (target_height - height) / 2
    expand_bottom = expand_top
    expand_left = (target_width - width) / 2
    expand_right = expand_left

    # 计算相对比例
    top_ratio = expand_top / height
    bottom_ratio = expand_bottom / height
    left_ratio = expand_left / width
    right_ratio = expand_right / width

    # 格式化为四位小数
    return f"{top_ratio:.4f},{bottom_ratio:.4f},{left_ratio:.4f},{right_ratio:.4f}"

# 示例：内部100x100，外部3倍面积，16:9
print(calculate_expansion_ratios(100, 100, 3, 16/9))
# 输出: "0.1495,0.1495,0.6547,0.6547"

2-5【扩图】查询任务（单个）网络协议	https
请求地址	/v1/images/editing/expand/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	必须	无	图片生成的任务ID
● 请求路径参数，直接将值填写在请求路径中请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info": { //任务创建时的参数信息
      	"external_task_id": "string"//客户自定义任务ID
    	},
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
      "task_result":{
        "images":[
          {
            "index": int, //图片编号，0-9
            "url": "string" //生成图片的URL，例如：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
          }
      	]
      }
    }
  ]
}

2-6【扩图】查询任务（列表）网络协议	https
请求地址	/v1/images/editing/expand
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info": { //任务创建时的参数信息
      	"external_task_id": "string"//客户自定义任务ID
    	},
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
      "task_result":{
        "images":[
          {
            "index": int, //图片编号，0-9
            "url": "string" //生成图片的URL，例如：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
          }
      	]
      }
    }
  ]
}

三、视频生成
3-0 能力地图kling-v1
	std 5s	std 10s	pro 5s	pro10s
文生视频	视频生成	✅	✅	✅	✅

	运镜控制	✅	-	-	-
图生视频	视频生成	✅	✅	✅	✅

	首尾帧	✅	-	✅	-

	运动笔刷	✅	-	✅	-

	其他能力	-	-	-	-
多图参考生视频
	-	-	-	-
视频续写
（不支持设置负向提示词和参考强度）
	✅	✅	✅	✅
对口型
	✅	✅	✅	✅
视频特效-双人特效
拥抱，亲吻，比心
	✅	✅	✅	✅kling-v1-5
	std 5s	std 10s	pro 5s	pro10s
文生视频	视频生成	-	-	-	-

	其他能力	-	-	-	-
图生视频	视频生成	✅	✅	✅	✅

	首尾帧	-	-	✅	✅

	仅尾帧	-	-	✅	✅

	运动笔刷	-	-	✅	-

	运镜控制
（仅simple）	-	-	✅	-

	其他能力	-	-	-	-
多图参考生视频
	-	-	-	-
视频续写
	✅	✅	✅	✅
对口型
	✅	✅	✅	✅
视频特效-双人特效
拥抱，亲吻，比心
	✅	✅	✅	✅kling-v1-6
	std 5s	std 10s	pro 5s	pro10s
文生视频	视频生成	✅	✅	-	-

	其他能力	-	-	-	-
图生视频	视频生成	✅	✅	✅	✅

	首尾帧	-	-	✅	✅

	仅尾帧	-	-	✅	✅

	其他能力	-	-	-	-
多图参考生视频
	✅	✅	✅	✅
视频续写
	✅	✅	✅	✅
对口型
	✅	✅	✅	✅
视频特效-双人特效
拥抱，亲吻，比心
	✅	✅	✅	✅kling-v2-master
	5s	10s
文生视频	视频生成	✅	✅

	其他能力	-	-
图生视频	视频生成	✅	✅

	其他能力	-	-
多图参考生视频
	-	-
视频续写
	-	-
对口型
	✅	✅
视频特效-双人特效
拥抱，亲吻，比心
	-	-模型版本	kling-v1
	kling-v1-5
	kling-v1-6
Image2Video
	kling-v1-6
Text2Video
	kling-v2 Master
模式	STD	PRO	STD	PRO	STD	PRO	STD	PRO	-
分辨率	720p	720p	720p	1080p	720p	1080p	720p	1080p	720p
帧率	30fps	30fps	30fps	30fps	30fps	30fps	24fps	24fps	24fps

3-1【文生视频】创建任务网络协议	https
请求地址	/v1/videos/text2video
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体
请您注意，为了保持命名统一，原 model字段变更为 model_name字段，未来请您使用该字段来指定需要调用的模型版本。
● 同时，我们保持了行为上的向前兼容，如您继续使用原 model字段，不会对接口调用有任何影响、不会有任何异常，等价于 model_name为空时的默认行为（即调用V1模型）字段	类型	必填	默认值	描述
model_name	string	可选	kling-v1	模型名称
● 枚举值：kling-v1, kling-v1-6, kling-v2-master
prompt	string	必须	无	正向文本提示词
● 不能超过2500个字符
negative_prompt	string	可选	空	负向文本提示词
● 不能超过2500个字符
cfg_scale	float	可选	0.5	生成视频的自由度；值越大，模型自由度越小，与用户输入的提示词相关性越强
● 取值范围：[0, 1]
kling-v2.x模型不支持当前参数
mode	string	可选	std	生成视频的模式
● 枚举值：std，pro
● 其中std：标准模式（标准），基础模式，性价比高
● 其中pro：专家模式（高品质），高表现模式，生成视频质量更佳
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
camera_control	object	可选	空	控制摄像机运动的协议（如未指定，模型将根据输入的文本/图片进行智能匹配）
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
camera_control
● type	string	可选	无	预定义的运镜类型
● 枚举值："simple", "down_back", "forward_up", "right_turn_forward", "left_turn_forward"
● simple：简单运镜，此类型下可在"config"中六选一进行运镜
● down_back：镜头下压并后退 ➡️ 下移拉远，此类型下config参数无需填写
● forward_up：镜头前进并上仰 ➡️ 推进上移，此类型下config参数无需填写
● right_turn_forward：先右旋转后前进 ➡️ 右旋推进，此类型下config参数无需填写
● left_turn_forward：先左旋并前进 ➡️ 左旋推进，此类型下config参数无需填写
camera_control
● config	object	可选	无	包含六个字段，用于指定摄像机在不同方向上的运动或变化
● 当运镜类型指定simple时必填，指定其他类型时不填
● 以下参数6选1，即只能有一个参数不为0，其余参数为0
config
● horizontal	float	可选	无	水平运镜，控制摄像机在水平方向上的移动量（沿x轴平移）
● 取值范围：[-10, 10]，负值表示向左平移，正值表示向右平移
config
● vertical	float	可选	无	垂直运镜，控制摄像机在垂直方向上的移动量（沿y轴平移）
● 取值范围：[-10, 10]，负值表示向下平移，正值表示向上平移
config
● pan	float	可选	无	水平摇镜，控制摄像机在水平面上的旋转量（绕y轴旋转）
● 取值范围：[-10, 10]，负值表示绕y轴向左旋转，正值表示绕y轴向右旋转
config
● tilt	float	可选	无	垂直摇镜，控制摄像机在垂直面上的旋转量（沿x轴旋转）
● 取值范围：[-10, 10]，负值表示绕x轴向下旋转，正值表示绕x轴向上旋转
config
● roll	float	可选	无	旋转运镜，控制摄像机的滚动量（绕z轴旋转）
● 取值范围：[-10, 10]，负值表示绕z轴逆时针旋转，正值表示绕z轴顺时针旋转
config
● zoom	float	可选	无	变焦，控制摄像机的焦距变化，影响视野的远近
● 取值范围：[-10, 10]，负值表示焦距变长、视野范围变小，正值表示焦距变短、视野范围变大
aspect_ratio	string	可选	16:9	生成视频的画面纵横比（宽:高）
● 枚举值：16:9, 9:16, 1:1
duration	string	可选	5	生成视频时长，单位s
● 枚举值：5，10
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”
external_task_id	string	可选	无	自定义任务ID
● 用户自定义任务ID，传入不会覆盖系统生成的任务ID，但支持通过该ID进行任务查询
● 请注意，单用户下需要保证唯一性响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_info":{ //任务创建时的参数信息
       "external_task_id": "string"//客户自定义任务ID
    },
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}

3-2【文生视频】查询任务（单个）网络协议	https
请求地址	/v1/videos/text2video/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	可选	无	文生视频的任务ID
● 请求路径参数，直接将值填写在请求路径中，与external_task_id两种查询方式二选一
external_task_id	string	可选	无	文生视频的自定义任务ID
● 创建任务时填写的external_task_id，与task_id两种查询方式二选一请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
    "task_info": { //任务创建时的参数信息
      "external_task_id": "string"//客户自定义任务ID
    },
    "task_result":{
      "videos":[
        {
        	"id": "string", //生成的视频ID；全局唯一
      		"url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //视频总时长，单位s
        }
      ]
    }
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
  }
}

3-3【文生视频】查询任务（列表）网络协议	https
请求地址	/v1/videos/text2video
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
/v1/videos/text2video?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info": { //任务创建时的参数信息
        "external_task_id": "string"//任务ID，客户自定义生成，与task_id两种查询方式二选一
      },
      "task_result":{
        "videos":[
          {
            "id": "string", //生成的视频ID；全局唯一
            "url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
            "duration": "string" //视频总时长，单位s
          }
        ]
    	},
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    }
  ]
}

3-4【图生视频】创建任务网络协议	https
请求地址	/v1/videos/image2video
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体
请您注意，为了保持命名统一，原 model字段变更为 model_name字段，未来请您使用该字段来指定需要调用的模型版本。
● 同时，我们保持了行为上的向前兼容，如您继续使用原 model字段，不会对接口调用有任何影响、不会有任何异常，等价于 model_name为空时的默认行为（即调用V1模型）
curl --location --request POST 'https://api.klingai.com/v1/videos/image2video' \
--header 'Authorization: Bearer xxx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model_name": "kling-v1",
    "mode": "pro",
    "duration": "5",
    "image": "https://h2.inkwai.com/bs2/upload-ylab-stunt/se/ai_portal_queue_mmu_image_upscale_aiweb/3214b798-e1b4-4b00-b7af-72b5b0417420_raw_image_0.jpg",
    "prompt": "宇航员站起身走了",
    "cfg_scale": 0.5,
    "static_mask": "https://h2.inkwai.com/bs2/upload-ylab-stunt/ai_portal/1732888177/cOLNrShrSO/static_mask.png",
    "dynamic_masks": [
      {
        "mask": "https://h2.inkwai.com/bs2/upload-ylab-stunt/ai_portal/1732888130/WU8spl23dA/dynamic_mask_1.png",
        "trajectories": [
          {"x":279,"y":219},{"x":417,"y":65}
        ]
      }
    ]
}'字段	类型	必填	默认值	描述
model_name	string	可选	kling-v1	模型名称
● 枚举值：kling-v1, kling-v1-5, kling-v1-6, kling-v2-master
image	string	可选	空	参考图像
● 支持传入图片Base64编码或图片URL（确保可访问）
请注意，若您使用base64的方式，请确保您传递的所有图像数据参数均采用Base64编码格式。在提交数据时，请不要在Base64编码字符串前添加任何前缀，例如data:image/png;base64,。正确的参数格式应该直接是Base64编码后的字符串。
示例：
正确的Base64编码参数：
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
错误的Base64编码参数（包含data:前缀）：
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
请仅提供Base64编码的字符串部分，以便系统能够正确处理和解析您的数据。
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于300px，图片宽高比介于1:2.5 ~ 2.5:1之间
● image参与与image_tail参数至少二选一，二者不能同时为空
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
image_tail	string	可选	空	参考图像 - 尾帧控制
● 支持传入图片Base64编码或图片URL（确保可访问）
请注意，若您使用base64的方式，请确保您传递的所有图像数据参数均采用Base64编码格式。在提交数据时，请不要在Base64编码字符串前添加任何前缀，例如data:image/png;base64,。正确的参数格式应该直接是Base64编码后的字符串。
示例：
正确的Base64编码参数：
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
错误的Base64编码参数（包含data:前缀）：
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
请仅提供Base64编码的字符串部分，以便系统能够正确处理和解析您的数据。
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于300px
● image参与与image_tail参数至少二选一，二者不能同时为空
● image_tail参数、dynamic_masks/static_mask参数、camera_control参数三选一，不能同时使用
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
prompt	string	可选	无	正向文本提示词
● 不能超过2500个字符
negative_prompt	string	可选	空	负向文本提示词
● 不能超过2500个字符
cfg_scale	float	可选	0.5	生成视频的自由度；值越大，模型自由度越小，与用户输入的提示词相关性越强
● 取值范围：[0, 1]
kling-v2.x模型不支持当前参数
mode	string	可选	std	生成视频的模式
● 枚举值：std，pro
● 其中std：标准模式（标准），基础模式，性价比高
● 其中pro：专家模式（高品质），高表现模式，生成视频质量更佳
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
static_mask	string	可选	无	静态笔刷涂抹区域（用户通过运动笔刷涂抹的 mask 图片）
“运动笔刷”能力包含“动态笔刷 dynamic_masks”和“静态笔刷 static_mask”两种
● 支持传入图片Base64编码或图片URL（确保可访问，格式要求同 image 字段）
● 图片格式支持.jpg / .jpeg / .png
● 图片长宽比必须与输入图片相同（即image字段），否则任务失败（failed）
● static_mask 和 dynamic_masks.mask 这两张图片的分辨率必须一致，否则任务失败（failed）
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
请求示例见上方代码块
dynamic_masks	array	可选	无	动态笔刷配置列表
可配置多组（最多6组），每组包含“涂抹区域 mask”与“运动轨迹 trajectories”序列
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
dynamic_masks
● mask	string	可选	无	动态笔刷涂抹区域（用户通过运动笔刷涂抹的 mask 图片）
● 支持传入图片Base64编码或图片URL（确保可访问，格式要求同 image 字段）
● 图片格式支持.jpg / .jpeg / .png
● 图片长宽比必须与输入图片相同（即image字段），否则任务失败（failed）
● static_mask 和 dynamic_masks.mask 这两张图片的分辨率必须一致，否则任务失败（failed）
dynamic_masks
● trajectories	array	可选	无	运动轨迹坐标序列
● 生成5s的视频，轨迹长度不超过77，即坐标个数取值范围：[2, 77]
● 轨迹坐标系，以图片左下角为坐标原点
注1：坐标点个数越多轨迹刻画越准确，如只有2个轨迹点则为这两点连接的直线
注2：轨迹方向以传入顺序为指向，以最先传入的坐标为轨迹起点，依次链接后续坐标形成运动轨迹
dynamic_masks
● trajectories
	○ x	int	可选	无	轨迹点横坐标（在像素二维坐标系下，以输入图片image左下为原点的像素坐标）
dynamic_masks
● trajectories
	○ y	int	可选	无	轨迹点纵坐标（在像素二维坐标系下，以输入图片image左下为原点的像素坐标）
camera_control	object	可选	空	控制摄像机运动的协议（如未指定，模型将根据输入的文本/图片进行智能匹配）
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
camera_control
● type	string	可选	无	预定义的运镜类型
● 枚举值："simple", "down_back", "forward_up", "right_turn_forward", "left_turn_forward"
● simple：简单运镜，此类型下可在"config"中六选一进行运镜
● down_back：镜头下压并后退 ➡️ 下移拉远，此类型下config参数无需填写
● forward_up：镜头前进并上仰 ➡️ 推进上移，此类型下config参数无需填写
● right_turn_forward：先右旋转后前进 ➡️ 右旋推进，此类型下config参数无需填写
● left_turn_forward：先左旋并前进 ➡️ 左旋推进，此类型下config参数无需填写
camera_control
● config	object	可选	无	包含六个字段，用于指定摄像机在不同方向上的运动或变化
● 当运镜类型指定simple时必填，指定其他类型时不填
● 以下参数6选1，即只能有一个参数不为0，其余参数为0
config
● horizontal	float	可选	无	水平运镜，控制摄像机在水平方向上的移动量（沿x轴平移）
● 取值范围：[-10, 10]，负值表示向左平移，正值表示向右平移
config
● vertical	float	可选	无	垂直运镜，控制摄像机在垂直方向上的移动量（沿y轴平移）
● 取值范围：[-10, 10]，负值表示向下平移，正值表示向上平移
config
● pan	float	可选	无	水平摇镜，控制摄像机在水平面上的旋转量（绕y轴旋转）
● 取值范围：[-10, 10]，负值表示绕y轴向左旋转，正值表示绕y轴向右旋转
config
● tilt	float	可选	无	垂直摇镜，控制摄像机在垂直面上的旋转量（沿x轴旋转）
● 取值范围：[-10, 10]，负值表示绕x轴向下旋转，正值表示绕x轴向上旋转
config
● roll	float	可选	无	旋转运镜，控制摄像机的滚动量（绕z轴旋转）
● 取值范围：[-10, 10]，负值表示绕z轴逆时针旋转，正值表示绕z轴顺时针旋转
config
● zoom	float	可选	无	变焦，控制摄像机的焦距变化，影响视野的远近
● 取值范围：[-10, 10]，负值表示焦距变长、视野范围变小，正值表示焦距变短、视野范围变大
duration	string	可选	5	生成视频时长，单位s
● 枚举值：5，10
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”
external_task_id	string	可选	无	自定义任务ID
● 用户自定义任务ID，传入不会覆盖系统生成的任务ID，但支持通过该ID进行任务查询
● 请注意，单用户下需要保证唯一性响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_info":{ //任务创建时的参数信息
       "external_task_id": "string" //客户自定义任务ID
    },
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}

3-5【图生视频】查询任务（单个）网络协议	https
请求地址	/v1/videos/image2video/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	可选	无	图生视频的任务ID
● 请求路径参数，直接将值填写在请求路径中，与external_task_id两种查询方式二选一
external_task_id	string	可选	无	图生视频的自定义任务ID
● 创建任务时填写的external_task_id，与task_id两种查询方式二选一请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
    "task_info": { //任务创建时的参数信息
      "external_task_id": "string"//客户自定义任务ID
    },
    "task_result":{
      "videos":[
        {
        	"id": "string", //生成的视频ID；全局唯一
      		"url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //视频总时长，单位s
        }
      ]
    }
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
  }
}

3-6【图生视频】查询任务（列表）网络协议	https
请求地址	/v1/videos/image2video
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
/v1/videos/image2video?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info": { //任务创建时的参数信息
        "external_task_id": "string"//客户自定义任务ID
      },
      "task_result":{
        "videos":[
          {
            "id": "string", //生成的视频ID；全局唯一
            "url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
            "duration": "string" //视频总时长，单位s
          }
        ]
    	}
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    }
  ]
}

3-7【多图参考生视频】创建任务网络协议	https
请求地址	/v1/videos/multi-image2video
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体字段	类型	必填	默认值	描述
model_name	string	可选	kling-v1-6	模型名称
● 枚举值：kling-v1-6
image_list	array	必须	空	参考图像列表
● 最多支持4张图片，用key:value承载，如下：
"image_list":[
	{
  	"image":"image_url"
  },
	{
  	"image":"image_url"
  },
	{
  	"image":"image_url"
  },
	{
  	"image":"image_url"
  }
]
● API端无裁剪逻辑，请直接上传已选主体后的图片
● 支持传入图片Base64编码或图片URL（确保可访问）
请注意，若您使用base64的方式，请确保您传递的所有图像数据参数均采用Base64编码格式。在提交数据时，请不要在Base64编码字符串前添加任何前缀，例如data:image/png;base64,。正确的参数格式应该直接是Base64编码后的字符串。
示例：
正确的Base64编码参数：
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
错误的Base64编码参数（包含data:前缀）：
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
请仅提供Base64编码的字符串部分，以便系统能够正确处理和解析您的数据。
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于200px，图片宽高比要在1:2.5 ~ 2.5:1之间
prompt	string	必须	无	正向文本提示词
● 不能超过2500个字符
negative_prompt	string	可选	空	负向文本提示词
● 不能超过2500个字符
mode	string	可选	std	生成视频的模式
● 枚举值：std，pro
● 其中std：标准模式（标准），基础模式，性价比高
● 其中pro：专家模式（高品质），高表现模式，生成视频质量更佳
不同模型版本、视频模式支持范围不同，详见当前文档3-0能力地图
duration	string	可选	5	生成视频时长，单位s
● 枚举值：5，10
aspect_ratio	string	可选	16:9	生成图片的画面纵横比（宽:高）
● 枚举值：16:9, 9:16, 1:1
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”
external_task_id	string	可选	无	自定义任务ID
● 用户自定义任务ID，传入不会覆盖系统生成的任务ID，但支持通过该ID进行任务查询
● 请注意，单用户下需要保证唯一性响应体
{
	"code": 0, //Error codes; Specific definitions can be found in Error codes
  "message": "string", //Error information
  "request_id": "string", //Request ID, generated by the system,to track requests and troubleshoot problems
  "data":{
  	"task_id": "string", //Task ID, generated by the system
    "task_status": "string", //Task status, Enum values：submitted、processing、succeed、failed
    "created_at": 1722769557708, //Task creation time, Unix timestamp, unit ms
    "updated_at": 1722769557708 //Task update time, Unix timestamp, unit ms
  }
}

3-8【多图参考生视频】查询任务（单个）网络协议	https
请求地址	/v1/videos/multi-image2video/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	可选	无	多图参考生视频的任务ID
● 请求路径参数，直接将值填写在请求路径中，与external_task_id两种查询方式二选一
external_task_id	string	可选	无	多图参考生视频的自定义任务ID
● 创建任务时填写的external_task_id，与task_id两种查询方式二选一请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
    "task_info": { //任务创建时的参数信息
      "external_task_id": "string"//客户自定义任务ID
    },
    "task_result":{
      "videos":[
        {
        	"id": "string", //生成的视频ID；全局唯一
      		"url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //视频总时长，单位s
        }
      ]
    }
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
  }
}

3-9【多图参考生视频】查询任务（列表）网络协议	https
请求地址	/v1/videos/multi-image2video
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
/v1/videos/multi-image2video?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info": { //任务创建时的参数信息
        "external_task_id": "string"//客户自定义任务ID
      },
      "task_result":{
        "videos":[
          {
            "id": "string", //生成的视频ID；全局唯一
            "url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
            "duration": "string" //视频总时长，单位s
          }
        ]
    	}
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    }
  ]
}



3-10【视频延长】创建任务
注-1：视频延长是指对文生/图生视频结果进行时间上的延长，单次可延长4~5s，使用的模型和模式不可选择、与源视频相同
注-2：暂不支持对V1.5模型生成的视频进行延长
注-3：被延长后的视频可以再次延长，但总视频时长不能超过3min网络协议	https
请求地址	https://api.klingai.com/v1/videos/video-extend
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体字段	类型	必填	默认值	描述
video_id	string	必须	无	视频ID
● 支持通过文本、图片和视频延长生成的视频的ID（原视频不能超过3分钟）
请注意，基于目前的清理策略、视频生成30天之后会被清理，则无法进行延长
prompt	string	可选	无	正向文本提示词
● 不能超过2500个字符
negative_prompt	string	可选	无	负向文本提示词
● 不能超过2500个字符
cfg_scale	float	可选	0.5	提示词参考强度
● 取值范围：[0,1]，数值越大参考强度越大
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}

3-11【视频延长】查询任务（单个）网络协议	https
请求地址	https://api.klingai.com/v1/videos/video-extend/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	必须	无	视频续写的任务ID
● 请求路径参数，直接将值填写在请求路径中请求体
无
响应体
{
	"code": 0, //错误码；具体定义见1.1错误码
  "message": "string", //错误信息；具体定义见1.1错误码
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题；全局唯一
  "data":{
  	"task_id": "string", //任务ID，系统生成；全局唯一
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
    "task_info":{ //任务创建时的参数信息
       "parent_video": {
         	"id": "string", //续写前的视频ID；全局唯一
      		"url": "string", //续写前视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //续写前的视频总时长，单位s
       }
    }, //任务创建时用户填写的详细信息
    "task_result":{
    	"videos":[  //数组是为了保留扩展性，以防未来要支持n
        {
        	"id": "string", //续写后的完整视频ID；全局唯一
          "url": "string", //续写后视频的URL
          "duration": "string" //视频总时长，单位s
        }
      ]
    }
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
  }
}

3-12【视频延长】查询任务（列表）网络协议	https
请求地址	https://api.klingai.com/v1/videos/video-extend
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
https://api.klingai.com/v1/videos/video-extend?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见1.1错误码
  "message": "string", //错误信息；具体定义见1.1错误码
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题；全局唯一
  "data":[
    {
    	"task_id": "string", //任务ID，系统生成；全局唯一
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info":{ //任务创建时的参数信息
        "parent_video": {
         	"id": "string", //续写前的视频ID；全局唯一
      		"url": "string", //续写前视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //续写前的视频总时长，单位s
        }
      }, //任务创建时用户填写的详细信息
      "task_result":{
        "videos":[  //数组是为了保留扩展性，以防未来要支持n
          {
            "id": "string", //续写后的完整视频ID；全局唯一
            "url": "string", //续写后视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
            "duration": "string" //视频总时长，单位s
          }
        ]
    	}
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    }
  ]
}

3-13【对口型】创建任务网络协议	https
请求地址	/v1/videos/lip-sync
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体字段	类型	必填	默认值	描述
input	object	必须	无	包含多个字段，用于指定视频、口型对应内容等
input
● video_id	string	可选	空	通过可灵AI生成的视频的ID
● 用于指定视频、判断视频是否可用于对口型服务
● 与input·video_url参数二选一填写，不能同时为空，也不能同时有值
● 仅支持使用30天内生成的5秒视频和10秒视频，超过10秒的视频不支持对口型
input
● video_url	string	可选	空	所上传视频的获取链接
● 用于指定视频，并判断视频是否可用于对口型服务
● 与input·video_id参数二选一填写，不能同时为空，也不能同时有值
● 视频文件支持.mp4/.mov，文件大小不超过100MB，视频时长不超过10s且不短于2s，仅支持720p和1080p、长宽的边长均位于720px~1920px之间，上述校验不通过会返回错误码等信息
● 系统会校验视频内容，如有问题会返回错误码等信息
input
● mode	string	必须	无	生成视频的模式
● 枚举值：text2video，audio2video
	○ text2video：文本生成视频模式，此模式时input·text、input·voice_id、input·voice_language参数为必填；音频生成视频模式相关参数无效
	○ audio2video：音频生成视频模式，此模式时input·audio_type参数为必填，文本生成视频模式相关参数无效
input
● text	string	可选	无	生成对口型视频的文本内容
● input·mode参数值为text2video时，当前参数必填
● 文本内容最大长度120，内容过长会返回错误码等信息
● 系统会校验文本内容，如有问题会返回错误码等信息
input
● voice_id	string	可选	无	音色ID
● input·mode参数值为text2video时，当前参数必填
● 系统提供多种音色可供选择，具体音色效果、音色ID、音色语种对应关系点此查看；音色试听不支持自定义文案
● 音色试听文件命名规范：音色名称#音色ID#音色语种
input
● voice_language	string	可选	zh	音色语种，与音色ID对应，详见
● 枚举值：zh，en
● input·mode参数值为text2video时，当前参数必填
● 音色语种与音色ID对应，详见上文
input
● voice_speed	float	可选	1.0	语速
● 有效范围：0.8~2.0，精确至小数点后1位，超出部分将自动四舍五入
● input·mode参数值为text2video时，当前参数必填
input
● audio_type	string	可选	无	使用音频文件生成对口型视频时，传输音频文件的方式
● 枚举值：file，url
● file：上传文件模式，此时input·audio_file参数必填
● url：提供下载链接模式，此时input·audio_url参数必填
● input·mode参数值为audio2video时，当前参数必填
input
● audio_file	string	可选	无	音频文件本地路径
● input·audio_type参数值为file时，当前参数必填
● 音频文件支持.mp3/.wav/.m4a/.aac，文件大小不超过5MB，Base64编码，格式不匹配或文件过大会返回错误码等信息
● 系统会校验音频内容，如有问题会返回错误码等信息
input
● audio_url	string	可选	无	音频文件下载url
● input·audio_type参数值为url时，当前参数必填
● 音频文件支持.mp3/.wav/.m4a/.aac，文件大小不超过5MB，格式不匹配或文件过大会返回错误码等信息
● 系统会校验音频内容，如有问题会返回错误码等信息
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}

3-14【对口型】查询任务（单个）网络协议	https
请求地址	/v1/videos/lip-sync/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	必须	无	对口型的任务ID
● 请求路径参数，直接将值填写在请求路径中请求体
无
响应体
{
	"code": 0, //错误码；具体定义见1.1错误码
  "message": "string", //错误信息；具体定义见1.1错误码
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题；全局唯一
  "data":[
    {
    	"task_id": "string", //任务ID，系统生成；全局唯一
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info":{ //任务创建时的参数信息
        "parent_video": {
         	"id": "string", //原视频ID；全局唯一
      		"url": "string", //原视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //原视频总时长，单位s
        }
      }, //任务创建时用户填写的详细信息
      "task_result":{
        "videos":[  //数组是为了保留扩展性，以防未来要支持n
          {
            "id": "string", //视频ID；全局唯一
            "url": "string", //对口型视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
            "duration": "string" //对口型视频总时长，单位s
          }
        ]
    	}
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    }
  ]
}

3-15【对口型】查询任务（列表）网络协议	https
请求地址	/v1/videos/lip-sync
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
/v1/videos/lip-sync?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见1.1错误码
  "message": "string", //错误信息；具体定义见1.1错误码
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题；全局唯一
  "data":[
    {
    	"task_id": "string", //任务ID，系统生成；全局唯一
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info":{ //任务创建时的参数信息
        "parent_video": {
         	"id": "string", //原视频ID；全局唯一
      		"url": "string", //原视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //原视频总时长，单位s
        }
      }, //任务创建时用户填写的详细信息
      "task_result":{
        "videos":[  //数组是为了保留扩展性，以防未来要支持n
          {
            "id": "string", //视频ID；全局唯一
            "url": "string", //对口型视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
            "duration": "string" //对口型视频总时长，单位s
          }
        ]
    	}
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    }
  ]
}

3-16【视频特效】创建任务网络协议	https
请求地址	/v1/videos/effects
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权通用请求体
您可以根据 effect_scene 实现不同的特效效果，现支持：
● 单图特效：花花世界bloombloom、魔力转圈圈dizzydizzy、快来惹毛我fuzzyfuzzy、捏捏乐squish、万物膨胀expansion
● 双人互动特效： 3款，拥抱hug、亲吻kiss、比心heart_gesture字段	类型	必填	默认值	描述
effect_scene	string	必须	无	场景名称
● 枚举值： bloombloom, dizzydizzy, fuzzyfuzzy, squish, expansion, hug, kiss, heart_gesture
input	object	必须	无	支持不同任务输入的结构体
● 根据scene不同，结构体里传的字段不同，具体如「场景请求体」所示
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”
external_task_id	string	可选	无	自定义任务ID
● 用户自定义任务ID，传入不会覆盖系统生成的任务ID，但支持通过该ID进行任务查询
● 请注意，单用户下需要保证唯一性场景请求体
单图特效：5款，花花世界bloombloom、魔力转圈圈dizzydizzy、快来惹毛我fuzzyfuzzy、捏捏乐squish、万物膨胀expansion字段	类型	必填	默认值	描述
model_name	string	必须	无	模型名称
● 枚举值：kling-v1-6
image	string	必须	无	参考图像
● 支持传入图片Base64编码或图片URL（确保可访问）
请注意，若您使用base64的方式，请确保您传递的所有图像数据参数均采用Base64编码格式。在提交数据时，请不要在Base64编码字符串前添加任何前缀，例如data:image/png;base64,。正确的参数格式应该直接是Base64编码后的字符串。
示例：
正确的Base64编码参数：
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
错误的Base64编码参数（包含data:前缀）：
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
请仅提供Base64编码的字符串部分，以便系统能够正确处理和解析您的数据。
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于300px，图片宽高比介于1:2.5 ~ 2.5:1之间
duration	string	必须	无	生成视频时长，单位s
● 枚举值：5双人互动特效： 3款，拥抱hug、亲吻kiss、比心heart_gesture字段	类型	必填	默认值	描述
model_name	string	可选	kling-v1	模型名称
● 枚举值：kling-v1, kling-v1-5, kling-v1-6
mode	string	可选	std	生成视频的模式
● 枚举值：std，pro
● 其中std：标准模式（标准），基础模式，性价比高
● 其中pro：专家模式（高品质），高表现模式，生成视频质量更佳
images	Array[string]	必须	无	参考图像组
● 数组的长度必须是2，上传的第一张图在合照的左边，上传的第二张图在合照的右边
该服务包含合照功能，即用户上传两张人想图，可灵AI将自适应拼接为合照，如图所示先后上传
"https://p2-kling.klingai.com/bs2/upload-ylab-stunt/c54e463c95816d959602f1f2541c62b2.png?x-kcdn-pid=112452",
"https://p2-kling.klingai.com/bs2/upload-ylab-stunt/5eef15e03a70e1fa80732808a2f50f3f.png?x-kcdn-pid=112452"
得到合照的效果为：

● 支持传入图片Base64编码或图片URL（确保可访问）
请注意，若您使用base64的方式，请确保您传递的所有图像数据参数均采用Base64编码格式。在提交数据时，请不要在Base64编码字符串前添加任何前缀，例如data:image/png;base64,。正确的参数格式应该直接是Base64编码后的字符串。
示例：
正确的Base64编码参数：
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
错误的Base64编码参数（包含data:前缀）：
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
请仅提供Base64编码的字符串部分，以便系统能够正确处理和解析您的数据。
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于300px，图片宽高比介于1:2.5 ~ 2.5:1之间
duration	string	必须	无	生成视频时长，单位s
● 枚举值：5，10请求示例
{
	"effect_scene": "hug",
  "input":{
  	"model_name": "kling-v1-6",
    "mode": "std",
    "images":[
    	"https://p2-kling.klingai.com/bs2/upload-ylab-stunt/c54e463c95816d959602f1f2541c62b2.png?x-kcdn-pid=112452",
      "https://p2-kling.klingai.com/bs2/upload-ylab-stunt/5eef15e03a70e1fa80732808a2f50f3f.png?x-kcdn-pid=112452"
    ],
    "duration": "5"
  }
}

响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_info":{ //任务创建时的参数信息
       "external_task_id": "string" //客户自定义任务ID
    },
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}

3-17【视频特效】查询任务（单个）网络协议	https
请求地址	/v1/videos/effects/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	可选	无	视频特效的任务ID
● 请求路径参数，直接将值填写在请求路径中，与external_task_id两种查询方式二选一
external_task_id	string	可选	无	视频特效的自定义任务ID
● 创建任务时填写的external_task_id，与task_id两种查询方式二选一请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
    "task_info": { //任务创建时的参数信息
      "external_task_id": "string"//客户自定义任务ID
    },
    "task_result":{
      "videos":[
        {
        	"id": "string", //生成的视频ID；全局唯一
      		"url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      		"duration": "string" //视频总时长，单位s
        }
      ]
    }
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
  }
}

3-18【视频特效】查询任务（列表）网络协议	https
请求地址	/v1/videos/effects
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
/v1/videos/image2video?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "task_info": { //任务创建时的参数信息
        "external_task_id": "string"//客户自定义任务ID
      },
      "task_result":{
        "videos":[
          {
            "id": "string", //生成的视频ID；全局唯一
            "url": "string", //生成视频的URL，例如https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.mp4（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
            "duration": "string" //视频总时长，单位s
          }
        ]
    	}
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    }
  ]
}

四、虚拟试穿
4-1【虚拟试穿】创建任务网络协议	https
请求地址	/v1/images/kolors-virtual-try-on
请求方法	POST
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求体字段	类型	必填	默认值	描述
model_name	string	可选	kolors-virtual-try-on-v1	模型名称
● 枚举值：kolors-virtual-try-on-v1, kolors-virtual-try-on-v1-5
human_image	string	必须	无	上传的人物图片
● 支持传入图片Base64编码或图片URL（确保可访问）
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于300px
cloth_image	string	必须	无	虚拟试穿的服饰图片
● 支持上传服饰商品图或服饰白底图，支持上装upper、下装lower、与连体装dress
● 支持传入图片Base64编码或图片URL（确保可访问）
● 图片格式支持.jpg / .jpeg / .png
● 图片文件大小不能超过10MB，图片宽高尺寸不小于300px
● 其中 kolors-virtual-try-on-v1-5 模型不仅支持单个服装输入，还支持“上装+下装”形式服装组合输入，即：
	○ 输入单个服饰图片（上装 or 下装 or 连体装）-> 生成试穿的单品图片
	○ 输入组合服饰图片（您可以将多个单品服饰白底图拼接到同一张图片）
		■ 模型检测为“上装+下装” -> 生成试穿的“上装+下装”图片
		■ 模型检测为“上装+上装” -> 生成失败
		■ 模型检测为“下装+下装” -> 生成失败
		■ 模型检测为“连体装+连体装” -> 生成失败
		■ 模型检测为“上装+连体装” -> 生成失败
		■ 模型检测为“下装+连体装” -> 生成失败
		■ 组合服饰图片示例：
callback_url	string	可选	无	本次任务结果回调通知地址，如果配置，服务端会在任务状态发生变更时主动通知
● 具体通知的消息schema见“Callback协议”响应体
{
	"code": 0, //错误码；具体定义错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708 //任务更新时间，Unix时间戳、单位ms
  }
}

4-2【虚拟试穿】查询任务（单个）网络协议	https
请求地址	/v1/images/kolors-virtual-try-on/{id}
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
task_id	string	必须	无	虚拟试穿的任务ID
● 请求路径参数，直接将值填写在请求路径中请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
  	"task_id": "string", //任务ID，系统生成
    "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
    "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
    "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
    "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
    "task_result":{
    	"images":[
        {
        	"index": int, //图片编号
          "url": "string" //生成图片的URL，例如：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        }
      ]
    }
  }
}

4-3【虚拟试穿】查询任务（列表）网络协议	https
请求地址	/v1/images/kolors-virtual-try-on
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权查询参数
/v1/images/kolors-virtual-try-on?pageNum=1&pageSize=30字段	类型	必填	默认值	描述
pageNum	int	可选	1	页码
● 取值范围：[1,1000]
pageSize	int 	可选	30	每页数据量
● 取值范围：[1,500]请求体
无
响应体
{
	"code": 0, //错误码；具体定义见错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":[
    {
      "task_id": "string", //任务ID，系统生成
      "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
      "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
      "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
      "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
      "task_result":{
        "images":[
          {
            "index": int, //图片编号
            "url": "string" //生成图片的URL，例如：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
          }
      	]
      }
    }
  ]
}

五、Callback协议
对于异步任务（图像生成 / 视频生成 / 虚拟试穿），若您在创建任务时主动设置了callback_url，则当任务状态发生变更时、服务端会主动通知，协议如下
{
  "task_id": "string", //任务ID，系统生成
  "task_status": "string", //任务状态，枚举值：submitted（已提交）、processing（处理中）、succeed（成功）、failed（失败）
  "task_status_msg": "string", //任务状态信息，当任务失败时展示失败原因（如触发平台的内容风控等）
  "task_info":{ //任务创建时的参数信息
    "parent_video": {
      "id": "string", //续写前的视频ID；全局唯一
      "url": "string", //续写前视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      "duration": "string" //续写前的视频总时长，单位s
    },
    "external_task_id": "string"//客户自定义任务ID
  }, //任务创建时用户填写的详细信息
  "created_at": 1722769557708, //任务创建时间，Unix时间戳、单位ms
  "updated_at": 1722769557708, //任务更新时间，Unix时间戳、单位ms
  "task_result":{
  	"images":[ //图片类任务的结果
      {
        "index": int, //图片编号
        "url": "string" //生成图片的URL，例如：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
      }
    ],
    "videos":[ //视频类任务的结果
  		{
        "id": "string", //视频ID；全局唯一
    		"url": "string", //视频的URL（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        "duration": "string" //视频总时长，单位s
      }
  	]
	}
}

六、账号信息查询
6-1 查询账号下资源包列表及余量
注：该接口免费调用，方便您查询账号下的资源包列表和余量，但请您注意控制请求速率（QPS<=1）网络协议	https
请求地址	/account/costs
请求方法	GET
请求格式	application/json
响应格式	application/json请求头字段	值	描述
Content-Type	application/json	数据交换格式
Authorization	鉴权信息，参考接口鉴权	鉴权信息，参考接口鉴权请求路径参数字段	类型	必填	默认值	描述
start_time	int	是	无	查询的开始时间，Unix时间戳、单位ms
end_time	int	是	无	查询的结束时间，Unix时间戳、单位ms
resource_pack_name	string	否	无	资源包名称，用于精准指定查询某个资源包请求体
无
响应体
{
	"code": 0, //错误码；具体定义错误码
  "message": "string", //错误信息
  "request_id": "string", //请求ID，系统生成，用于跟踪请求、排查问题
  "data":{
    "code": 0, //错误码；具体定义错误码
    "msg": "string", //错误信息
  	"resource_pack_subscribe_infos": [ //资源包列表
      {
        "resource_pack_name": "视频生成-10000条", //资源包名称
        "resource_pack_id": "509f3fd3d4ab4a3f9eec5db27aa44f27", //资源包ID
        "resource_pack_type": "decreasing_total", //资源包类型，枚举值，"decreasing_toal" = 总量递减型，"constant_period" = 周期恒定型
        "total_quantity": 200.0, //总量
        "remaining_quantity": 118.0, //余量（请注意，余量统计有12h的延迟）
        "purchase_time": 1726124664368, //购买时间，Unix时间戳、单位ms
        "effective_time": 1726124664368, //生效时间，Unix时间戳、单位ms
        "invalid_time": 1727366400000, //失效时间，Unix时间戳、单位ms
        "status": "expired" //资源包状态，枚举值，"toBeOnline" = 待生效，"online" = 生效中，"expired" = 已到期，"runOut" = 已用完
      }
    ]
  }
}
