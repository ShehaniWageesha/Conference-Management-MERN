const Reviews = require('../models/reviewer.model');

const addDecisions = async (req, res) => {
  if (req.body) {
    const Reviews = new Reviews(req.body);
    await Reviews.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

// const updateReviwe = async (req, res, next) => {
//   await Reviews.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error);
//     } else {
//       res.json(data)
//       console.log('Reviews Decision updated successfully !')
//     }
    
// })
// }

const deleteReview = async(req, res, next) => {
    await Reviews.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({ error: error.message });
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
})
}

const getAllReviews = async (req, res) => {
  await Reviews.find({}).populate('Reviews', 'title description author research decisions')
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}

module.exports = {
    addDecisions,
    deleteReview,
    getAllReviews,
};