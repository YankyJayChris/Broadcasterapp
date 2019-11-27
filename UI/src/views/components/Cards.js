import Utils from "./../../services/Utils.js";

// importing store and actions
import {store} from "../../store/index.js";

import {getRedFlag} from "../../store/actions/RedFlagAction.js";

let Cards = {

  render: async (data) => {
    let posts= data;
    // posts = [{id:1,title:"hey my name is me and i like coding", body:"let try this and see if it can work well hhahahahah"}];

    let view = posts
      .map(
        post => `
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
                            <select id='edit-delete' data-postId=${post.id}>
                                <option>action</option>
                                <option value='edit'>Edit</option>
                                <option value='delete'>Delete</option>  
                            </select>
                        </span>
                    </div>
                </div>
                <div class="desc ">
                    <h2>${post.title}</h2>
                    <p class="ellipsis">${post.body}</p>
                    <h3 class="m-top">location: -1.9489, 30.1015</h3>
                </div>
                <div class="row comment-status">
                    <a href="/Broadcasterapp/UI/#/red-flag/${post.id}" class="comment-btn child f-center"><h3>Read more</h3></a>
                    <div class="comment-btn child f-center"><h3>Status: Draft</h3></div>
                </div>
            </div>`
      )
      .join("\n");

    return view;
  },
  events: async () => {
      const selector = document.querySelectorAll(".my-slider");

      selector.forEach(mySlider);

      function mySlider(el,index){
        const editBtn = el.querySelector("#edit-delete");
        editBtn.addEventListener('change', () => {
            if(editBtn.value == "edit"){
                const postId = editBtn.getAttribute('data-postId');
                Utils.routeTo(`/Broadcasterapp/UI/#/red-flag/${postId}/edit`);
                console.log("edit click");    
            }
            if(editBtn.value == "delete"){
                const postId = editBtn.getAttribute('data-postId');
                Utils.routeTo(`/Broadcasterapp/UI/#/red-flag/${postId}/delete`);
                console.log("delete click");    
            }
        });
        const images = el.querySelectorAll(".image-video-container");
        // console.log(images);
        if(!images){
            return;
        }else{
            const btn = el.querySelectorAll(".display-btn");
            const counter = el.querySelector(".counter");
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
  }
};
export default Cards;
