## SET UP ENVIRONMENT
[x] yarn init (set up files)
[x] yarn install (node modules)
[x] yarn add express, helmet, morgan 
[x] yarn add nodemon --dev
[x] yarn add dotenv
[x] yarn add knex sqlite3

[x] add script: 
 "scripts": {
    "server": "nodemon index.js",
    "start": "node index.js"
  },

## ORGANIZATION
[x] server file 
[x] index file 
[x] routes folder
    - routes files
[]migrations
    -projects
    -actions
[]knex file
- seeds files 

##MIGRATIONS (way to recreate your database to particular point in time)

- `npx knex` or  shows command list 
- run `npx  knex init` or ``yarn knex init ` to generate `knexfile.js`
- modify `knexfile.js` to config our db connections
- remove staging and production configs from `knexfile.js`
- run `npx knex migrate:make create_name_of_table` 
- make a migration for each db schema change 
- run `npx knex migrate:latest` to update changes made to table 
- SAVE FILES AND CHECK YOUR SERVER
- need to create a migration for every changes made, i.e. adding email or creating another table, etc
- `npx knex migrate:rollback` deletes last migration added 


##TO SEED

- `npx knex seed:make name of table 
- can add numbers to order seeds
- `npx knex seed: run`


