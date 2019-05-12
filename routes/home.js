var express = require('express');
var router = express.Router();

var itemsModel = require('./../schemas/items');

const paramsHelper = require('./../helper/params');
const utilsHelper = require('./../helper/utils');

/* GET home page. */
router.get('(/:status)?', function(req, res, next) {

  let condition = {};
   
  let currentStatus = paramsHelper.getParams(req.params, 'status', '');

  let statusFilter = utilsHelper.createFilterStatus(currentStatus);

  let keyWord = paramsHelper.getParams(req.query, 'keyWord', '');

  let from = paramsHelper.getParams(req.query, 'from', '');
  let minPrice = parseInt(from.split(".").join(""));

  let to = paramsHelper.getParams(req.query, 'to', '');
  let maxPrice = parseInt(to.split(".").join(""));


  //pagination
  let pagination = {
    itemsTotal : 1,
    totalItemsPerPage : 5,
    currentPage: 1,
    pagesRange : 3
  }

  pagination.currentPage = parseInt(paramsHelper.getParams(req.query,'page', 1));

//condition for search and filter
//thong-tin-chi-tiet
router.get('/thong-tin-chi-tiet/:id', (req, res, next) => {
  let id = paramsHelper.getParams(req.params, 'id', '')

  itemsModel.findById(id, (err, item) => {
    res.render('page/product-detail/index', { 
      title: 'thông tin chi tiết sản phẩm',
      item,
      id,
      
   });
  });
});


module.exports = router;
