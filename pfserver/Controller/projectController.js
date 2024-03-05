const projects = require('../models/projectSchema')

// add project


exports.addProject = async (req, res) => {
    console.log("inside addProjectController");
    const userId = req.payload
    console.log(userId);
    const projectImage = req.file.filename;
    console.log(projectImage);
    const { title, language, github, website, overview } = req.body
    try {
        const existingProject = await projects.findOne({ github: github })
        if (existingProject) {
            res.status(406).json("project already exist,Upload a new one ")
        }
        else {
            const newProject = new projects({
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectImage: projectImage,
                userId: userId
            })
            await newProject.save()
            res.status(200).json("project added successfully")
        }
    } catch (err) {
        res.status(401).json("unable to add project due to ", err)
    }

}

exports.getHomeProject = async (req, res) => {

    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
    catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.getAllProjects = async (req, res) => {
    //getting value from query parameter
    //syntax:req.query.va;ue
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        language: {
            //regular expression regex
            //1=to remove case sensitivity

            $regex: searchKey, $options: 'i'
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)

    }
    catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.getUserProjets = async (req, res) => {

    const userId = req.payload
    try {
        const userProject = await projects.find({ userId: userId })
        res.status(200).json(userProject)
    }
    catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}
exports.editUserProject = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    console.log("project id", id);
    console.log("userId", userId);
    const { title, language, github, website, overview, projectImage } = req.body
    const uploadProjectImage = req.file ? req.file.filename : projectImage
    try {
        const updateProject = await projects.findByIdAndUpdate({ id: id },
            {
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectImage: uploadProjectImage,
                userId: userId
            },
            { new: true }
        )
        await updateProject.save()
        res.status(200).json("Project updated successfully")

    } catch (err) {
        res.status(401).json("Usable to update project due to :", err)
    }
}
exports.deleteUserProject = async (req, res) => {
    const { id } = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json("project deleted successfully")
    }
    catch (err) {
        res.status(401).json("delete failed", err)
    }
}
