import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
    if (!token) return true
    
    try {
        const { exp } = jwtDecode(token)
        if(!exp) {
            return true
        }

        return Date.now() >= (exp * 1000)
    } catch (error) {
        return true
    }
}

export default isTokenExpired