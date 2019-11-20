let Error404 = {
  render: async () => {
    let view = /*html*/ `
            <div class="content">
              <div class="error-content">
                <h1> 404 Error </h1>
                <p>This page does't exist please <a class="link" href="/UI/Broadcasterapp/#/feed">go to Feed</a></p>
              </div>
            </div>
        `;
    return view;
  },
  events: async () => {}
};
export default Error404;
