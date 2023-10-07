const mongoose = require('mongoose');
const Listing = require('../models/listing');

const listingRouter = require("express").Router();

listingRouter.get('/', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index", { allListings });
})

listingRouter.post('/', async (req, res) => {
    const newListing = new Listing(req.body)
    await newListing.save()
    res.redirect("/listings")
})

listingRouter.get('/:id', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("place", { place:listing });
})

listingRouter.get('/edit/:id', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("edit", { place:listing });
})

listingRouter.patch('/:id', async (req, res) => {
    // await Listing.findByIdAndUpdate( {_id:req.params.id} , {$set: req.body} , {new:true} ).then(res=>console.log(res))
    await Listing.findByIdAndUpdate( req.params.id , {$set: req.body})
    // res.redirect(`/listings/${req.params.id}`)
    res.redirect(`/listings`)
})

listingRouter.delete('/:id', async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
})

module.exports = listingRouter;