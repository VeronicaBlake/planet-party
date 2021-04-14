import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class StarsService { //REVIEW How do we know which functions to create in the service?
    async find(query = {}) {
        return await dbContext.Stars.find(query)
    }
    async findOne(id) {
        let data = await dbContext.Stars.findOne(id)
        if (!data) {
            throw new BadRequest("Invalid ID - Stargate Closed")
        }
        return data
    }
    async create(body) { //REVIEW body because it's what's getting passed by the client, yea?
        return await dbContext.Stars.create(body)
    }
    async edit(body) {
        let data = await dbContext.Stars.findByIdAndUpdate({ _id: body.id }, body, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID - Stargate Closed")
        }
        return data
    }
    async delete(id) {
        let data = await dbContext.Stars.findOneAndDelete({ _id: id }) //REVIEW what's going on in the perens?
        if (!data) {
            throw new BadRequest("Invalid ID - Stargate Closed")
        }
        return "Stargate Link Deleted"
    }
}

export const starsService = new StarsService();