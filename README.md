# Authentication-API
An Authentication API which utilizes Social Authentications.

Which when modified can serve as a microservice for authentication. Or bundled in the 
app like in the monolitic architecture of software development.
The oauths utilized are Google and Facebook, Twitter oauth V.2 doesn't provide user email
but the oauth v.1 does, which involves a little process.

So I did not utilize their oauth API since my use case i need the user email in to 
store in my database of users.

# Usage
1. Create a .env file in the root of the server
2. Add the variours env variables for your app. Note: you'd need to create an app with the various providers and obtain your app credentials
3. Run  npm install  
4. Run npm run dev

![image](https://github.com/RaqDeku/Authentication-API/assets/92717740/3f24722d-445a-4b06-91e0-b34a83694010)

Env Variables to add
