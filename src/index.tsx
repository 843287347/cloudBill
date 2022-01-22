import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import About from "./CloudBill";
import Setting from "./Setting";
import Login from "./Login";
import Analysis from "./Analysis";
import Register from "./Register";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
let AuthContext = React.createContext<AuthContextType>(null!);

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<App></App>}>
            <Route
              path="/cloudBill"
              element={
                <RequireAuth>
                  <About />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/setting"
              element={
                <RequireAuth>
                  <Setting />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/analysis"
              element={
                <RequireAuth>
                  <Analysis />
                </RequireAuth>
              }
            ></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);

interface AuthContextType {
  user: any;
  signin: (username: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);
  let signin = (username: string, password: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(username, password, () => {
      setUser(username);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
