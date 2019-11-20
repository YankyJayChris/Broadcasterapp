import Utils from './../../services/Utils.js';

let Login = {
  render: async () => {
    return /*html*/ `
            <div class="landing-page">
                <div class="login-form card">
                    <div class="call-out">
                        <h1>Broadcaster</h1>
                        <p>login  to create red-flag or intervention</p>
                    </div>
                    <form >
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
                            <label for="password">password</label>
                            <input
                            type="password"
                            id="password"
                            class="f_input"
                            name="password"
                            placeholder="Your password"
                            />
                        </div>
                        <button class="btn login-btn full-width">Login</button>
                        <div class="call-out">
                            <span>Need an account <a href="/UI/Broadcasterapp/#/register"  class="link signup-link">Sign up</a></span>
                        </div>
                    </form>
                </div>
            <div>
        `;
  },
  // All the code related to DOM interactions and controls
  events: async () => {
      document.querySelector(".signup-link").addEventListener("click",(e)=>{
          e.preventDefault();
          Utils.routeTo("/#/register");
      });
      document.querySelector(".login-btn").addEventListener("click", e => {
        e.preventDefault();
        Utils.routeTo("/#/Home");
      });

  }
};

export default Login;