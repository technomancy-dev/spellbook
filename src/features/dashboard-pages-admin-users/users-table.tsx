import { Link } from "@tanstack/react-router";
import { delete_user } from "@/services/user";
import Avatar from "@/components/avatar";

const UsersTable = ({ users }) => {
  return (
    <table class="table w-full">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Created At</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td>
              <Link to={`/dashboard/users/${user.id}`}>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <Avatar user={user} />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{user.username}</div>
                  </div>
                </div>
              </Link>
            </td>
            <td>{new Date(user.created).toLocaleDateString()}</td>
            <td>{user.role}</td>
            <td>
              <div class="flex gap-2">
                <button
                  onClick={() => delete_user(user.id)}
                  class="btn btn-error btn-xs"
                >
                  Delete
                </button>
                <Link to={`/dashboard/users/${user.id}`}>
                  <div class="btn btn-primary btn-xs">Edit</div>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Created at</th>
          <th>Role</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
};

export default UsersTable;
