# web360-vr-demo# WebVR + Web360 Demo Template

Mẫu dự án tối thiểu để demo trong bài thuyết trình về WebVR/Web360.

## Cấu trúc thư mục

```text
webvr-demo/
├── index.html              # A-Frame scene 360 + hotspot + UI Enter VR
├── public/
│   └── assets/             # Chứa ảnh 360/video 360 của bạn
└── src/
    ├── main.js             # Logic đổi scene + sự kiện hotspot + Enter VR
    ├── components/         # Nơi để thêm custom A-Frame component
    └── styles/
        └── main.css        # Overlay UI cơ bản
```

## Chạy local

Dùng bất kỳ static server nào, ví dụ:

```bash
python3 -m http.server 4173
```

Sau đó truy cập `http://localhost:4173`.

## Tính năng có sẵn

- Scene 360 mặc định (`a-sky`) với 2 ảnh mẫu.
- 2 hotspot trong scene để đổi nhanh giữa Scene 1 và Scene 2 (click chuột trực tiếp nhờ raycaster từ camera).
- Khi đổi scene, ảnh 360 mới sẽ thay thế hoàn toàn ảnh cũ (không chồng lớp).
- Nút `Enter VR` để vào WebXR/VR mode.
- Nút Scene 1 / Scene 2 trên overlay để trình diễn nhanh khi thuyết trình.

## Cách thay asset thật

1. Đặt ảnh equirectangular của bạn vào `public/assets`.
2. Cập nhật `src` trong phần `<a-assets>` ở `index.html`.
3. Cập nhật `sceneMap` trong `src/main.js`.

> Gợi ý tối ưu: giữ ảnh 360 ở mức 4K hoặc thấp hơn để tránh giật khi chạy trên laptop yếu.