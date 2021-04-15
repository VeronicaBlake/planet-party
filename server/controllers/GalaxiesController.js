import BaseController from "../utils/BaseController";
import { galaxiesService } from "../services/GalaxiesService";

export class GalaxiesController extends BaseController {
    constructor() {
        super("api/galaxies");// you want moons to ge in a seperate collection of things by themselves. 
        this.router
            .get("", this.getAll)
            // .get("/:id/stars", this.getStarsByGalaxyId)
            // .get("/:id/planets", this.getPlanetsByGalaxyId)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.delete)
    }
    /**
     * Sends found galaxies to a client by request
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async getAll(req, res, next) {
        try {
            const galaxies = await galaxiesService.find(req.query) //REVIEW this lets queries be appended to the url some mongoose magic. 
            return res.send(galaxies); //REVIEW res.send?
        } catch (error) {
            next(error);
        }
    }
    // async getStarsByGalaxyId(req, res, next) {
    //     try {
    //         const stars = await starsService.find({ galaxy: req.params.id })//REVIEW I don't get this
    //         return res.send(stars);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    /**
     * Creates a value from request body and returns it
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async create(req, res, next) {
        try {
            const galaxy = await galaxiesService.create(req.body)
            res.send(galaxy);
        } catch (error) {
            next(error);
        }
    }
    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            let data = await galaxiesService.edit(req.body)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            let data = await galaxiesService.delete(req.params.id)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
}