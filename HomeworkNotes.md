- Create a repository
- Initialise the repository
- node modules,package.json,package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test,/hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ and ~)

- initialise git
- gitignore
- create a remote repo on github
- Push all code to remote origin
- Play with routes and routes extensions ex /hello,  /, /hello/2 , /xyz
- Orders of the route matters a lot
- Install postman app and make a workspace/Collection test API call.
- http method- GET,POST,PUT,DELETE,PATCH and other and types of APIS REST, graphQL etc and http status code
- write logic to handle GET,POST,PATCH,DELETE APIS calls and test them on POSTMAN.
- Explore routing and use of ?,+,(),* in the routes.
- Use of regex /a/, /*fly$/
- Reading the query params in the route
- Reading the dynamic route

- Multiple route handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route",r1,[r2,r3],r4,r5)
- What us middleware
- How express js basically handles requests behind the scenes
- Difference between app.use and app.all
- write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes except /user/login
- Error handling app.use("/",(err,req,res,next)={});

- Create a free cluster on mongodb official website(Mongo Atlas)
- Install mongoose library
- Connect your application to the database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application to 7777
- Create a userSchema & userModel
- Create a POST /signup API to add data to database
- Push some documents using API calls from POSTMAN
- Error handling using try and catch

- difference between js objects and JSON
- Add the express.json middleware to your app
- make your sign up API dynamic to receive data from the end user.
- User.findOne with duplicate email,ids which object returned
- API get user by email
- API -Feed API-GET/feed - get all the users from the database
- API get user by id
- Create a delete user API
- Difference between PUT and PATCH
- API -Update a user
- Explore the mongoose Documention for models method
- What are the options in a model.findOneAndUpdate method,explore more about it.
- API update the user by emailID.

- Explore schemaType options from the document
- add required,unique,lowercase,min,maxLength,trim
- Add default in schema
- Create a custom validate function for gender
- Improve the db schema - Put all approate validations on each field in schema
- Add timestamps to the user Schema
- Add api level validation on PATCH request signup POST API
- Data sanitizing - Add API validation for each field
- Install validator
- Explore validator library function and use validator functs for password,email,URL
- NEVER TRUST req.body

- Validate data in signup API
- Install bcrypt package
- Create passwordHash using bcrypt.hash & save the user in excrupted password
- Create login API
- Compare password and throw errors if email or password is invalid.

- Install cookies
- just send a dummy cookie to user
- Create GET /profile API and check if you get the cookie back
- Install jsonwebtoken
- In login API,after email and password validation,create a JWT token and send it to user in cookies
- read the cookies inside your profile API and find the loggedin user
- userAuth middleware
- add the userAuth middleware in profile and a new sendConnectionRequest API
- set the expiry of JWT token and cookies to 7 days and disadvantage of not expiry the token or cookie when we login in cybercafe others computers
- Create userSchema method to create JWT
- Create userschema method to compare password

- Explore tinder APIS
- Create a list of all API you can think of in DEV TINDER
- Group multiple routes under respective routers.
- Read documentation for Express.Router
- Create route folfer for managing auth,profile,request routers
- Create authRouter,profileRouter,requestRouter
- Import these router in app.js
- Create POST/logout api
- Create PATCH/profile/edit 
- Create PATCH/profile/password API => forgot password API
- Make sure you validate all the data in every POST,PATCH APIs

- Create connection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about all corner cases
- $or and $and query in mongoose:https://www.mongodb.com/docs/manual/reference/operator/query/or/
- schema.pre("save function")
- Read more about indexes in mongodb
- Why do we want index in mongodb?
- What is the advantages and disadvantages of creating indexing?
- Read this article about compound indexes-https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES.

- Write code with proper validation for POST /request/review/:status:/reuqestId
- Thought Process -POST VS GET
- Read about ref and populate : https://mongoosejs.com/docs/populate.html
- Create GET /user/request/received with all the checks
- Create GET /user/connections

- Logic for GET /feed API
- Explore the $nin(not in array),$and , $ne(not equal to) and other query operators
- pagination

- Manage multiple environement (how we do it for local & production in single repo):https://www.npmjs.com/package/dotenv

NOTES
/feed?page=1&limit=10 =>1-10 => .skip(0) & .limit(10)
/feed?page=2&limit=10 =>11-20 => .skip(10) & .limit(10)
/feed?page=3&limit=10 =>21-30 => .skip(20) & .limit(10)
/feed?page=4&limit=10 =>31-40 => .skip(30) & .limit(10)
 so skip=(page-1)*limit
