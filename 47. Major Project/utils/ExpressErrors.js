module.exports = class ExpressError extends Error {
    constructor(status,message){
        super()
        this.statusCode = status
        this.message = message
    }
}