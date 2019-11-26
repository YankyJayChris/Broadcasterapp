let AdminTable = {
  render: async (data) => {
    let users = data;
    let view = users
      .map((user,index) => {
          
        return ` <tr>
                    <td>${index + 1}</td>
                    <td>
                        <a href="/Broadcasterapp/UI/#/red-flag/${user.id}"  class="link">
                            ${user.name}
                        </a>
                    </td>
                    <td>${user.username}</td>
                    <td>${user.phone}</td>
                    <td>
                        <span class="dropdown">
                            <select>
                                <option>user</option>
                                <option>Admin</option>
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
