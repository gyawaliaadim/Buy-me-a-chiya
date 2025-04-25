![1](https://github.com/user-attachments/assets/c1cbb99e-9d0a-400b-baf2-f82529de5b79)


# Buy-me-a-chiya
Buy me a coffee clone with E-Sewa payment gateway.

To use it, make sure you have node js installed in your computer. Then: <br>
i) clone the git <br>
ii) Install MongoDB<br>
iii) and run this command: <br>
```
npm i
*Installs dependencies*
```
Now make a .env.local file in the root directory (inside buy-me-a-chiya-main folder), then inside of .env.local, insert these things: <br>
```
NEXT_PUBLIC_HOST=http://localhost:PORT
NEXT_PUBLIC_API_URL=http://localhost:PORT/api 
GITHUB_ID=*Your Github ID*
GITHUB_SECRET=*Your Github Secret*
MONGO_URI=mongodb://localhost:PORT
```
In of NEXT_PUBLIC_HOST & NEXT_PUBLIC_API, instead of PORT put the the port you get after you run
```
$ npm run dev

> buy-me-a-coffee-clone@0.1.0 dev
> next dev --turbopack

   ▲ Next.js 15.3.1 (Turbopack)
   - Local:        http://localhost:3000 <- this 3000 is your PORT
   - Network:      http://192.168.1.73:3000
   - Environments: .env.local

```
Which would probably be 3000,

After you install MongoDB and MongoDb compass, Connect it and put the port in MONGO_URI=mongodb://localhost:*The port, which would probably be 27017*
Now go to https://github.com/settings/developers<br>
And create a new OAuth app, then inside the Homepage URL put: http://localhost:PORT, and inside Authorization callback URL put: http://localhost:PORT/api/auth/callback/github and save it.<br>
Then you will get Client ID, then generate a Client Secret. Then: <br>
In
```
GITHUB_ID:*The Client ID you got*
GITHUB_SECRET:*The Client Secret you got*
```

Now if you are already running the server, turn it off by clicking Ctrl+C or just deleting the terminal from VS Code. Then run this commands and click in the place given below:
```
npm run dev

> buy-me-a-coffee-clone@0.1.0 dev
> next dev --turbopack

   ▲ Next.js 15.3.1 (Turbopack)
   - Local:        http://localhost:3000 <-click here
   - Network:      http://192.168.1.73:3000
   - Environments: .env.local
```
Finally, you can use the app with no problems.

<br>
<h1>Images</h1> 

![2](https://github.com/user-attachments/assets/9c48b0bf-9f16-4392-92e7-b14e51403e1f)
![3](https://github.com/user-attachments/assets/b7d4a299-929f-4147-8e50-36b229f3466e)
![4](https://github.com/user-attachments/assets/b2554686-b3ff-48da-b580-69857b98738f)
![5](https://github.com/user-attachments/assets/32724c4f-8603-49ec-b353-3e5c970796d2)
![7](https://github.com/user-attachments/assets/24f0840b-90a5-46b4-ae98-c2931dab5e5c)
![8](https://github.com/user-attachments/assets/ffbc02f1-fd3e-431b-a3d5-98c2e5835ee5)
![9](https://github.com/user-attachments/assets/a8a52de6-25e6-4dd0-acf2-cf779ff612a5)
![12](https://github.com/user-attachments/assets/cb6a75e8-c892-40f5-aeda-38141c40092a)


# -Aadim Gyawali
