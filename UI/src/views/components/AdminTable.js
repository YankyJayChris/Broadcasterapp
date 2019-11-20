let AdminTable = {
  render: async (data) => {
    let posts = data;
    let view = posts
      .map((post,index) => {
          
        return ` <tr>
                    <td>${index + 1}</td>
                    <td>
                        <a href="/UI/Broadcasterapp/#/red-flag/${post.id}"  class="link">
                            ${post.title}
                        </a>
                    </td>
                    <td>REd-flag</td>
                    <td>-1.9489, 30.1015</td>
                    <td>
                        <span class="dropdown">
                            <select>
                                <option>change staus</option>
                                <option>Draft</option>  
                                <option>Under investigation</option>  
                                <option>Rejected</option>  
                                <option>Resolved</option>  
                            </select>
                        </span>
                    </td>
                </tr>`;
      })
      .join("\n");

    return view;
  },
  // All the code related to DOM interactions and controls
  events: async () => {}
};

export default AdminTable;
