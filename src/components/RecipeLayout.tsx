import { Outlet, useNavigate } from "react-router-dom";

const RecipeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="container">
        <div className="app-header">
          <h2 className="title">Recipe Box</h2>
          <span
            className="actions"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          >
            <h2>
              <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
            </h2>
          </span>
        </div>
        <div className="app-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RecipeLayout;
