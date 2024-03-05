

//path to resolve each client request


const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')
//1)import express
const express = require("express")

//create an obj for the class router in express
const router = new express.Router()

//3)define path

//syntax
//router.http-0request-method("path.to.resolve",()=>{
//how to resolve the request (constroller function)

//})
router.post('/user/register', userController.register)

//2)user login
router.post('/user/login', userController.login)

//3)add new project

router.post('/project/add', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject)

//4)get projects for home page
router.get('/project/home-project', projectController.getHomeProject)

//5)get all projects 
router.get('/project/all-project', jwtMiddleware, projectController.getAllProjects)

//6)get user project
router.get('/project/user-project', jwtMiddleware, projectController.getUserProjets)

//7)edit user project
router.put('/project/edit/:id', jwtMiddleware, multerConfig.single("projectimage"), projectController.editUserProject)

//8)delete user project
router.delete('/project/remove/:id', jwtMiddleware, projectController.deleteUserProject)


//4)export router
module.exports = router;