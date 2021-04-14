import { BadRequest } from "../utils/Errors";
import { dbContext } from "../db/DbContext";

class GalaxiesService { //REVIEW How do we know which functions to create in the service?
    async find(query = {}) {
        return await dbContext.Galaxies.find(query)
    }
    async findOne(id) {
        let data = dbContext.Galaxies.findOne(id)
        if (!data) {
            throw new BadRequest("Invalid ID - Stargate Closed")
        }
        return data
    }
    async create(body) { //REVIEW body because it's what's getting passed by the client, yea?
        return await dbContext.Galaxies.create(body)
    }
    async edit(body) {
        let data = await dbContext.Galaxies.findByIdAndUpdate({ _id: body.id }, body, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID - Stargate Closed")
        }
        return data
    }
    async delete(id) {
        let data = await dbContext.Galaxies.findOneAndDelete({ _id: id }) //REVIEW what's going on in the perens?
        if (!data) {
            throw new BadRequest("Invalid ID - Stargate Closed")
        }
        return "Stargate Link Deleted"
    }
}

export const galaxiesService = new GalaxiesService();