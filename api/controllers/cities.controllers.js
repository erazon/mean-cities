const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);

const getAll = function (req, res) {
    let count = parseInt(process.env.DEFAULT_FIND_COUNT);
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);

    if(req.query.count && req.query.count<=process.env.DEFAULT_MAC_FIND_LIMIT){
        count = parseInt(req.query.count);
    }
    if(req.query.offset){
        offset = parseInt(req.query.offset);
    }

    // geo query
    let query = {};
    if(req.query.lng && req.query.lat){
        query = _generateGeoQuery(req.query.lng, req.query.lat);
    }

    City.find(query).skip(offset).limit(count).exec(function (err, cities) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: cities
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const searchByCity = function (req, res) {
    let city = req.query.city;

    City.find({city:city}).exec(function (err, cities) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: cities
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const cityId = req.params.cityId;
    City.findById(cityId).exec(function (err, city) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: city
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!city) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

const _generateGeoQuery =  function(lng, lat){
    lng = parseFloat(lng);
    lat = parseFloat(lat);

    const point = {type: 'Point', coordinates:[lng, lat]};
    const query = {
        "location.coordinates":{
            $near: {
                $geometry: point,
                $maxDistance: parseFloat(process.env.GEO_SEARCH_MAX_DIST),
                $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST)
            }
        }
    };
    return query;
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    searchByCity
};