import data from '../../data.json'

export const getDataLocalStorage =  ( ) => {
    const dataMain = localStorage.getItem('data')
    return dataMain ? JSON.parse(dataMain) : data
}