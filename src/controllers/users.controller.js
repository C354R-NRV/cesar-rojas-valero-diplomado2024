async function getUsers(req, res){
    res.send('lista de usuarios');
}
async function createUsers(req, res){
    res.send('crear usuario');
}

export default {
    getUsers, 
    createUsers,
}