const {DataTypes,Sequelize} = require('sequelize');
const UserSchema=require('./schemas/user.schema');

const sequelize = new Sequelize('adminpanel_db','root','', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const connection  = {}
connection.sequelize = sequelize;

connection.user = UserSchema(sequelize,DataTypes);


sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to synchronize database:', err);
  });
  
module.exports = connection;

