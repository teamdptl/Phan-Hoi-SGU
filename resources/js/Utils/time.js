export const displayTime = (time) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return (new Date(time)).toLocaleDateString('vi-VN', options);
}
