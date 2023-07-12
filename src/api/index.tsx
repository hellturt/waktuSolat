import axios from 'axios'

export const getTiming = (code: string, filter: number) => axios.get(`https://mpt.i906.my/mpt.json?code=${code}&filter=${filter}`)
export const getHijriDate = (date: string) => axios.get(`https://api.aladhan.com/v1/gToH/${date}`)