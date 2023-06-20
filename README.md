## Khi bắt đầu máy chủ

#### Cài đặt MongoDB

1. Tải xuống trang web chính thức (phiên bản mới nhất của công cụ trực quan hóa đồ họa của riêng nó) [MongoDB] (https://www.mongodb.com/ry/doad/community) <br /> biểu tượng, mở ứng dụng, nhấp vào Kết nối kết nối

#### Máy chủ cấu hình Kết nối MongoDB

Chuyển đến thư mục `mall-curl/mall-cook-service/`, mở thư mục gốc `config.js`

```javascript
config = {
  appid: "xxx",
  secret: "xxx",
  serviceApi: "http://127.0.0.1:3000",
  mongodbUrl: "mongodb://localhost:27017/mall-cook",
  jwtSecret: "", // Needed or /login endpoint will throw 500 error
};

module.exports = config;
```

####

`` `Bash

# Nếu không được cài đặt trên Mall-Cook-Service, phụ thuộc Sợi đầu tiên cài đặt phụ thuộc

sợi dev

# Khi bắt đầu cổng, cổng mặc định KOA 3000

`` `

#### Giới thiệu về việc ra mắt dịch vụ cục bộ không thể tải lên sự cố hình ảnh

::: mẹo
Do vấn đề triển khai trực tuyến, vấn đề này cần được sửa đổi thủ công
:::

1. Cài đặt DayJS

```bash
yarn add dayjs
```

2. 目录处理

```javascript
// routes/upload.js
const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')

// Tạo một thư mục
function mkdirsSync(dirname) {
    if(fs.existsSync(dirname)) {
        return true
    } else {
        if(mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

// routes/upload.js
destination: function (req, file, cb) {
    const filePath = `${path.resolve('./public')}/img/${dayjs(Date.now()).format('YYYYMMDD')}`
    if(mkdirsSync(filePath)) {
      cb(null, filePath)
    }
}

data: `${config.serviceApi}/img/${dayjs(Date.now()).format('YYYYMMDD')}/${ctx.req.file.filename}`
```

#### 注意

-Các cổng được sử dụng ở đây là cổng mặc định của KOA, vì vậy địa chỉ yêu cầu của dự án Front -end là http://127.0.0.1:3000/

```javascript
// Các trung tâm thương mại dự án đầu tiênconst baseUrl = "http://127.0.0.1:3000"; // Thay đổi địa chỉ yêu cầu thành dịch vụ NOD cục bộ

export default {
  baseApi: "http://127.0.0.1:3000/",
  viewUrl: "http://127.0.0.1:8081/#/", // Cổng này không nhất thiết là 8081 để xem cổng của bạn khi Mall-Cook-Template bắt đầu
};
```
