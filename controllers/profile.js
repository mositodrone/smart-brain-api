const handleProfile = (req, res, db) => {
    const { id } = req.params;
   db.select('*').from('users').where({id})
    .then(user =>  {
    if (user.length) {
        res.json(user[0])
    } else {
        res.status(400).json('error getting user')
    }
})
    .catch(err => res.status(400).json('not found'))
    // if (!found) {
    //     res.status(400).json("no such user");
    // }
}

module.exports ={ 
 handleProfile
}