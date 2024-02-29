const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const ticketRoutes = require('./ticketRoutes');
module.exports = app =>{
    app.use(bodyParser.json());
    app.use(cors());  
    app.use(authRoutes)
    app.use(ticketRoutes)
    app.use(userRoutes)
}