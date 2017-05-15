import xlsx from 'node-xlsx';

export default class XlsxUtil {

  static parseBufferToJson(buffer) {
    return xlsx.parse(buffer);
  }

}
