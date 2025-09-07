import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const COLORS = [
  "#6366F1",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#8B5CF6",
];

const humanNumber = (n) =>
  n >= 1e6
    ? `${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
    ? `${(n / 1e3).toFixed(1)}k`
    : `${n}`;

// ... keep all your imports and constants

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsResp = await axios.get("http://localhost:5000/api/events", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        let evData = eventsResp.data;
        let evArray = [];
        if (Array.isArray(evData)) evArray = evData;
        else if (Array.isArray(evData?.events)) evArray = evData.events;
        else if (Array.isArray(evData?.data)) evArray = evData.data;
        else if (evData && typeof evData === "object" && evData._id)
          evArray = [evData];

        if (mounted) setEvents(evArray);
      } catch (err) {
        if (mounted) {
          setError(err);
          setEvents([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEvents();
    return () => {
      mounted = false;
    };
  }, []);

  const totalEvents = events.length;

  // Count unique users based on `userId` or `createdBy` field
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    const fetchTotalUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users/count",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setTotalUsers(data.totalUsers);
      } catch (err) {
        console.error("Error fetching total users:", err);
      }
    };
    fetchTotalUsers();
  }, []);

  const eventsByType = useMemo(() => {
    const map = {};
    events.forEach((ev) => {
      const t = ev.type || "Other";
      map[t] = (map[t] || 0) + 1;
    });
    return Object.entries(map).map(([type, count]) => ({ type, count }));
  }, [events]);

  const eventsByMonth = useMemo(() => {
    const months = {};
    const now = new Date();
    const monthLabels = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      const label = d.toLocaleString(undefined, { month: "short" });
      months[key] = 0;
      monthLabels.push({ key, label });
    }

    events.forEach((ev) => {
      const dateStr = ev.date || ev.createdAt || ev.updatedAt || null;
      if (!dateStr) return;
      const d = new Date(dateStr);
      if (isNaN(d)) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      if (typeof months[key] === "number") months[key]++;
    });

    return monthLabels.map(({ key, label }) => ({
      month: label,
      count: months[key] || 0,
    }));
  }, [events]);

  const growthPercent = useMemo(() => {
    if (eventsByMonth.length < 2) return 0;
    const last = eventsByMonth[eventsByMonth.length - 1].count;
    const prev = eventsByMonth[eventsByMonth.length - 2].count || 0;
    if (prev === 0) return last === 0 ? 0 : 100;
    return Math.round(((last - prev) / prev) * 100);
  }, [eventsByMonth]);

  const pieData = useMemo(() => {
    const sorted = [...eventsByType].sort((a, b) => b.count - a.count);
    return sorted.slice(0, 6);
  }, [eventsByType]);

  const latestEvent = events[0];
  const upcomingEvents = events.filter(
    (e) => new Date(e.date) > new Date()
  ).length;

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Loading dashboard...
      </div>
    );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Header + Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Overview of events and recent activity.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <div className="text-xs text-indigo-600 dark:text-indigo-300">
                Total Events
              </div>
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-200">
                <CountUp end={totalEvents} duration={1.5} separator="," />
              </div>
            </div>

            <div className="px-4 py-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="text-xs text-green-600 dark:text-green-300">
                Total Users
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-200">
                <CountUp end={totalUsers} duration={1.5} separator="," />
              </div>
            </div>

            <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="text-xs text-amber-600 dark:text-amber-300">
                MoM Growth
              </div>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-200">
                <CountUp end={growthPercent} duration={1.5} suffix="%" />
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Recent Event Card */}
          <div className="p-5 bg-[#e8f4fa] dark:bg-[#023047] rounded-3xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-[#04699b] dark:text-[#54c3fb] uppercase font-medium">
                  Recent Event
                </div>
                <div className="text-lg font-semibold mt-1 text-[#023047] dark:text-[#e8f4fa]">
                  {latestEvent?.title || "—"}
                </div>
                <div className="text-sm text-[#145d70] dark:text-[#9cddee] mt-1">
                  {latestEvent?.date || latestEvent?.createdAt || "—"}
                </div>
              </div>
              <div className="p-3 bg-[#51aed9] dark:bg-[#04699b] rounded-xl">
                <FaCalendarAlt className="text-white text-lg" />
              </div>
            </div>

            {/* Stats / Progress */}
            <div className="mt-4">
              <div className="text-xs text-[#145d70] dark:text-[#9cddee] font-medium">
                Events (last 8 months)
              </div>
              <div className="w-full bg-[#d2eaf5] dark:bg-[#011c2a] h-4 rounded-full mt-2 overflow-hidden">
                {eventsByMonth.length > 0 && (
                  <div
                    style={{
                      width: `${Math.min(
                        100,
                        (eventsByMonth.reduce((a, b) => a + b.count, 0) /
                          Math.max(1, totalEvents)) *
                          100
                      )}%`,
                    }}
                    className="h-4 bg-gradient-to-r from-[#219ebc] to-[#ffb703] transition-all"
                  />
                )}
              </div>
              {/* Optional: mini month markers */}
              <div className="flex justify-between text-[10px] text-[#04699b] dark:text-[#54c3fb] mt-1 font-medium">
                {eventsByMonth.map((m, i) => (
                  <span key={i}>{m.month}</span>
                ))}
              </div>
            </div>

            {/* Optional footer stats */}
            <div className="mt-4 flex justify-between text-sm font-medium text-[#023047] dark:text-[#e8f4fa]">
              <div>Total Events: {totalEvents}</div>
              <div>Upcoming: {upcomingEvents}</div>
            </div>
          </div>

          {/* Events by Type */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Events by Type
              </h3>
              <div className="text-xs text-gray-400">
                {eventsByType.length} categories
              </div>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventsByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#06B6D4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Type Distribution */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
              Type Distribution
            </h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => entry.type}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Events Trend Card */}
          <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-gray-500">Events Trend</div>
                <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Last 8 months
                </div>
              </div>
              <div className="text-sm text-gray-500">Total: {totalEvents}</div>
            </div>

            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eventsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Events</div>
                  <div className="text-lg font-semibold text-black dark:text-white">{totalEvents}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Users</div>
                  <div className="text-lg font-semibold text-black dark:text-white">{totalUsers}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-2">Top categories</div>
                <div className="flex flex-wrap gap-2">
                  {pieData.map((p, i) => (
                    <div
                      key={p.type}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: COLORS[i % COLORS.length] }}
                      />
                      <span>
                        {p.type} ({p.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Growth (last month)</div>
                <div className="mt-2">
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${Math.min(100, Math.abs(growthPercent))}%`,
                        background: growthPercent >= 0 ? "#10B981" : "#EF4444",
                      }}
                      className="h-3"
                    />
                  </div>
                  <div className="text-xs mt-1 text-gray-500">
                    {growthPercent}% vs previous month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-500">
            Error fetching data — check console. {error?.message}
          </div>
        )}
      </motion.div>
    </div>
  );
}
