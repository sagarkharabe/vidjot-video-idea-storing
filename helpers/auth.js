module.exports = {
    ensureAuthenticated : function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        console.log('Is not Authenticated')
        req.flash('error_msg','Not Authorised');
        res.redirect('/users/login');
    }
}