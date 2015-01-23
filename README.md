# [Qlip](https://assembly.com/qlip)

This is a **Work in Progress** and **not** ready for use.

Qlip helps you move data like magic. If you want to copy a text from your phone to your PC.
Or even a song from your phone to your iPod. You just copy from one device then paste it on another.

Qlip also helps you move little pieces of data between you and your friends. When you copy something 
it generously asks you whether if to paste it onto your friends' devices.

Qlip is so tiny it wont even bother you. Some people use it everyday but have forgotten that it's there.
Because it runs in the background.

<a href="https://assembly.com/qlip/bounties">
<img src="https://asm-badger.herokuapp.com/qlip/badges/tasks.svg" height="24px" alt="Open Tasks" />
</a>   
Qlip is an [Assembly](http://assembly.com) Project.

## Getting Started
If you want to setup a standalone Qlip server read below instructions.

* You need to have `node` and `npm` installed before you can proceed.
* Browse to the directory you to setup Qlip into. e.g. Your home `cd ~/`
* Clone this repository. `git clone git@github.com:asm-products/qlip.git`
* Create a database named `qlip_dev` in your MySql (e.g. using *phpMyAdmin*)
* Create a copy of `settings.example.js` and name it `settings.js`, in the same directory.
* Edit `settings.js` content, (under `development` block if you're testing locally):
  * Add your MySql username and password into `settings.js`
  
      ```js
      {
        // ...
        "database_username": "Username",
        "database_password": "Password",
        // ...
      }
      ```
      
  * Create your own Google Client ID under [Google Developers Console](https://console.developers.google.com) and put your credentionals like below. Don't forget to add `http://localhost:8080/auth/google/callback` into allowed callbacks in google's console.
  
      ```js
      {
        // ...
        "google_client_id": "xxxxxxx",
        "google_client_secret": "xxxxxx",
        // ...
      }
      ```
      
* Run **`npm start`**.
  * This command will automatically run `npm install` and `bower install`. But if you ran into problems you can run these 2 commands manually before trying `npm start`.


## How does it work?
1. Go to Qlip dashboard, add your devices.
2. Copy something on your phone.
3. Paste it on your PC.
4. Or vice versa.

## Roadmap
- [x] Register the project in Assembly.
- [x] Create an MVP for Qlip **Website**. (Sign-up with Google, Dashboard)
- [ ] Create an MVP for Qlip **Station**. Station is a Node.js entity responsible for real-time communication between devices.
- [ ] Create an MVP for Qlip **linux agent**. This is a compiled Node.js app which runs on linux systems and communicates with Station.  
- [ ] Create an MVP for Qlip **android agent**. Communicates with station.   
- [ ] Add support for transferring regular **files** using Qlip. I think it should have size limit.   
- [ ] Add basic **social** functions. Ask whom to send, right after something is being copied. It's interface should NOT bother the user.
- [ ] Create **Windows** agent.
- [ ] Create **iOS** agent.
- [ ] Create **Mac** agent.

## License
AGPLv3 [Read about it here.](LICENSE)
