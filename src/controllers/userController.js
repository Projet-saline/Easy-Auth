exports.signIn = (req, res) => {
    res.send('Signin route');
};

exports.signUp = (req, res) => {
    res.send('Signup route');
};

exports.signOut = (req, res) => {
    res.send('Signout route');
};

exports.currentUser = (req, res) => {
    res.send('Current user route');
};