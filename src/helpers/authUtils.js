import jwtDecode from 'jwt-decode';
import { decodeToken } from 'react-jwt'
/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }

    try {
        const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        console.warn('access token expired');
        return false;
    }
}

/**
 * Sets the logged in user
 */
const setLoggedInUser = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
}

/**
 * Returns the logged in user
 */
const getLoggedInUser =  () => {
    const token = localStorage.getItem('authUser');
    if (token) {
        const tokens = JSON.parse(token);
        const user = decodeToken(tokens.accessToken);
        // console.log(user.user)
        return { user: user.user, token: tokens.accessToken };
    }
    else {
        return null
    }
}

export { isUserAuthenticated, setLoggedInUser, getLoggedInUser };