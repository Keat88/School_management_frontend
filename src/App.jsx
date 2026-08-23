import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const getAvata = queryParams.get("avatar");
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      if (getAvata) {
        localStorage.setItem("userAvarta", decodeURIComponent(getAvata));
      }
    }
  }, []);
  const avatar = decodeURIComponent(getAvata);
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/redirect";
  };
  // មុខងារសម្រាប់បញ្ជូនទៅកាន់ GitHub Login
  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/github/redirect";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>ចូលគណនីរបស់អ្នក (Login)</h2>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleGoogleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#db4437",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Login with Google
        </button>

        <button
          onClick={handleGithubLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login with GitHub
        </button>
      </div>
      {avatar && (
        <img
          src={avatar}
          alt="profile"
          style={{ width: 50, borderRadius: "50%" }}
        />
      )}
    </div>
  );
};

export default App;
