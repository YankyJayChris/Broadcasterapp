import Sidebar from "../components/Sidebar.js";
import Cards from "../components/Cards.js";
import Dashborad from './../components/Dashborad.js';
import myMap from '../components/Map.js';

// importing store and actions
import {store} from "../../store/index.js";

import { getRedFlag } from "../../store/actions/RedFlagAction.js";


let posts;
let Feed = {
  render: async () => {

    // getting some components to build the UI
    let SidebarHome = await Sidebar.render();
    let DashboradFeed = await Dashborad.render();

    // building the component
    let view = /*html*/ `
            <div class="content home">
                ${SidebarHome} 
                <div class="center">
                    ${DashboradFeed}
                    <div class="posts">
                      <div class="loader"></div>
                    </div>
                </div>
                <div id="map-container" class="s-hide map-container">
                  ${await myMap.render()}
                </div>
            </div>`;
    return view;
  },
  // All the code related to DOM interactions and controls
  events: async () => {
    const output = document.querySelector(".posts");

    if (!posts) {
      //   preventing the the getRedflag to be called when it have been called
      await getRedFlag();
      //   post must be undefined
      console.log(posts);
    }

    // subscribing to the store to get data when there is any changed 
    store.subscribe(async (newState) => {
    // TO DO CHANGE THIS SO THAT IT GET ONLY REDFLAG FOR THE CURRENT USER 
      posts= newState.redFlags.data;
      console.log("sub run");
      output.innerHTML = await Cards.render(posts);
    });

    await Sidebar.events();
    await Dashborad.events();
    await myMap.events();
    await Cards.events();
  }
};

export default Feed;
