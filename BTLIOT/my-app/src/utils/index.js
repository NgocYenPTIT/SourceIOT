import * as moment from 'moment';

export const createData = (STT, ID, Temp, Humid, Light, Time) => {
    return { STT, ID, Temp, Humid, Light, Time };
}
export const createData2 = (STT, ID, Device, Action, Time) => {
    return { STT, ID, Device, Action, Time };
}

export const convertISOToCustomFormatWithTimezone = (isoString: string) => {
    const date = new Date(isoString);
    // Thêm múi giờ UTC+7 bằng cách cộng giờ
    date.setHours(date.getHours() + 0);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về giá trị từ 0-11, nên cần +1
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export const SerializerDBSensor = (data, currentPage, pageSize) => {
    const convert = (data) => {
        const ans = [];
        for (let i = 0; i < data.length; i++) {
            const x = data[i];
            ans.push({ STT: (currentPage - 1) * pageSize + i + 1, ID: x.id, Temp: x.temperature, Humid: x.humid, Light: x.light, Time: convertISOToCustomFormatWithTimezone(x.createdAt) });
        }
        return ans;
    }
    const x = convert(data.results);
    return x;
}
export const SerializerDBSensor2 = (data, currentPage, pageSize) => {
    const convert = (data) => {
        const ans = [];
        for (let i = 0; i < data.length; i++) {
            const x = data[i];
            let status = '';
            let device = '';
            if (x.fan !== 'Không đổi') {
                device = 'Fan'
                status = x.fan;
            }
            if (x.ac !== 'Không đổi') {
                device = 'AC'
                status = x.ac;
            }
            if (x.light !== 'Không đổi') {
                device = 'Light'
                status = x.light;
            }
            ans.push({ STT: (currentPage - 1) * pageSize + i + 1, ID: x.id, Device: device, Action: status, Time: convertISOToCustomFormatWithTimezone(x.createdAt) });
        }
        return ans;
    }
    const x = convert(data.results);
    return x;
}
export const isNumber = (str) => {
    // Kiểm tra nếu chuỗi trống hoặc null
    if (!str || str.trim() === '') {
        return false;
    }

    // Sử dụng hàm isNaN và kiểm tra xem chuỗi có thể được chuyển thành số không
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export const validateDate = (s: string): boolean => {
    // Biểu thức chính quy để khớp các định dạng
    const dateTimeRegex = /^(\d{2})\/(\d{2})\/(\d{4})(?:\s(\d{2})(?::(\d{2})(?::(\d{2}))?)?)?$/;

    // Kiểm tra chuỗi có khớp với định dạng không
    const match = s.match(dateTimeRegex);
    if (!match) {
        return false; // Không đúng định dạng
    }

    // Extract các giá trị từ match
    const [, day, month, year, hour = '00', minute = '00', second = '00'] = match;

    // Tạo các chuỗi format thời gian khác nhau để kiểm tra
    const dateFormats = [
        'YYYY-MM-DD HH:mm:ss',  // Full format: ngày, giờ, phút, giây
        'YYYY-MM-DD HH:mm',     // Format ngày giờ phút
        'YYYY-MM-DD HH',        // Format ngày giờ
        'YYYY-MM-DD'            // Chỉ có ngày
    ];

    // Tạo chuỗi thời gian theo định dạng chuẩn
    const dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    // Sử dụng moment để kiểm tra tính hợp lệ của ngày giờ
    const isValid = moment(dateString.trim(), dateFormats, true).isValid();

    return isValid; // Trả về true nếu hợp lệ, false nếu không
};
export const convertDataChart = (data) => {
    const ans = { temperature: [], humid: [], light: [] };
    for (let i = data.length - 1; i >= 0; i--) {
        const x = data[i];
        ans.temperature.push(x.temperature);
        ans.humid.push(x.humid);
        ans.light.push(x.light);
    }
    return ans;
}
export const get12MinuteLatest = () => {
    const now = Date.now();
    return [new Date(now), new Date(now - 2 * 60 * 1000), new Date(now - 4 * 60 * 1000), new Date(now - 6 * 60 * 1000), new Date(now - 8 * 60 * 1000), new Date(now - 10 * 60 * 1000), new Date(now - 12 * 60 * 1000), new Date(now - 14 * 60 * 1000), new Date(now - 16 * 60 * 1000), new Date(now - 18 * 60 * 1000), new Date(now - 20 * 60 * 1000), new Date(now - 22 * 60 * 1000)].reverse();
}
export const convertTimeFormat = (dateString) => {
    // Tách phần ngày và phần giờ
    const [datePart, timePart] = dateString.split(' ');

    // Tách các thành phần ngày, tháng, năm
    const [day, month, year] = datePart.split('/');

    // Ghép các thành phần theo định dạng YYYY/MM/DD
    const formattedDate = `${year}/${month}/${day}`;

    // Kết hợp với phần giờ
    return `${formattedDate} ${timePart}`;
}