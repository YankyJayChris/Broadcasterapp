let RedFlagForm = {
  render: async () => {
    return /*html*/ `
            <div class="card create-redflag">
                <form id="create-form-redflag" >
                    <div class="row image-video">
                        <div class="child"> 
                            <span class="dropdown">
                                <select>
                                    <option>Red-flag</option>
                                    <option>intervation</option>  
                                </select>
                            </span> 
                        </div>
                        <div class="child link f-center addimages">
                            <i class="fa fa-images"></i> 
                            <span class="s-hide"> Add images</span>
                            <span class="l-hide">images</span>
                            <input class="hide" id="imagefiles" type="file" accept=".png, .jpg, .jpeg" multiple/>
                        </div>
                        <div class="child link f-center addvideos">
                            <i class="fa fa-file-video"></i> 
                            <span class="s-hide"> Add Videos</span>
                            <span class="l-hide">Videos</span>
                            <input class="hide" id="videofiles" type="file" accept="video/mp4,video/x-m4v,video/*" multiple/>
                        </div>
                    </div>
                    <div class="title">
                        <input type="text" placeholder="Title for your Red-flag or intervation">
                    </div>
                    <div class="description">
                        <textarea name="description" placeholder="description for your red-flag or intervation" class="description full-with" ></textarea>
                    </div>
                    <div class="row location-tags">
                        <div class="child link">
                           <input type="text" placeholder="Add coordinates">   
                        </div>
                        <div class="child link">
                            <div>
                                <input type="text" placeholder=" Add Tags">
                            </div>
                        </div>
                        <div class="child">
                            <button class="btn post-btn">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        `;
  },
  // All the code related to DOM interactions and controls
  events: async () => {
      const addImagesbtn = document.querySelector('.addimages');
      const addVideosbtn = document.querySelector('.addvideos');
      const inputImages = document.querySelector('#imagefiles');
      const inputVideos = document.querySelector('#videofiles');


      addImagesbtn.addEventListener('click',() =>{
        inputImages.click();
      });
      addVideosbtn.addEventListener('click',() =>{
        inputVideos.click();
      });
  }
};

export default RedFlagForm;