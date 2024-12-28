# node_admin_with_jwt
Admin panel in Node.js with MongoDB, EJS, and JWT

# Steps

npm init -y

npm install express mongoose dotenv ejs bcryptjs jsonwebtoken cookie-parser express-session body-parser bcrypt

# Run the Application

node app.js

Visit http://localhost:3500/admin

# Generate Secure Strings with openssl

For JWT_SECRET

openssl rand -hex 32

For SESSION_SECRET

openssl rand -hex 32



