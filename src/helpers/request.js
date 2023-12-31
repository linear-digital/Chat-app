const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
// const url = "http://localhost:4000/api"
const url = "http://localhost:4000/api"

export const headers = {
    'Content-Type': 'application/json',
    "access_token": JSON.parse(localStorage.getItem("authUser")).accessToken
}

const getData = async (path) => {
    const response = await fetch(`${url}${path}`, {
        method: METHODS.GET,
        headers: headers
    })
    const data = await response.json()
    return data
}

const updateData = async ( path, newData) => {
    const response = await fetch(`${url}${path}`, {
        method: METHODS.PUT,
        headers: headers,
        body: JSON.stringify(newData)
    })
    const data = await response.json()
    return data
}
const postData = async ( path, newData) => {
    const response = await fetch(`${url}${path}`, {
        method: METHODS.POST,
        headers: headers,
        body: JSON.stringify(newData)
    })
    const data = await response.json()
    return data
}


const request = { getData, updateData, postData }

export default request