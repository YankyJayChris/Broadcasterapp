import Utils from "./../../services/Utils.js";

let Header = {
  render: async () => {
      let url = Utils.getURL();
    let view = /*html*/ `
            
                <div class="brand-search">
                    <div class="brand">
                        <h1>Broadcaster</h1>
                    </div>
                    <div class="search-form">
                        <input type="text" placeholder="Search Red-flag or intervation">
                    </div>
                    <div class="not-icon l-hide">
                        <img src="./src/assets/logo.png" alt="logo">    
                    </div>
                </div>
                <nav class="navbar">
                    <ul>
                        <li class=${url.url == "/home" ? "active" : ""}><a href="/Broadcasterapp/UI/#/home"><span class="s-hide">Home</span> <i class="fa fa-home l-hide"></i></a></li>
                        <li class=${url.url == "/feed" ? "active" : ""}><a href="/Broadcasterapp/UI/#/feed"><span class="s-hide">Feed</span> <i class="fa fa-newspaper l-hide"></i></a></li>
                        <li class=${url.url == "/admin" ? "active" : ""}><a href="/Broadcasterapp/UI/#/admin"><span class="s-hide">Admin</span> <i class="fas fa-th-list l-hide"></i></a></li>
                        <li class="${url.url == "/map" ? "active" : ""} l-hide go-map"><a href="#"><span class="s-hide">Map</span> <i class="fas fa-map-marked-alt l-hide"></i></a></li>
                        
                    </ul>
                </nav>`;
    return view;
  },
  events: async () => {
      document.querySelector('.go-map').addEventListener('click',(e)=>{
          e.preventDefault();
          let mapscroll = document.getElementById("map-container");
          if(!mapscroll){
            Utils.routeTo("/UI/Broadcasterapp/#/Home");
            document.getElementById("map-container").scrollIntoView();
          }else{
              document.getElementById("map-container").scrollIntoView();
          }
      })
  }
};

export default Header;
