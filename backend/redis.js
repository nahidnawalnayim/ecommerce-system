const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { getCache, setCache } = require('./caching');
const app = express();

//const { BASE_URL } = process.env;
const cacheKey = `getAll/`;

//Middleware
app.use(bodyParser.json());

//GET Posts
app.get('/getAll', async (req, res, next) => {
    try{
        const response = {};
        const cacheData = await getCache(cacheKey);
        if(cacheData) {
            response['message'] = 'cache hit';
            response['posts'] = JSON.parse(cacheData);
        }else {
            const result = await axios.get("https://nayimnahid.netlify.app/");
            const { data } = result;
            response['message'] = 'cache miss';
            response['posts'] = data;
            setCache(cacheKey, data);
        }
        res.status(200).send(response);
    }catch(err) {
        res.status(400).send(err);
    }
})

app.listen(8000, () => {
    console.log('redis server started!');
});