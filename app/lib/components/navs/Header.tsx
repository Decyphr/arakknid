import { Form, Link } from "@remix-run/react";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn-ghost btn text-xl normal-case">
          Forge
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/40/40/people" alt="Avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact bg-base-100 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/">Settings</Link>
            </li>
            <li>
              <Form action="/logout" method="post">
                <button type="submit">Logout</button>
              </Form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
