import Utils from '../../services/Utils.js';

let Register = {

    render: async () => {
        return /*html*/ `
            <div class="landing-page">
                <div class="signup-form card">
                    <div class="call-out">
                        <h1>Broadcaster</h1>
                        <p>sign up  to create red-flag or intervention</p>
                    </div>
                    <form >
                        <div class="form-field">
                            <label for="fname">First Name</label>
                            <input
                            type="text"
                            id="fname"
                            class="f_input"
                            name="fname"
                            placeholder="Your name.."
                            />
                        </div>
                        <div class="form-field">
                            <label for="lname">Last Name</label>
                            <input
                            type="text"
                            id="lname"
                            class="f_input"
                            name="lname"
                            placeholder="Your last name.."
                            />
                        </div>
                        <div class="form-field">
                            <label for="lname">Last Name</label>
                            <input
                            type="text"
                            id="username"
                            class="f_input"
                            name="username"
                            placeholder="Username.."
                            />
                        </div>
                        <div class="form-field">
                            <label for="email">Email</label>
                            <input
                            type="text"
                            id="email"
                            class="f_input"
                            name="email"
                            placeholder="Your Email.."
                            />
                        </div>
                        <div class="form-field">
                            <label for="phone">Phone</label>
                            <input
                            type="phone"
                            id="phone"
                            class="f_input"
                            name="phone"
                            placeholder="Your Phone number.."
                            />
                        </div>
                        <div class="form-field">
                            <label for="password">password</label>
                            <input
                            type="password"
                            id="password"
                            class="f_input"
                            name="password"
                            placeholder="Your password"
                            />
                        </div>
                        <div class="form-field">
                            <label for="re-password">Confirm Password</label>
                            <input
                            type="password"
                            id="re-password"
                            class="f_input"
                            name="re-password"
                            placeholder="confirm password"
                            />
                        </div>
                        <button class="btn sign-up-btn full-width">Sign up</button>
                        <div class="call-out">
                            <span>have an account? <a href="/Broadcasterapp/UI/#/" class="link login-link">Log in</a></span>
                        </div>
                    </form>
                </div>
            <div>
        `;
    },
    // All the code related to DOM interactions and controls 
    events: async () => { 
        document.querySelector(".login-link").addEventListener("click", e => {
          e.preventDefault();
          Utils.routeTo("/Broadcasterapp/UI/#/");
        });
        document.querySelector(".sign-up-btn").addEventListener("click", e => {
          e.preventDefault();
          const email = document.querySelector("#email").value;
          const fname = document.querySelector("#fname").value;
          const password = document.querySelector("#password").value;
          const lname = document.querySelector("#lname").value;
          const phone = document.querySelector("#phone").value;
          const rePassword = document.querySelector("#re-password").value;
          const username = document.querySelector("#username").value;
          Utils.routeTo("/Broadcasterapp/UI/#/home");
        });
    }
}

export default Register;