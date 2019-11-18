import Sidebar from "../components/Sidebar.js";
import Dashborad from "./../components/Dashborad.js";
import AdminTable from './../components/AdminTable.js';

// importing store and actions
import {store} from "../../store/index.js";

import { getRedFlag } from "../../store/actions/RedFlagAction.js";


let posts;
let Admin = {
  render: async () => {
    
    // getting some components to build the UI
    let SidebarAdmin = await Sidebar.render();
    let DashboradAdmin = await Dashborad.render();

    let view = /*html*/ `
            <div class="admin-page">
               ${SidebarAdmin} 
               <div class="admin-center">
                    ${DashboradAdmin}
                    <div class="card m-top overflow">
                      <h4 class="table-title">Table Title</h4>
                      <table id="admin-table">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>View</th>
                        </tr>
                        <tbody class="t-body">
                          <td colspan="5">
                             loading...
                          </td>
                        </tbody>
                      </table>
                   </div> 
               </div>

            </div>
        `;

    return view;
  },
  // All the code related to DOM interactions and controls
  events: async () => {

    const output = document.querySelector(".t-body");

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
      output.innerHTML = await AdminTable.render(posts);
    });
    Sidebar.events();
    Dashborad.events();
  }
};

export default Admin;
