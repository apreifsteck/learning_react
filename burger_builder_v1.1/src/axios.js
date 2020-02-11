import axios from 'axios'

const dbInstance = axios.create({
    baseURL: 'https://react-burger-builder-eee97.firebaseio.com/'
})

export default dbInstance;