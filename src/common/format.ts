import { format } from 'date-fns';

export class Format {
  public static alphanumeric(string: string) {
    return string.match(/\d+/g)!.join('');
  }
  public static date(date: Date) {
    return format(date, 'YYYY-MM-DD');
  }
  public static diacritic(string: string) {
    return string
      .replace(/a/g, '[a,á,à,â]')
      .replace(/e/g, '[e,é,ê]')
      .replace(/i/g, '[i,í]')
      .replace(/o/g, '[o,ó,ô]')
      .replace(/u/g, '[u,û,ú]');
  }
}
