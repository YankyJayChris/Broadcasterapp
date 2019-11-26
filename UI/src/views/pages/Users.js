import Sidebar from "../components/Sidebar.js";
import Dashborad from "../components/Dashborad.js";
import UserTable from '../components/UserTable.js';

// importing store and actions
import {store} from "../../store/index.js";

import { getusers } from "../../store/actions/UserAction.js";

const userstype = "users";

let users;
let Admin = {
  render: async () => {
    
    // getting some components to build the UI
    let SidebarAdmin = await Sidebar.render();
    let DashboradAdmin = await Dashborad.render();

    let view = /*html*/ `
            <div class="admin-page">
               ${SidebarAdmin} 
               <div class="admin-center">
                    <div class="card m-top overflow">
                      <h4 class="table-title">Users Table</h4>
                      <table id="admin-table">
                        <tr>
                            <th>#</th>
                            <th>Names</th>
                            <th>username</th>
                            <th>Phone number</th>
                            <th>type</th>
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

    console.log(users);
    if (!users) {
      //   preventing the the getRedflag to be called when it have been called
      await getusers();
      //   post must be undefined
      console.log(store.value);
    }
    
    // subscribing to the store to get data when there is any changed 
    store.subscribe(async (newState) => {
    // TO DO CHANGE THIS SO THAT IT GET ONLY REDFLAG FOR THE CURRENT USER 
      users= newState.users.data;
      console.log("sub run");
      output.innerHTML = await UserTable.render(users);
    });
    Sidebar.events();
    Dashborad.events(userstype);
  }
};

export default Admin;
