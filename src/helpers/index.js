

export const server_URL = "http://localhost:4000"

export const headers = {
    'Content-Type': 'application/json',
    "access_token": JSON.parse(localStorage.getItem("authUser")).accessToken
}

