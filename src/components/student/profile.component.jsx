
import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';

import './profile.style.css';


const Profile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    let mounted = true
  axios.get("/user/").then(res => {
    if (mounted) 
    {
      setUser(res.data.user);
    }
    });
  
    return function cleanup() {
      mounted = false
  }

  },[]);

return(
    <div class="card">
      <div class="card__header">
        <div class="card__profile">
          <img
            src="https://randomuser.me/api/portraits/men/52.jpg"
            alt="A man smiling"
          />
        </div>
        <div class="card__name">
     <h2>{user.fullname}</h2>
          <div class="card__handle">
      <span class="handle">{user.email}</span>
            <span class="circle"></span>
<span class="category">{user.contact}</span>
          </div>
        </div>
        <div class="card__button">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-edit"
            >
              <path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              ></path>
              <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              ></path>
            </svg>
            <span>Edit</span>
          </button>
        </div>
      </div>
      <hr class="border" />
      <nav>
        <ul class="navlinks">
          <li class="link__item">Home</li>
          <li class="link__item">Projects</li>
          <li class="link__item">About</li>
          <li class="link__item">Jobs</li>
          <li class="link__item">Contact</li>
        </ul>
      </nav>
      <div class="card__insights">
        <div class="card__heading">
          <div class="heading">Insights</div>
          <div class="date">
            May 16 - June 20
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div class="insights">
          <div class="insight">
            <div class="heading">
              People Reached
              <div class="score">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 262.361 262.362"
                  width="8"
                  height="8"
                  fill="#44c790"
                >
                  <path
                    d="M286.935 197.287L159.028 69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.287C1.807 200.904 0 205.186 0 210.134s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.425 12.85 5.425h255.813c4.949 0 9.233-1.808 12.848-5.425 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.23-5.427-12.847z"
                  />
                </svg>
                <span>7%</span>
              </div>
            </div>
            <div class="number">
              1,090
              <div class="info">
                More Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="insight">
            <div class="heading">
              Post Engagement
              <div class="score">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 262.361 262.362"
                  width="8"
                  height="8"
                  fill="#44c790"
                >
                  <path
                    d="M286.935 197.287L159.028 69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.287C1.807 200.904 0 205.186 0 210.134s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.425 12.85 5.425h255.813c4.949 0 9.233-1.808 12.848-5.425 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.23-5.427-12.847z"
                  />
                </svg>
                <span>25%</span>
              </div>
            </div>
            <div class="number">
              305
              <div class="info">
                More Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="insight">
            <div class="heading">
              Page Likes
              <div class="score">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 262.361 262.362"
                  width="8"
                  height="8"
                  fill="#44c790"
                >
                  <path
                    d="M286.935 197.287L159.028 69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.287C1.807 200.904 0 205.186 0 210.134s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.425 12.85 5.425h255.813c4.949 0 9.233-1.808 12.848-5.425 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.23-5.427-12.847z"
                  />
                </svg>
                <span>18%</span>
              </div>
            </div>
            <div class="number">
              13
              <div class="info">
                More Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
)

}
export default Profile;