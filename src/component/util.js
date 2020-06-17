export const cpfMask = value => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  export const cpfRemove = (val) => {
      return val.split('.').join('').split('-').join('')
  }

  export const dataBr = (val) => {
    return val.split('-').reverse().join('/')
  }

  export const dataPersist = (val) => {
    return val.split('/').reverse().join('-')
  }
