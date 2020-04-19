const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;


const Schema = new mongoose.Schema({
  // _id: => This is the hash!
  id: String,
  name: String,
  allow_following: Boolean,
  "description": String,
  "is_following": Boolean,
  "is_top_media_only": Boolean,
  "profile_pic_url": String,
  "edge_hashtag_to_media": Object,
  edge_hashtag_to_top_posts: Object,
  edge_hashtag_to_content_advisory: Object,
  edge_hashtag_to_related_tags: Object,
  edge_hashtag_to_null_state: Object
}, {
  timestamps: true, // creates createdAt and updatedAt
});

const Model = mongoose.model('hashtags', Schema);
module.exports = Model;
