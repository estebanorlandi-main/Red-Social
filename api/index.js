const server = require('./src/app.js');
const { conn } = require('./src/db.js');


// PARA CARGAR DATOS
const DataUsers = require("../Mockups/DB_USERS.json")
// const {User} = require('./src/db.js');
const {DB_userCreates} = require("./src/routes/utils.js")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    //CARGA DE DATOS
    // DB_userCreates(DataUsers)
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
