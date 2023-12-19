

export const server_URL = "https://openly-steady-chigger.ngrok-free.app"

export const headers = {
    'Content-Type': 'application/json',
    "access_token": JSON.parse(localStorage.getItem("authUser")).accessToken
}

