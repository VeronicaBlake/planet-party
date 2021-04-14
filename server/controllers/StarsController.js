import BaseController from "../utils/BaseController";
import { starsService } from "../services/StarsService";

export class StarsController extends BaseController {
    constructor() {
        super("api/stars");
        this.router
            .get("", this.getAll)
            .get("/:id", this.getOne)
            // .get("/:id/planetss", this.getPlanetsByStarId)
            // .get("/:id/moons", this.getMoonsByStarId)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.delete) //REVIEW cascading delete? Orphan data?
    }
    /**
     * Sends found stars to a client by request
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async getAll(req, res, next) {
        try {
            const stars = await starsService.find(req.query) //REVIEW req.query? this is so we can search specifics, yea?
            return res.send(stars); //REVIEW res.send?
        } catch (error) {
            next(error);
        }
    }
    async findOne(id) {
        let data = await dbContext.Stars.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid Id")
        }
        return data
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
     * Creates a star from request body and returns it
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async create(req, res, next) {
        try {
            const star = await starsService.create(req.body)
            res.send(star);
        } catch (error) {
            next(error);
        }
    }
    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            let data = await starsService.edit(req.body)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            let data = await starsService.delete(req.params.id)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
}