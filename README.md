Kolbe API
----

[![Build Status](https://travis-ci.org/garciadiazjaime/api-kolbe.svg)](https://travis-ci.org/garciadiazjaime/api-kolbe)

Run project:
----
a) let's install all packages:

`npm install`

b) let's run dev server

`npm run webpack`
`npm run dev`

By default server will run on http://127.0.0.1:3000/

Login rch
rhc -l setup email

Remove Cartridge
http://stackoverflow.com/questions/31323791/how-do-you-delete-a-database-cartridge-on-an-openshift-app

Setting up Envs
rhc env set DB_NAME=value -a app
rhc env set DB_USER=value -a app
rhc env set DB_PASSWORD=value -a app
rhc env set DJANGO_SETTINGS_MODULE=settings.prod -a app
rhc env set SENDGRID_API_KEY=value -a app
rhc env set NPM_CONFIG_PRODUCTION=true -a app

Checking Envs
rhc env list -a app

Code to increase jslint max line length limit
/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


Queries
db.parent.drop()
db.student.drop()
db.parentStudent.drop()
db.groupStudent.drop()

db.parent.find().pretty()
db.student.find().pretty()
db.parentStudent.find().pretty()
db.groupStudent.find().pretty()

db.user.insert({email: 'santafe-preescolar-1roa@irk.mx', password: '1roa', role: 2, entityId: '58fbde6f393b1b1bd8536ad2' })
db.user.insert({email: 'santafe-preescolar@irk.mx', password: 'preescolar', role: 1, entityId: '58fbde6f393b1b1bd8536ad0' })
db.user.insert({email: 'santafe@irk.mx', password: 'santafe', role: 0, entityId: '58fbde6f393b1b1bd8536acf' })
