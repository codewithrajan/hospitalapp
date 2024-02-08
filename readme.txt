# HospitalApp

HospitalApp is a web application for managing hospitals, patients, and psychiatrists. Follow the steps below to set up and run the application.

## Installation

1. **Clone the repository:**
   Go to the terminal
   git clone https://github.com/codewithrajan/hospitalapp.git
   cd hospitalapp

2. Install dependencies:
type npm install

3. Update database connection:
Open config/db.js and change the database connection line to:
DATABASE_URL=mongodb://localhost:27017/latice
like below
await mongoose.connect("mongodb://localhost:27017/latice");

4 Start the application:
terminal type
npm start

5 Setup MongoDB Compass:
Open MongoDB Compass.
Connect to your local MongoDB instance.
Open the latice database.
Import data from the database folder for collections: hospitals, patients, and psychiatrists.
for Import click on hospitals and import data and then select latice.hospitals ans same for patients and psychiatrists also

6 Fetch API data:
Open Postman or any backend programming tool.
For fetching hospital details, use the following URL (change hospitalid as needed):

Method: GET
URL: http://localhost:3000/api/3

In My database hospitalid exists between 1-22 so change according

For patient registration, use the following URL:

Method: POST
URL: http://localhost:3000/registration
Body: Form-data
Keys: patientid, name, address, email, phone, password, psychiatristid, photo (file)
Make sure to replace placeholders like localhost:3000, 3 (hospitalid), and others with your actual information.

7 Dependencies
express: Web framework for Node.js
mongoose: MongoDB object modeling tool
dotenv: Load environment variables from a file
multer: Middleware for handling file uploads
body-parser: Parse incoming request bodies
image-size: Get dimensions of images
nodemon: Monitor changes in your source code and restart the server


8 License
This project is free to anyone download and test it.


9
I have Hosted this application
website link
for hospital details
https://hospitalapp-u9j8.onrender.com/api/4

for registration
https://hospitalapp-u9j8.onrender.com/registration