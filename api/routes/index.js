const express= require("express");

const router= express.Router();
const citiesController= require("../controllers/cities.controllers");

router.route("/cities")
        .get(citiesController.getAll);

router.route("/cities/search")
        .get(citiesController.searchByCity);

router.route("/cities/:cityId")
        .get(citiesController.getOne);

module.exports= router;