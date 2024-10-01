import * as moment from 'moment';
export enum HttpStatusCodeDescription {
  SUCCESS = 'Success',
  CREATED = 'Created',
  BAD_REQUEST = 'Bad request',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  NOT_FOUND = 'Not found',
  UNAUTHORIZED = 'Unauthorized',
  UNPROCESSABLE_ENTITY = 'Unprocessable Entity',
  FORBIDDEN = 'Forbidden',
}
export const convertDate = (s: string): boolean | object => {
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


  if (!isValid) return false; // Trả về true nếu hợp lệ, false nếu không

  const ans = s.slice(6, 10) + '-' + s.slice(3, 5) + '-' + s.slice(0, 2) + s.slice(10);

  console.log(ans);
  switch (s.length) {
    case ('YYYY-MM-DD HH:mm'.length):
      return {
        startOfDay: `${ans}:00.000000`,
        endOfDay: `${ans}:59.000000`
      };
    case ('YYYY-MM-DD HH'.length):
      return {
        startOfDay: `${ans}:00:00.000000`,
        endOfDay: `${ans}:59:59.000000`
      };
    case ('YYYY-MM-DD'.length):
      return {
        startOfDay: `${ans}:00:00:00.000000`,
        endOfDay: `${ans}:23:59:59.000000`
      };
    default:
      return {
        startOfDay: `${ans}.000000`,
        endOfDay: `${ans}.999999`
      };;
  }
}

export const betweenQuery = (s: any) => {
  return `HistorySensor.created_at >= '${s.startOfDay}' AND HistorySensor.created_at <= '${s.endOfDay}'`;
}
export const betweenQuery2 = (s: any) => {
  return `HistoryAction.created_at >= '${s.startOfDay}' AND HistoryAction.created_at <= '${s.endOfDay}'`;
}

