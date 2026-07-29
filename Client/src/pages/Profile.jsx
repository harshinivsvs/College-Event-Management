import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-page">

      <div className="profile-card">

        <p className="profile-tag">ACCOUNT DETAILS</p>

        <h1>
          My <span>Profile</span> 👤
        </h1>

        <div className="profile-info">

          <div className="info-box">
            <p className="label">FULL NAME</p>
            <h2>{user?.name}</h2>
          </div>

          <div className="info-box">
            <p className="label">EMAIL</p>
            <h2>{user?.email}</h2>
          </div>

          <div className="info-box">
            <p className="label">ROLE</p>
            <h2>{user?.role}</h2>
          </div>

        </div>

        <div className="profile-footer">

          <button>Edit Profile</button>

        </div>

      </div>

    </div>
  );
}

export default Profile;