const express = require('express');
const path = require('path');
const UserRouter = require('./routers/userRouter');
const RatingRouter = require('./routers/ratingRouter');
const ToolRouter = require('./routers/toolRouter');
const bookmarkRoutes = require('./routers/bookMarkRouter');

const cors = require('cors');

//creating new expess app

const app = express();

const port = 5000;

//middleware
app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/user', UserRouter);
app.use('/rating', RatingRouter);
app.use('/tool', ToolRouter);
app.use('/bookmark', bookmarkRoutes);

// Serve static files from uploads directory


//routes or endpoints

app.get('/', (req, res) => {
       res.send('Hihihihih')
})

app.get('/add', (req, res) => {
       res.send('hihhi from add')
})

app.get('/getall', (req, res) => {
       res.send(' res from getall User router');
   });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})