

let RedFlag = {
  render: async () => {

    return /*html*/ `
        <div class="sidebar">
            <div class="fixed">
                <div class="profile">
                    <img src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" class="avatar">
                    <div class="column">
                        <p>user name</p>
                        <span>Email@gmail.com</span>
                    </div>
                </div>
                <div class="about">
                    <h3>ABOUT</h3>
                    <div class="column">
                        <p>Name : </p>
                        <span>my names</span>
                    </div>
                    <div class="column">
                        <p>Phone Number : </p>
                        <span>0000 000 000</span>
                    </div>
                </div>
                <div class="admin-links">
                    <div>
                        <a class="btn" href="/#/">Red-flags</a>
                        <a class="btn" href="/#/">Users</a>
                        <a class="btn" href="/#/">Log out</a>
                    </div>
                </div>
            </div>
        </div>
        `;
  },
  // All the code related to DOM interactions and controls
  events: async () => {}
};

export default RedFlag;
