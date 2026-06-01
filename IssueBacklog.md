## Vấn đề về các tasks:
- Cần check lại task S-T02, S-T04 vì đang giống nhau, cả 2 cùng về risk
- Review là note lại mục đích, logic phần SQL, cách đọc chart cho từng task

## Vấn đề về UI:
- Highlight phần AI explanation: các màu đỏ chỉ dùng cho các risk, vàng cho warning
- Dashboard đang bị overview, không scroll được để xem hết nội dung (DONE)

## Vấn đề SQL:
- các task đang bị runout time khi chạy SQL
- Test SQL: chạy happy case trước, rồi chạy các trường hợp VS với cùng một SQL nhưng khác student thì kết quả thế nào?
- Viết script tạo index để không bị lỗi timeout
- Load dataset khác, cần kiểm tra lại

## Vấn đề về các task evaluation
- Ưu tiên chạy 1, 2, 3, 4. Phần 8, 9 để sau để kiểm tra chạy tốt
- Phần 5 và phần 6 không cần viết vào thesis, phần 6 tự kiểm tra bằng mắt 
- Bổ sung thêm link cho từng task (DONE)

## Vấn đề về Ai explanation
- Hỏi Ai cần thông tin gì để đánh giá, có thể dùng file log
- Implement task-aware summarizer thay cho giới hạn row data truyền vào câu prompt
- Phần 7: lấy file log cho codex đánh giá, human survey (để sau)


- System performance: bổ sung log thời gian chạy cho tất cả các bước