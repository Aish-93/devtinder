#DevtinderAPI

utils function for token verify bcrypt

##authRouter
-POST /sign
-POST /login
-POST /logout

##profileRouter

-GET /profile/view
-PATCH /profile/edit
-patch /profile/password

##connectionRequestRouter
-POST /request/send/intrested/:userId
-post /request/send/ignored/:userId

 above api will be one making it more dynamic
-POST /request/review/accepted/:userId
-POST /request/review/rejected/:userId


##userConnectionRouter or userRouter
-GET /user/connection
-GET /user/request/recieved
-GET /user/feed -Gets you the profile of other users on platform 

Status :ignored , interested , accepted, rejected


