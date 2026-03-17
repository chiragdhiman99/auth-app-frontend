import { useEffect, useState } from "react";
import axios from "axios";

const stats = [
  { label: "Projects", value: "12", icon: "M3 7h18M3 12h18M3 17h18" },
  { label: "Commits", value: "284", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { label: "Following", value: "48", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
  { label: "Stars", value: "136", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
];

const activities = [
  { action: "Pushed to", target: "auth-app/main", time: "2 hours ago", color: "bg-violet-500" },
  { action: "Created repo", target: "rag-pipeline", time: "Yesterday", color: "bg-emerald-500" },
  { action: "Merged PR", target: "fix/login-bug", time: "2 days ago", color: "bg-blue-500" },
  { action: "Opened issue", target: "JWT refresh token", time: "3 days ago", color: "bg-amber-500" },
];

const navItems = [
  { label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Projects", icon: "M3 7h18M3 12h18M3 17h18" },
  { label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google OAuth token URL se nikaalo
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  // User info fetch karo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-violet-500" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round"/>
          </svg>
          <p className="text-white/40 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex relative overflow-hidden">

      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-white tracking-tight">AuthApp</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeNav === item.label
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            {userData?.avatar ? (
              <img src={userData.avatar} className="w-8 h-8 rounded-full object-cover" alt="avatar"/>
            ) : (
              <div className="w-8 h-8 bg-violet-600/30 border border-violet-500/30 rounded-full flex items-center justify-center text-xs font-semibold text-violet-300">
                {getInitials(userData?.name)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/80 truncate">{userData?.name || "User"}</p>
              <p className="text-xs text-white/30 truncate">{userData?.email || ""}</p>
            </div>
            <button onClick={handleLogout} className="text-white/30 hover:text-red-400 transition-colors" title="Logout">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative z-10">

        <header className="sticky top-0 z-20 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/50 hover:text-white transition-colors">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <div>
              <h1 className="text-base font-semibold text-white">Dashboard</h1>
              <p className="text-xs text-white/30 hidden sm:block">Welcome back, {userData?.name?.split(" ")[0] || "User"}!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full"></span>
            </button>

            {userData?.avatar ? (
              <img src={userData.avatar} className="w-9 h-9 rounded-xl object-cover border border-violet-500/30" alt="avatar"/>
            ) : (
              <div className="w-9 h-9 bg-violet-600/30 border border-violet-500/30 rounded-xl flex items-center justify-center text-xs font-semibold text-violet-300">
                {getInitials(userData?.name)}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 space-y-6">

          {/* Profile Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

              <div className="relative">
                {userData?.avatar ? (
                  <img src={userData.avatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-violet-500/40" alt="avatar"/>
                ) : (
                  <div className="w-20 h-20 bg-violet-600/30 border-2 border-violet-500/40 rounded-2xl flex items-center justify-center text-2xl font-bold text-violet-300">
                    {getInitials(userData?.name)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-[#0a0a0f] rounded-full"></div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h2 className="text-xl font-semibold text-white">{userData?.name || "User"}</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-500/15 border border-violet-500/25 rounded-lg text-xs text-violet-300 font-medium w-fit">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                    Active
                  </span>
                </div>
                <p className="text-sm text-white/50 mb-3">
                  {userData?.googleId ? "Google Account" : "Email Account"}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    {userData?.email || ""}
                  </span>
                  {userData?.googleId && (
                    <span className="flex items-center gap-1.5 text-emerald-400/70">
                      ✓ Connected with Google
                    </span>
                  )}
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm text-white/60 hover:text-white transition-all">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all duration-200 group">
                <div className="w-9 h-9 bg-violet-600/15 border border-violet-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-violet-600/25 transition-all">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-violet-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon}/>
                  </svg>
                </div>
                <p className="text-2xl font-semibold text-white mb-0.5">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white/80 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-2 h-2 ${item.color} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/70">
                        {item.action}{" "}
                        <span className="text-violet-400 font-medium">{item.target}</span>
                      </p>
                    </div>
                    <span className="text-xs text-white/30 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white/80 mb-4">Account Info</h3>
              <div className="space-y-4">
                {[
                  { label: "Account Type", value: "Free" },
                  { label: "Status", value: "Active", green: true },
                  { label: "Login Method", value: userData?.googleId ? "Google" : "Email" },
                  { label: "2FA", value: "Disabled", red: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{item.label}</span>
                    <span className={`text-xs font-medium ${item.green ? "text-emerald-400" : item.red ? "text-red-400" : "text-white/70"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs text-red-400 font-medium transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}