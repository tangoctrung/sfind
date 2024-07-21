export function convertTimeToHHMMddmmYYYY(time: string) {
    const date = new Date(time);
    const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const mm = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const yyyy = date.getFullYear();

    return hh + ":" + minute + " " + dd + "/" + mm + "/" + yyyy;
}