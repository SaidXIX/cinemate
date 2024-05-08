import Cookies from 'js-cookie'

export const getCookies = () => {
  const accessToken = Cookies.get('accessToken')
  const firstName = Cookies.get('firstName')
  const familyName = Cookies.get('familyName')
  return {
    accessToken,
    firstName,
    familyName
  }
}

export const setCookies = ({ accessToken, firstName, familyName }) => {
  Cookies.set('accessToken', accessToken, { expires: 7 })
  Cookies.set('firstName', firstName, { expires: 7 })
  Cookies.set('familyName', familyName, { expires: 7 })
}

export const removeCookies = () => {
  Cookies.remove('accessToken')
  Cookies.remove('firstName')
  Cookies.remove('familyName')
}
