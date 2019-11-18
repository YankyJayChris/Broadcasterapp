import Sidebar from "../components/Sidebar.js"
import RedFlagForm from './../components/RedFlagForm.js';
import Cards from '../components/Cards.js';
import myMap from '../components/Map.js';

// importing store and actions
import {store} from "../../store/index.js";

import { getRedFlag } from "../../store/actions/RedFlagAction.js";


let posts;
// main component which is an object with some propeties
let Home = {
  render: async () => {

    // getting some components to build the UI
    let SidebarHome = await Sidebar.render();
    let RedFlagFormHome = await RedFlagForm.render();
    // const output = await Cards.render();

    // building the component
     let view = /*html*/ `
            <div class="content home">
                ${SidebarHome} 
                <div class="center">
                    ${RedFlagFormHome}
                    <div class="posts">
                      <div class="loader"></div>
                    </div>
                </div>
                <div id="map-container" class="map-container">
                  ${await myMap.render()}
                </div>
            </div>`;
    return view;
  },
  // All the code related to DOM interactions and controls
  events: async () => {
    const output = document.querySelector(".posts");

    console.log(posts);
    if (!posts) {
      //   preventing the the getRedflag to be called when it have been called
      await getRedFlag();
      //   post must be undefined
      console.log(store.value);
    }
    
    // subscribing to the store to get data when there is any changed 
    store.subscribe(async (newState) => {
    // TO DO CHANGE THIS SO THAT IT GET ONLY REDFLAG FOR THE CURRENT USER 
      posts= newState.redFlags.data;
      console.log("sub run");
      output.innerHTML = await Cards.render(posts);
    });

    await Sidebar.events();
    await RedFlagForm.events();
    await myMap.events();
    await Cards.events();
  }
};

export default Home;
