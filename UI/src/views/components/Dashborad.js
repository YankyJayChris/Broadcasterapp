let Dashborad = {
  render: async () => {
    return /*html*/ `
          <div class="card dashboad">
              <ul>
                  <li class="row all"> <span>All</span><span>300</span></li>
                  <li class="row draft"> <span>Draft</span><span>300</span></li>
                  <li class="row investigation"> <span>Investigation</span><span>300</span></li>
                  <li class="row resolved"> <span>Resolved</span><span>300</span></li>
                  <li class="row rejected"> <span>Rejected</span><span>300</span></li>
              </ul>
          </div>
        `;
  },
  // All the code related to DOM interactions and controls
  events: async () => {}
};

export default Dashborad;
