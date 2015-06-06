##Apple Push Notification Services
APNS 全名為 Apple Push Notification Service，也就是大家常說的 Push Notification 或者是 Server Push 技術，簡單說就是主動由 Server 發送訊息到 Client 的方法，而通常這樣的技術都會實作穿越防火牆的能力。在 iOS 所提供的 APNS 的架構中，包含了以下幾種角色：
<ul>
<li>Device - 就是你的行動上網裝置 (MID)</li>
<li>APNS - Apple 提供連線服務的伺服器 (Gateway)</li>
<li>Provider - 需要自行實作的訊息發送者</li>
</ul>
接收 Notification 的單位稱為 Device，發送 Notification 的單位稱為 Provider。Provider 與 Device 這兩個單位皆需要與 APNS 進行溝通，必須認證連線後才能正確工作。Device 就是我們的行動裝置 (iPhone/iPad)，當有網路的時候 iOS 就動裝置會自動連上 APNS，並且登入自己的裝置，這時 Device 就準備好可以接收訊息了，其架構圖可以參考下圖：
</br></br>
![Alt text](image/service_device_ct.jpg)

而負責發送訊息的 Provider 就需要自行透過憑證建立連線來發送訊息，連線時使用 SSL TLS 機制進行認證與加密，下圖為 Apple 官方提供的驗證架構圖：
</br></br>
![Alt text](image/service_provider_ct.jpg)

接下來則會開始進行Push Service需要的連線憑證 SSL Push Certificate申請教學。

##SSL Push Certificate申請教學

1. 首先進入到ios developer center,點選Certificates, Identifiers & Profiles => Identifiers
</br></br>
![Alt text](image/step1.png)

2. 選擇App IDs,並點選![Alt text](image/add.png)建立新的App
</br></br>
![Alt text](image/step2.png)

3. 輸入App名稱,並在Explicit App ID輸入Bundle ID,最後在App Services要記得勾選Push Notifications
</br></br>
![Alt text](image/step3.png)
![Alt text](image/step3-1.png)

4. 新增完系統會出現確認畫面,可以看到Push Notifications的狀態為Configurable,這時候直接按下submit按鈕送出後,App就會新增完畢
</br></br>
![Alt text](image/step4.png)

5. 接下來要進行Push Notifications的設定,並建立service所需要的SSL憑證,先回到App IDs頁面並點選剛剛新增的App,並點選![Alt text](image/edit.png)按鈕,將畫面拉到Push Notifications的畫面
</br></br>
![Alt text](image/step5.png)
![Alt text](image/step5-1.png)

6. 建立開發用的SSL憑證,在Development SSL Certificate項目中點選![Alt text](image/ssl.png)按鈕
</br></br>
![Alt text](image/step6.png)

7. 系統會提示需要建立CSR file,直接點選![Alt text](image/continue.png)按鈕,系統會需要上傳certSigningRequest file,至於該檔案怎麼製作請自行google,點選![Alt text](image/choose.png)按鈕上傳檔案,在按下![Alt text](image/generate.png)按鈕後,憑證即可製作完畢
</br></br>
![Alt text](image/step7.png)

8. 系統產生憑證後,點選![Alt text](image/download.png)按鈕下載到電腦後,,直接點選兩下則會將憑證匯入到『鑰匙圈存取』,可以在『我的憑證』選項找到剛剛匯入的憑證,另外在系統在點選![Alt text](image/done.png)按鈕會到iOS Certificates頁面,可以畫面看到剛剛新增的App憑證
</br></br>
![Alt text](image/step8.png)
![Alt text](image/step8-1.png)
