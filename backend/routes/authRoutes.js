const  express = require('express');
const router = express.Router() ;
const { registerUser , loginUser , logoutUser} = require('../controllers/authController') ;

// middle wares
const { protect } = require('../middlewares/authMiddleware') ;


router.post('/register' , registerUser) ;
router.post('/login' , loginUser) ;
router.post('/logout' , logoutUser) ;

router.get('/profile' , protect , (req,res) => {
    res.status(200).json({
        message : "you masde it pass the bouncer",
        user : req.user
    });
}) ;
    

module.exports = router ;