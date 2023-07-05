import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/homeComments.css";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import CommentButton from "../components/CommentButton";
import Heart from "../resource/images/Heart.png";
import redHeart from "../resource/images/redHeart.png";
import LikeButton from "../components/LikeButton";
import annyPhoto from "../resource/images/annyPhoto.png";
import sarahPhoto from "../resource/images/sarahPhoto.png";
import jonnyPhoto from "../resource/images/jonnyPhoto.png";
import { BsArrowLeft } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

function CommentsPage({ darkLight }) {
  const [persons, setPersons] = useState([]);
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();


  // const [persons, setPersons] = useState([
  //   {
  //     profilImg: annyPhoto,
  //     name: "anny-wilson",
  //     position: "Marketing Coordinator",
  //     heartImg: Heart,
  //     redHeartImg: redHeart,
  //     comment:
  //       "lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor.lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor",
  //     tags: "#girl #girls #babygirl #girlpower #girlswholift #polishgirl #girlboss #girly #girlfriend #fitgirl #birthdaygirl #instagirl #girlsnight #animegirl #mygirl",
  //     feedbacks: [
  //       {
  //         img: sarahPhoto,
  //         name: "sarah_brisson",
  //         position: "Nursing Assistant",
  //         feedback:
  //           "lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur",
  //         likeCount: 576,
  //       },
  //     ],
  //     likeCount: 44389,
  //     commentCount: 26376,
  //     isLiked: false,
  //   },
  // ]);


  // =========== FETCH USER DATA ===========

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser([response.data]);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
      }
    };




    // =========== FETCH COMMENTS ===========

    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/comments");
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
    fetchComments();
  }, []);

  const toggleLike = (personIndex, feedbackIndex) => {
    setPersons((prevPersons) =>
      prevPersons.map((person, index) =>
        index === personIndex
          ? {
            ...person,
            feedbacks: person.feedbacks.map((feedback, i) =>
              i === feedbackIndex
                ? {
                  ...feedback,
                  likeCount: feedback.likeCount + (feedback.isLiked ? -1 : 1),
                  isLiked: !feedback.isLiked,
                }
                : feedback
            ),
          }
          : person
      )
    );
  };

  const addFeedback = (personIndex) => {
    if (inputValue) {
      setPersons((prevPersons) =>
        prevPersons.map((person, index) =>
          index === personIndex
            ? {
              ...person,
              feedbacks: [
                ...(person.feedbacks ? person.feedbacks : []),
                {
                  img: jonnyPhoto,
                  name: "andrew_nguyen",
                  position: "Dog Trainer",
                  feedback: inputValue,
                  likeCount: 0,
                  isLiked: false,
                },
              ],
              commentCount: person.commentCount + 1,
            }
            : person
        )
      );
    }
  };



  // =========== ADD A NEW COMMENT  ===========

  const createComment = async (postId, userId, content) => {
    try {
      const response = await axios.put(`/api/comments/${postId}`, {
        userId,
        content,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clickPostButton = (postId) => {
    const userId = user[0]._id;
    createComment(postId, userId, inputValue);
    setInputValue("");
    navigate("/commentspage");
  };

  return (
    <div className="commentPage-container">
      <header className="commentPage-header">
        <div className="commentsHeader-left">
          <Link to="/">
            <BsArrowLeft
              size={25}
              style={{ color: !darkLight ? "white" : "black" }}
              className="left-button-icon"
            />
          </Link>
          <h2>Comments</h2>
        </div>
        <button className="send-button">
          <BsSend size={20} style={{ color: !darkLight ? "white" : "black" }} />
        </button>
      </header>
      {user.map((person, personIndex) => (
        <div key={person._id}>
          <main>
            {user.map((person, index) => (
              <div key={person._id}>
                <section className="person-main-header-section">
                  <div className="person-left-side">
                    <img
                      src={person.avatar}
                      alt="photo1"
                      className="person-photo"
                    />
                    <div className="name-box">
                      <h3 className="name">{person.username}</h3>
                      <h5 className="position">{person.activity}</h5>
                    </div>
                  </div>
                  <Link to="/settingsPage" className="comment-button-section">
                    {darkLight ? (
                      <img src={commentButton1} alt="commentButton1" />
                    ) : (
                      <img src={commentButton2} alt="commentButton2" />
                    )}
                  </Link>
                </section>

                <section className="comment-section">
                {comments.map((comment) => (
              <div key={comment._id} className="comment-container">
                <img
                  src={person.avatar}
                  alt="avatar"
                  className="comment-avatar" // CSS-Klasse für Avatar-Styling
                />
                <p className="comment-box">{comment.content}</p>
              </div>
            ))}
                    

                </section>

                <section className="footer-section">
                  <LikeButton
                    person={person}
                    persons={persons}
                    setPersons={setPersons}
                    index={index}
                  />
                  <CommentButton darkLight={darkLight} person={person} />
                </section>
              </div>
            ))}

{/* <section className="feedbacks-section">
              {person.feedbacks.map((feedback, feedbackIndex) => (
                <div key={feedbackIndex} className="feedback-section">
                  <div className="person-box">
                    <div className="person-box-left">
                      <img
                        src={feedback.img}
                        alt="img"
                        className="person-photo"
                      />
                      <div className="name-box">
                        <p className="feedback-name">{feedback.name}</p>
                        <p className="feedback-position">{feedback.position}</p>
                      </div>
                    </div>
                    <Link to="/settingsPage" className="comment-button-section">
                      {darkLight ? (
                        <img src={commentButton1} alt="" />
                      ) : (
                        <img src={commentButton2} alt="" />
                      )}
                    </Link>
                  </div>
                  <p className="feedback-box">{feedback.feedback}</p>

                  <div className="feedback-footer">
                    <div
                      className="like-section"
                      onClick={() => toggleLike(personIndex, feedbackIndex)}
                    >
                      {feedback.isLiked ? (
                        <img src={person.redHeartImg} alt="redHeart" />
                      ) : (
                        <AiOutlineHeart size={30} />
                      )}
                      <p>{feedback.likeCount}</p>
                    </div>
                    <div
                      className="reply-button"
                      style={{ color: !darkLight ? "white" : "black" }}
                    >
                      Reply
                    </div>
                  </div>
                </div>
              ))}
            </section> */}
            <section className="feedback-write-section">
              <img
                src={person.avatar}
                alt="userimage"
                className="person-photo"
              />
              <input
                type="text"
                placeholder="Your comment"
                className="feedback-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={() => clickPostButton("post_id_here")}
                className="post-button"
                style={{ color: darkLight ? "red" : "white" }}
              >
                Post
              </button>
            </section>
          </main>
        </div>
      ))}
    </div>
  );
}

export default CommentsPage;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/homeComments.css";
// import commentButton1 from "../resource/images/commentButton1.svg";
// import commentButton2 from "../resource/images/commentButton2.svg";
// import CommentButton from "../components/CommentButton";
// import Heart from "../resource/images/Heart.png";
// import redHeart from "../resource/images/redHeart.png";
// import LikeButton from "../components/LikeButton";
// import annyPhoto from "../resource/images/annyPhoto.png";
// import sarahPhoto from "../resource/images/sarahPhoto.png";
// import jonnyPhoto from "../resource/images/jonnyPhoto.png";
// import { BsArrowLeft } from "react-icons/bs";
// import { BsSend } from "react-icons/bs";
// import { AiOutlineHeart } from "react-icons/ai";
// import axios from "axios";

// function CommentsPage({ darkLight }) {

//   // const [persons, setPersons] = useState([
//   //   {
//   //     profilImg: annyPhoto,
//   //     name: "anny-wilson",
//   //     position: "Marketing Coordinator",
//   //     heartImg: Heart,
//   //     redHeartImg: redHeart,
//   //     comment:
//   //       "lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor.lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor",
//   //     tags: "#girl #girls #babygirl #girlpower #girlswholift #polishgirl #girlboss #girly #girlfriend #fitgirl #birthdaygirl #instagirl #girlsnight #animegirl #mygirl",
//   //     feedbacks: [
//   //       {
//   //         img: sarahPhoto,
//   //         name: "sarah_brisson",
//   //         position: "Nursing Assistant",
//   //         feedback:
//   //           "lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur",
//   //         likeCount: 576,
//   //       },
//   //     ],
//   //     likeCount: 44389,
//   //     commentCount: 26376,
//   //     isLiked: false,
//   //   },
//   // ]);


//   // useEffect(() => {
//   //   axios
//   //     .get("/api/comments")
//   //     .then((response) => {
//   //       setPersons(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // }, []);

//   const [persons, setPersons] = useState([]);


//   // ========== FETCH USER DATA ==========

//   const [user, setUser] = useState([])

//   useEffect(() => {
//     const getUserProfile = async () => {
//       try {
//         const response = await axios.get('/api/user');
//         setUser([response.data]);
//         console.log(response);
//       } catch (error) {
//         console.error('Fehler beim Abrufen der Benutzerdaten', error);
//       }
//     };
//     // console.log(user);
//     getUserProfile();
//   }, []);


//   // ========== FETCH COMMENTS ==========
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/comments")
//       .then((response) => {
//         setComments(response.data);
//         console.log(response);

//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);


//   const [inputValue, setInputValue] = useState(null);

//   const toggleLike = (personIndex, feedbackIndex) => {
//     setPersons((persons) =>
//       persons.map((person, index) =>
//         index === personIndex
//           ? {
//             ...person,
//             feedbacks: person.feedbacks.map((feedback, i) =>
//               i === feedbackIndex
//                 ? {
//                   ...feedback,
//                   likeCount:
//                     feedback.likeCount + (feedback.isLiked ? -1 : 1),
//                   isLiked: !feedback.isLiked,
//                 }
//                 : feedback
//             ),
//           }
//           : person
//       )
//     );
//   };

//   const addFeedback = (personIndex) => {
//     if (inputValue) {
//       setPersons((persons) =>
//         persons.map((person, index) =>
//           index === personIndex
//             ? {
//               ...person,
//               feedbacks: person.feedbacks ? [...person.feedbacks] : [],
//               feedbacks: [
//                 ...person.feedbacks,
//                 {
//                   img: jonnyPhoto,
//                   name: "andrew_nguyen",
//                   position: "Dog Trainer",
//                   feedback: inputValue,
//                   likeCount: 0,
//                   isLiked: false,
//                 },
//               ],
//               commentCount: person.commentCount + 1,
//             }
//             : person
//         )
//       );
//     }
//   };

//   const createComment = async (postId, user, content) => {
//     try {
//       const response = await axios.put(`/api/comments/${postId}`, {
//         user,
//         content,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const clickPostButton = (postId) => {
//     createComment(postId, "andrew_nguyen", inputValue);
//     setInputValue("");
//   };

//   return (
//     <div className="commentPage-container">
//       <header className="commentPage-header">
//         <div className="commentsHeader-left">
//           <Link to="/">
//             <BsArrowLeft
//               size={25}
//               style={{ color: !darkLight ? "white" : "black" }}
//               className="left-button-icon"
//             />
//           </Link>
//           <h2>Comments</h2>
//         </div>
//         <button className="send-button">
//           <BsSend size={20} style={{ color: !darkLight ? "white" : "black" }} />
//         </button>
//       </header>
//       {user.map((person, personIndex) => (
//         <div key={personIndex}>
//           <main>
//             {user.map((person, index) => (
//               <div key={index}>
//                 <section className="person-main-header-section">
//                   <div className="person-left-side">
//                     <img
//                       src={person.avatar}
//                       alt="photo1"
//                       className="person-photo"
//                     />
//                     <div className="name-box">
//                       <h3 className="name">{person.username}</h3>
//                       <h5 className="position">{person.activity}</h5>
//                     </div>
//                   </div>
//                   <Link to="/settingsPage" className="comment-button-section">
//                     {darkLight ? (
//                       <img src={commentButton1} alt="commentButton1" />
//                     ) : (
//                       <img src={commentButton2} alt="commentButton2" />
//                     )}
//                   </Link>
//                 </section>

//                 <section className="comment-section">
//                   {comments.map((comment, index) => (
//                     <p key={index} className="comment-box">{comment.content}</p>
//                   ))}
//                 </section>

//                 <section className="footer-section">
//                   <LikeButton
//                     person={person}
//                     persons={persons}
//                     setPersons={setPersons}
//                     index={index}
//                   />
//                   <CommentButton darkLight={darkLight} person={person} />
//                 </section>
//               </div>
//             ))}
//             {/* <section className="feedbacks-section">
//               {person.feedbacks.map((feedback, feedbackIndex) => (
//                 <div key={feedbackIndex} className="feedback-section">
//                   <div className="person-box">
//                     <div className="person-box-left">
//                       <img
//                         src={feedback.img}
//                         alt="img"
//                         className="person-photo"
//                       />
//                       <div className="name-box">
//                         <p className="feedback-name">{feedback.name}</p>
//                         <p className="feedback-position">{feedback.position}</p>
//                       </div>
//                     </div>
//                     <Link to="/settingsPage" className="comment-button-section">
//                       {darkLight ? (
//                         <img src={commentButton1} alt="" />
//                       ) : (
//                         <img src={commentButton2} alt="" />
//                       )}
//                     </Link>
//                   </div>
//                   <p className="feedback-box">{feedback.feedback}</p>

//                   <div className="feedback-footer">
//                     <div
//                       className="like-section"
//                       onClick={() => toggleLike(personIndex, feedbackIndex)}
//                     >
//                       {feedback.isLiked ? (
//                         <img src={person.redHeartImg} alt="redHeart" />
//                       ) : (
//                         <AiOutlineHeart size={30} />
//                       )}
//                       <p>{feedback.likeCount}</p>
//                     </div>
//                     <div
//                       className="reply-button"
//                       style={{ color: !darkLight ? "white" : "black" }}
//                     >
//                       Reply
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </section> */}
//             <section className="feedback-write-section">
//               <img src={jonnyPhoto} alt="photoalbert" className="person-photo" />
//               <input
//                 type="text"
//                 placeholder="Your comment"
//                 className="feedback-input"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//               />
//               <button
//                 onClick={() => clickPostButton("post_id_here")}
//                 className="post-button"
//                 style={{ color: darkLight ? "red" : "white" }}
//               >
//                 Post
//               </button>
//             </section>
//           </main>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CommentsPage;