import Utils from "./../../services/Utils.js";

// importing store and actions
import {store} from "../../store/index.js";

let posts;

let RedFlag = {
  render: async () => {

    let post;
    // get id from url
    let request = Utils.getURL();

    //   subscribing to the store to get data when there is any changed
    store.subscribe(newState => {
      posts = newState.redFlags.data;
      console.log(posts);
    });
    post = posts.filter(post => post.id == request.id)[0];
    console.log(post);
    let view;
    if(post){
        view = /*html*/ `
            <div class="red-flag card">
                <div class="card column my-slider">
                <div class="image-video-container  ${post.id}">
                    <img class="myslide" src="https://images.pexels.com/photos/3136078/pexels-photo-3136078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="redflag-image">
                </div>
                <div class="image-video-container hide ${post.id}">
                    <img class="myslide" src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="redflag-image">
                </div>
                <div class="image-video-container hide ${post.id}">
                    <img class="myslide" src="https://images.pexels.com/photos/3136078/pexels-photo-3136078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="redflag-image">
                </div>
                <div class="next-prev">
                    <button data-var="-1" class="display-btn d-left">&#10094;</button>
                    <div class="counter"></div>
                    <button data-var="+1" class="display-btn d-right" >&#10095;</button>
                </div>
                <div class="row user-data ">
                    <div class="user-image">
                        <img class="avatar" src="https://images.pexels.com/photos/3136078/pexels-photo-3136078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="redflag-image">
                    </div>
                    <div class="column user-names-time child">
                        <h3>myusername</h3>
                        <span>12:45 am</span>
                    </div>
                    <div class="edit-btn">
                       <span class="dropdown">
                            <select>
                                <option>Edit</option>
                                <option>Delete</option>  
                            </select>
                        </span>
                    </div>
                </div>
                <div class="row comment-status">
                    <div class="comment-btn child f-center"><h3>location: -1.9489, 30.1015</h3></div>
                    <div class="comment-btn child f-center"><h3>Status: Draft</h3></div>
                </div>
                <div class="desc ">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                </div>
            </div>
            </div>
        `;
    }else{
        view = /*html*/ `
            <div class="content">
              <div class="error-content">
                <h1> ID Error</h1>
                <p>This page does't exist please <a class="link" href="/Broadcasterapp/UI/#/feed">go to Feed</a></p>
              </div>
            </div>
        `;
    }
 
        return view;
  },
  // All the code related to DOM interactions and controls
  events: async () => {
      const selector = document.querySelector(".my-slider");

        const images = selector.querySelectorAll(".image-video-container");
        // console.log(images);
        if(!images){
            return;
        }else{
            const btn = selector.querySelectorAll(".display-btn");
            const counter = selector.querySelector(".counter");
            // console.log(btn);
            let slideIndex= 1;
            counter.innerHTML = `${slideIndex}/${images.length}`;
            for(let j=0; j< btn.length; j++){
                
                btn[j].addEventListener('click',(e)=>{
                    
                    let clickedBtn = e.target.getAttribute("data-var");
                    slideIndex += parseInt(clickedBtn);
                    
                    // console.log(slideIndex);
                    if (slideIndex > images.length) {
                      slideIndex = 1;
                    }
                    if (slideIndex < 1) {
                      slideIndex = images.length;

                    }
                    for (let i = 0; i < images.length; i++) {
                      images[i].classList.add("hide");
                    }
                    images[slideIndex - 1].classList.remove("hide");
                    counter.innerHTML = `${slideIndex}/${images.length}`;
                });
            }
           
        }

  }
};

export default RedFlag;
