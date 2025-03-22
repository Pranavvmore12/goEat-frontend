const userService = require("../services/user.service");


module.exports = {
    getUserProfileHandler: async (req, res) => {
        try {
            const jwt= req.headers.authorization?.split(' ')[1];
            
            const user = await userService.findUserProfileByJwt(jwt);
            user.password = null; 
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
};
