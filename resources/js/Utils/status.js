export const statusToText = (status) => {
    if (status === 'sent')
        return ["Đã gửi", "yellow"];

    if (status === 'process')
        return ["Đang thực hiện", "blue"];

    if (status === 'complete')
        return ["Hoàn thành", "green"];

    if (status === 'ignore')
        return ["Bỏ qua", "red"]
}
