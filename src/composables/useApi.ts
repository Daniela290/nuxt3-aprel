import axios from 'axios'

export const useApi = () => {
    const baseURL = 'https://dummyjson.com/'

    return axios.create({
        baseURL,
    })
}