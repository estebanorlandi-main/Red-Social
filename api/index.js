const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// PARA CARGAR DATOS
const DataUsers = require("../Mockups/DB_USERS.json");
const dataPosts = require("../Mockups/DB_Posts.json");
// const {User} = require('./src/db.js');
const { DB_userCreates, DB_postCreates } = require("./src/routes/utils.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    //CARGA DE DATOS
    DB_userCreates(DataUsers);
    //Descomentar esta linea para cargar los post
    DB_postCreates(dataPosts);
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
