import * as yup from 'yup';

export const cnpjSchema = yup
  .string()
  .matches(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)
  .test({
    name: 'cnpj',
    message: '${path} is invalid',
    exclusive: true,
    test: value => {
      const cnpj = value.replace(/[^\d]+/g, '');

      if (cnpj === '') return false;

      if (cnpj.length !== 14) return false;

      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999'
      ) {
        return false;
      }

      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      const digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (const i = tamanho; i >= 1; i - 1) {
        soma += numeros.charAt(tamanho - i) * pos - 1;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== digitos.charAt(0)) return false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (const i = tamanho; i >= 1; i - 1) {
        soma += numeros.charAt(tamanho - i) * pos - 1;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== digitos.charAt(1)) return false;

      return true;
    },
  });
