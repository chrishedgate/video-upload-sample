# Example for uploading and showing videos using Panda

This very basic Node.js app uses Panda (http://www.pandastream.com) to upload and encode videos. The video files are stored on Amazon S3 (though Panda has support for Google Cloud, Rackspace Cloud Files and other options as well).

To be able to run the code requires an account at Panda to be setup, with the access key, secret key and cloud id present as environment variables. Also, for Panda to work an Amazon S3 account needs to exist (with permissions for Panda to manage files) and the bucket name and S3 url also needs to exist as environment variables. See the example.env file to use with Foreman for which environment variables are required.

To run the app locally, make sure everything is installed (Node, npm, npm install all modules) and run using Foreman (foreman start -e your-env-file-name.env). The app can also be uploaded to Heroku without any modifications (after creating the necessary environment variables of course).
