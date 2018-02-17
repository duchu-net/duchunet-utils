import moment from 'moment';

export const getDeltaDate = (delta, humanRead = false) => {
  const now = Date.now();
  const date = now + delta;
  if (humanRead) return toHumanRead(date);
  return date;
}

export const toServerFormat = (date) => {
  date = moment(new Date(date));
  return date.utc().format();
  // return date.format('YYYY-MM-DDT+-HH:mm:ss');
  // dataItem[columnItem.data] = date.format('HH:MM DD-MM-YYYY');
}

export const toHumanRead = (date) => {
  date = moment(new Date(date));
  return date.utc().format('HH:mm:ss DD-MM-YYYY');
}

export const addToDate = (date, add, to) => {
  date = moment(new Date(date));
  return date.add(add, to).format();
}

export const getOnlyDate = (date) => {
  date = moment(new Date(date));
  date.hours(0);
  date.minutes(0);
  date.seconds(0);
  return date.format();
}

export const toUTC = (date) => {

  return null;
}
export const fromUTC = (date) => {

}
