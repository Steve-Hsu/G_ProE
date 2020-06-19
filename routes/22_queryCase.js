const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
// Not set up yet, for check the value entered by user at the some specific column
const { check, validationResult } = require('express-validator');

const Case = require('../models/20_Case');

// @route   GET api/case/query
// @desc    Sent back 10 record possible results.
// @access  Private
router.post('/', authUser, async (req, res) => {
  // Extract the value of the variable "query" in the form body
  const searchKeyword = req.body.query;
  try {
    // This query you may check : https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
    // Search for style
    const styles = await Case.aggregate(
      [
        // Match first to reduce documents to those where the array contains the match
        {
          $match: {
            style: { $regex: searchKeyword, $options: 'i' },
          },
        },

        // Unwind to "de-normalize" the document per array element
        { $unwind: '$style' },

        // Now filter those document for the elements that match
        {
          $match: {
            style: { $regex: searchKeyword, $options: 'i' },
          },
        },

        // Group back as an array with only the matching elements
        {
          $group: {
            _id: '$_id',
            style: { $first: '$style' },
            client: { $first: '$client' },
            userName: { $first: '$userName' },
          },
        },
      ],
      function (err, results) {}
    )
      .sort({ date: -1 }) //The new one will show on the top.
      .limit(10); // Return maximum 10 matched items

    //If find sth then directly return the result to client
    if (styles.length > 0) {
      return res.json(styles);
    }

    const clients = await Case.aggregate(
      [
        // Match first to reduce documents to those where the array contains the match
        {
          $match: {
            client: { $regex: searchKeyword, $options: 'i' },
          },
        },

        // Unwind to "de-normalize" the document per array element
        { $unwind: '$client' },

        // Now filter those document for the elements that match
        {
          $match: {
            client: { $regex: searchKeyword, $options: 'i' },
          },
        },

        // Group back as an array with only the matching elements
        {
          $group: {
            _id: '$_id',
            style: { $first: '$style' },
            client: { $first: '$client' },
            userName: { $first: '$userName' },
          },
        },
      ],
      function (err, results) {}
    )
      .sort({ date: -1 }) //The new one will show on the top.
      .limit(10); // Return maximum 10 matched items

    if (clients.length > 0) {
      return res.json(clients);
    }

    const userNames = await Case.aggregate(
      [
        // Match first to reduce documents to those where the array contains the match
        {
          $match: {
            userName: { $regex: searchKeyword, $options: 'i' },
          },
        },

        // Unwind to "de-normalize" the document per array element
        { $unwind: '$userName' },

        // Now filter those document for the elements that match
        {
          $match: {
            userName: { $regex: searchKeyword, $options: 'i' },
          },
        },

        // Group back as an array with only the matching elements
        {
          $group: {
            _id: '$_id',
            style: { $first: '$style' },
            client: { $first: '$client' },
            userName: { $first: '$userName' },
          },
        },
      ],
      function (err, results) {}
    )
      .sort({ date: -1 }) //The new one will show on the top.
      .limit(10); // Return maximum 10 matched items

    if (userNames.length > 0) {
      return res.json(userNames);
    }

    return res.json([{ style: 'Noting found' }]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
