#Ras Pi Remote Garage Door Opener

##Motivation

My garage door remote was broken. So I had a Raspberry Pi laying around and you can guess what I did with it. :). This project is still under construction.

##Dependencies

Ras Pi GPIO require you to be root to access. Thanks to [gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin) for solving this issue.

Next you require node and npm you can use the following command to install Debian base systems:

    sudo apt-get install nodejs npm

To check the version of node and npm use the following code I have 6.3.1 for node and 3.10.3 for npm at the time of development:

    node -v
    npm -v

##Installation:

To install my project clone this repo:

    git clone https://github.com/virushan/nodegarageDoorOpener.git
    cd nodegarageDoorOpener

To install node dependencies:

    npm update

To start your server:

    npm start


##API Reference:

Open http://localhost:3000/api after running npm start. All the available apis and documents on how to use them are available for you as reference. This will be changing in future.
```javascript
    [
                {
                    url: "/",
                    method: "GET",
                    description: "app information.",
                },
                {
                    url: "/api",
                    method: "GET",
                    description: "api reference.",
                },
                {
                    url: "/api/todo",
                    method: "GET",
                    description: "todo list.",
                },
                {
                    url: "/api/config/gpio",
                    method: "GET",
                    authentication: 'bearer',
                    description: "gpio information.",
                },
                {
                    url: "/api/config/notification",
                    method: "GET|PUT",
                    authentication: 'bearer',
                    put: "{data: obj}",
                    description: "email notification configuration.",
                },
                {
                    url: "/api/system",
                    method: "GET|PUT",
                    authentication: 'bearer',
                    put: "{command: 'reboot|reset'}",
                    description: "device information. app soft restart or system reboot.",
                },
                {
                    url: "/api/doors",
                    method: "GET|PUT",
                    put: "{state: 'open|close'}",
                    authentication: 'bearer',
                    description: "get all door status information or put call to open\\close doors.",
                },
                {
                    url: "/api/doors/history",
                    method: "GET",
                    authentication: 'bearer',
                    description: "get all door history.",
                },
                {
                    url: "/api/door/{id}",
                    method: "GET|PUT",
                    put: "{state: 'open|close'}",
                    authentication: 'bearer',
                    description: "get door status information or put call to open\\close door.",
                },
                {
                    url: "/api/door/{id}/history",
                    method: "GET",
                    authentication: 'bearer',
                    description: "door access history.",
                }
            ]
```

##TODO:

Open [TODO](http://localhost:3000/api/todo) All to do items are available for you here.

- [ ] Code refactoring & design patterns.
- [ ] BDD/TDD.
- [x] Scope of the project.
- [x] Setup api style.
- [ ] Setup socket api.
- [x] Logic for garage door opener.
- [x] Send notification email or sms.
- [x] Check open/close state.
- [ ] oAuth authentication.
- [ ] Device status and commands to reboot device or start app.
- [ ] Close garage door after car leave/enter.
- [ ] Close garage door if left open for long.
- [ ] Stop closing/open the door when interruption is send.
- [ ] Hybrid app to open/close doors.
- [ ] Add remote server for non wifi/remote communication.


