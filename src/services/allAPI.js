import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseUrl";

//1)reg user

export const registerAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "")
}

//2)login user

export const loginAPI = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "")


}
//3)add project
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI('post', `${BASE_URL}/project/add`, reqBody, reqHeader)
}

//4)get home project
export const homeProjectAPI = async () => {
    return await commonAPI('GET', `${BASE_URL}/project/home-project`, '', '')
}
//5)get all project
//search key is passed as query parameters
//path?key=value

export const allProjectAPI = async (searchKey, reqHeader) => {
    return await commonAPI('GET', `${BASE_URL}/project/all-project?search=${searchKey}`, '', reqHeader)
}

//6)get user project
export const userprojectAPI = async (reqHeader) => {
    return await commonAPI('GET', `${BASE_URL}/project/user-project`, '', reqHeader)
}

//7)update user project
export const editUserProjectAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/project/edit/${id}`, reqBody, reqHeader)
}

//8)delete a project
export const deleteProjectAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${BASE_URL}/project/remove/${id}`, {}, reqHeader)
}