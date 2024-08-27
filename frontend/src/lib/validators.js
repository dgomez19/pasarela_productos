const emailRE = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
const telephoneRE = /^(?!.*[()]{2})(?!.*[+.\- ]{2})[0-9()\-+ ]+$/
const numRE = /^\d+$/

export const required = val => (val !== null && val !== undefined && val !== '') || 'Este campo es obligatorio.'

// string validations
export const email = val => !val?.length || emailRE.test(val) || 'El correo electrónico ingresado no es un correo válido.'

export const telephone = val => !val?.length || telephoneRE.test(val) || 'El valor ingresado no es un número de teléfono.'

export const minLen = min => val => !val?.length || val.length >= min || `Este campo debe de contener mínimo ${min} caracter(es).`

export const maxLen = max => val => !val?.length || val.length <= max || `Este campo debe de contener máximo ${max} caracter(es).`

export const len = num => val => !val?.length || val.length === num || `Este campo debe de contener ${num} caracter(es).`

export const minMaxLen = (min, max) => val => [minLen(min)(val), maxLen(max)(val)].find(res => typeof res === 'string') ?? true

export const url = val => { // NOSONAR: is necessary to return a different type
  if (!val?.length) return true

  try {
    return !!(new URL(val))
  } catch (err) {
    return 'La url ingresada no es válida.'
  }
}

// numeric validations
export const numeric = val => !val?.length || numRE.test(val) || 'Este campo sólo permite números.'

export const minRange = min => val => !val?.length || val.length >= min || `Este campo debe de contener mínimo ${min} caracter(es).`

export const maxRange = max => val => !val?.length || val.length <= max || `Este campo debe de contener máximo ${max} caracter(es).`

export const minMaxRange = (min, max) => val => [minRange(min)(val), maxRange(max)(val)].find(res => typeof res === 'string') ?? true
