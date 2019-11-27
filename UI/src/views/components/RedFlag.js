import Utils from "./../../services/Utils.js";

// importing store and actions
import {store} from "../../store/index.js";

let posts;

let RedFlag = {
  render: async () => {

    let post;
    // get id from url
    let request = Utils.getURL();

    // subscribing to the store to get data when there is any changed
    store.subscribe(newState => {
      posts = newState.redFlags.data;
      console.log(posts);
    });
    post = posts.filter(post => post.id == request.id)[0];
    // post = {
    //     "userId": 1,
    //     "id": 2,
    //     "title": "qui est esse",
    //     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    //     };
    
    const fieldMaker = (id,postData,type) => {
        if(type === 'input'){
        return `<div class='column'><h3>Edit ${id}</h3><input type="text" id=${id} value=${postData} class="f_input" name="text" placeholder=${postData} /></div>`;
        }else {
            return `<div class='column'><h3>Edit ${id}</h3><textarea id=${id} name="description" placeholder=${postData} class="description full-with" >${postData}</textarea></div>`;
        }
    }
    let view;
    if(post){
        view = /*html*/ `
            <div class="red-flag">
                ${request.verb === "delete" ?'<div class="column f-center m-bottom"><div class="m-bottom"><h4>Are you sure You want to delete this red-flag</h4></div><div class="row"><button class="btn danger m-right child">Delete</button><button class="btn m-left child">Cansel</button></div></div>': ''}
                ${request.verb === "edit" ?'<form>': ''}
                <div class=" column my-slider">
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
                    <div class="row redflag-status">
                        <div class="child f-center">${request.verb === "edit" ? "" : "<h3>location: -1.9489, 30.1015</h3>"}</div>
                        <div class="child f-center"><h3>Status: Draft</h3></div>
                    </div>
                    <div class="desc ">
                        ${request.verb === "edit" ? fieldMaker('Location','-1.9489,30.1015', 'input') : ' ' }
                        ${request.verb === "edit" ? fieldMaker('Title', post.title, 'input') : "<h2>" + post.title +"</h2>" }
                        ${request.verb === "edit" ? fieldMaker('Description', post.body, 'textarea') : "<p>" + post.body + "</p>"}
                    </div>
                </div>
                ${request.verb === "edit" ?'<button id="save" class="btn post-btn">save</button>': ''}
                ${request.verb === "edit" ?'</form>': ''}
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
        const editBtn = document.querySelector("#edit-delete");
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
