***
***
# #DEMO APP
***
***

1. [APP OVERVIEW](#app-overview)
2. [LOCAL INSTALLATION](#local-installation)
    - [WSL2](#wsl2)
3. [RUN LOCALLY](#run-locally)
4. [USED TECHNOLOGIES](#used-technologies)
5. [APP FEATURES](#app-features)

***
***
## APP OVERVIEW

Demo App for human resource management - employees management and absence request control
***
***
## LOCAL INSTALLATION

<h3>WSL2</h3>

1. **Clone the repository:**
```bash
$ git clone https://github.com/georgirtodorov/hr-app-review.git
```

2. **Prepare .env and docker-compose.yml:**

```bash
$ cd hr-app-review
$ cp .env.example .env
$ cp docker-compose.local.example.yml docker-compose.yml
```
OPTIONAL: Configure email SMTP credentials, needed for app notifications. You can use free services like https://mailtrap.io
```bash
$ vim .env
#find and replace below
MAIL_HOST={your_email_host}
MAIL_PORT={sending_email_port}
MAIL_USERNAME={inbox_username}
MAIL_PASSWORD={inbox_password}
#save and exit: ESC + :wq 
```

3. **Build and run docker:**
```bash
$ docker-compose build && docker-compose up -d
$ cp docker-compose.local.example.yml docker-compose.yml
```

4. **Install Laravel dependencies inside the app container:**
```bash
$ docker exec -it hr-app_laravel_1 bash
$ composer i
#Back to Ubuntu, press `Ctrl + D`.
```
5. **Add permissions so docker can write in folders:**
```bash
$ sudo chown -R $USER:$USER vendor
$ chmod -R 777 vendor resources storage app/Console/Commands
```

6. **Install Laravel Passports:**
```bash
$ docker exec -it hr-app_laravel_1 bash
$ php artisan passport:keys
#Back to Ubuntu, press `Ctrl + D`.
```

7. **Rebuild the docker**
```bash
$ docker-compose down && docker-compose build && docker-compose up -d
```

8. **Manually add initial database data**
- Go to pma: [localhost:8080](http://localhost:8080)
- log with: username: **user** password: **user**
- **Import into pma data from database/db_for_dev_purposes.sql**

9. **Install angular dependencies**
```bash
$ cd resources/frontend/angular2
$ npm install --force
#(npm install --force fails , try clean cache and retry: $ npm cache clear --force. Unfortunately we need --force, because project was started with some angular template which I don't have time to fix, despite that template is used only in the side menu) 
```

10. **Install angular on locally**
```bash
$ ng serve 
```
***
***

## RUN LOCALLY
1. **Start docker**
```bash
$ docker-compose up -d 
```

2. **Start angular**
```bash
$ cd resources/frontend/angular2 
$ ng serve
```

3. **Locations**
    - web: [localhost:4200](http://localhost:4200)
      (email: **testmail@gmail.com** | password: **testtest**)
    - pma: [localhost:8080](http://localhost:8080)
      (user: **user** | password: **user**)


4. **Local build**
```bash
$ cd resources/frontend/angular2 
$ ng build --configuration local --base-href "/" --deploy-url=/assets/angular/ && cp ../../../public/assets/angular/index.html ../../views/angular.blade.php
```

5. **CORS ERROR**
    - If your CORS policy errors were triggered try clean cache and rebuild
```bash
$ docker exec -it hr-app_laravel_1 bash
$ composer dump-autoload
$ php artisan clear-compiled
$ php artisan config:clear
$ php artisan cache:clear
#Back to Ubuntu, press `Ctrl + D`.
$ docker-compose down && docker-compose build && docker-compose up -d
```

***
***

## USED TECHNOLOGIES
1. **Laravel**
    - Laravel-passports
    - Laravel-permissions
    - Middlewares
    - Cron
2. **Angular**
    - Guards
    - Interceptors
    - Pipes
    - Custom directive for permissions
3. **MySQL**
    - One-to-one and One-to-many relations

***
***

## APP FEATURES
1. **LOGIN**
- Protected with guard
- Reset password functionality

2. **REQUESTS**
- Show number of remaining days per employee
- Show number of pending requests per employee if any
- List in calendar
- Filter
- Register for someone else if you have the needed rights
- Register for yourself
- List is loaded based on your position
- After register or approve/decline data is populated in the calendar without refreshing
- Notification on request registered/approved/declined

![Requests](readme/requests.png)

- Pending request count or clicking on request from the calendar opens the request

![Request Pending](readme/pending_request.png)

3. **PROFILE**
- Profile data
- Picture
- Change password
- Requests tracking

4. **EMPLOYEES**
- Create/edit employees

5. **SETTINGS**
- Notifications settings
- Requests settings (types, holidays, remaining days estimation logic)

5. **ACCESS**
- Control permissions,roles,etc..

***
***
