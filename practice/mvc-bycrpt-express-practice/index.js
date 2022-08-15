const express = require('express');



// Express 
const app = express();


// Server start config
const PORT = process.env.PORT || 4111
app.listen(PORT, console.log(`Sever started on ${PORT}`));