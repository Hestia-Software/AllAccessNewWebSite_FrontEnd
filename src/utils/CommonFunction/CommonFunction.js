import moment from "moment";
class DateFunctions {
    static disableFutureDates = (current) => {
        // Disable dates after today
        return current && current > moment().endOf('day');
      };
      static formatDate(inputDate) {
        return moment(inputDate).format('DD/MM/YYYY');
    }
}

export default DateFunctions;