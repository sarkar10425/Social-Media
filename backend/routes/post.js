const express = require("express");
const { requireSignIn } = require("../controllers/auth");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  singlePost,
  like,
  unlike,
  comment,
  uncomment
} = require("../controllers/post");
const { userById } = require("../controllers/user");
const validator = require("../validators/index");

const router = express.Router();

router.get("/posts", getPosts);

//like unlike
router.put("/post/like", requireSignIn, like)
router.put("/post/unlike", requireSignIn, unlike)

// comments
router.put("/post/comment", requireSignIn, comment)
router.put("/post/uncomment", requireSignIn, uncomment)


router.post(
  "/post/new/:userId",
  requireSignIn,
  createPost,
  validator.validatePostRequests,
  validator.isRequestValidated
);
router.get("/posts/by/:userId", requireSignIn, postsByUser);
router.get("/post/:postId", singlePost)
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);

//photo
router.get("/post/photo/:postId", photo);


// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

// any route containing :userId, our app will first execute postByID()
router.param("postId", postById);

module.exports = router;
