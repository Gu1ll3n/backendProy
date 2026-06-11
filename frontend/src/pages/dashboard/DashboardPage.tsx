import { CalendarDays, CheckCircle2, Users, TrendingUp } from "lucide-react";
import { useAppointmentStats, useAppointments } from "@/hooks/useAppointments";
import { useUserStats } from "@/hooks/useUsers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ITootip = {
  active?: boolean;
  payload?: {
    name?: string;
    value?: number;
    payload?: any;
    fill?: string;
  }[];
  label?: string;
};


const ROLE_COLORS = {
  ADMIN: "#8b5cf6",
  DOCTOR: "#33a19b",
  RECEPCION: "#f97316",
};

const ROLE_LABELS = {
  ADMIN: "Administrador",
  DOCTOR: "Doctor",
  RECEPCION: "Recepción",
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
  isLoading,
}: {
  icon: React.ElementType;
  label: string;
  value?: number;
  color: string;
  bgColor: string;
  isLoading: boolean;
}) {
  return (
    <Card className="card-premium bg-card/50 border-border/80 relative overflow-hidden group">
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-linear-to-r ${color === "text-brand-orange" ? "from-brand-orange to-brand-orange/70" : "from-brand-teal to-brand-teal/70"}`}
      />
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1.5 bg-muted/50" />
            ) : (
              <p
                className={`text-3xl font-extrabold mt-1.5 font-mono ${color}`}
              >
                {value ?? 0}
              </p>
            )}
          </div>
          <div
            className={`p-3 rounded-xl ${bgColor} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const CustomTooltipArea = ({ active, payload, label }: ITootip) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/80 rounded-lg px-3 py-2 shadow-xl text-sm">
        <p className="text-muted-foreground text-xs mb-1">{label}</p>
        <p className="text-brand-teal font-bold">{payload[0].value} citas</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipBar = ({ active, payload, label }: ITootip) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/80 rounded-lg px-3 py-2 shadow-xl text-sm">
        <p className="text-white font-semibold text-xs mb-1 truncate max-w-40">
          {label}
        </p>
        <p className="text-brand-orange font-bold">{payload[0].value} citas</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipPie = ({ active, payload }: ITootip) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/80 rounded-lg px-3 py-2 shadow-xl text-sm">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="font-bold" style={{ color: payload[0].payload?.fill }}>
          {payload[0].value} usuarios
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  console.log("Dashboard render");
  
  const { data: stats, isLoading: statsLoading } = useAppointmentStats();
  const { data: appointments, isLoading: apptLoading } = useAppointments();
  const { data: userStats, isLoading: userStatsLoading } = useUserStats();

  const todayStr = format(new Date(), "EEEE d 'de' MMMM, yyyy", { locale: es });
  const todayAppts =
    appointments?.filter((a) => {
      const d = new Date(a.scheduledAt);
      const t = new Date();
      return (
        d.getDate() === t.getDate() &&
        d.getMonth() === t.getMonth() &&
        d.getFullYear() === t.getFullYear()
      );
    }) || [];

  const pieData = userStats
    ? Object.entries(userStats).map(([role, count]) => ({
        name: ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role,
        value: count,
        fill: ROLE_COLORS[role as keyof typeof ROLE_COLORS] || "#64748b",
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Panel de Control
        </h1>
        <p className="text-brand-teal text-xs font-semibold tracking-wider mt-1 uppercase">
          {todayStr}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Total de citas"
          value={stats?.total}
          color="text-brand-teal"
          bgColor="bg-brand-teal/10"
          isLoading={statsLoading}
        />
        <StatCard
          icon={TrendingUp}
          label="Citas hoy"
          value={stats?.todayCount}
          color="text-brand-orange"
          bgColor="bg-brand-orange/10"
          isLoading={statsLoading}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completadas"
          value={stats?.completed}
          color="text-brand-teal"
          bgColor="bg-brand-teal/10"
          isLoading={statsLoading}
        />
        <StatCard
          icon={Users}
          label="Pacientes registrados"
          value={stats?.totalPatients}
          color="text-brand-orange"
          bgColor="bg-brand-orange/10"
          isLoading={statsLoading}
        />
      </div>

      {/* Charts row 1: Area + Pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Area Chart — Citas por mes */}
        <Card className="card-premium bg-card/50 border-border/80 xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-teal" />
              Citas por mes
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">
              Últimos 6 meses — evolución de la demanda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-56 bg-muted/30 rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={stats?.citasPorMes || []}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCitas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#33a19b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#33a19b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltipArea />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#33a19b"
                    strokeWidth={2.5}
                    fill="url(#colorCitas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart — Distribución de roles */}
        <Card className="card-premium bg-card/50 border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-400" />
              Distribución de roles
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">
              Usuarios activos por tipo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userStatsLoading ? (
              <Skeleton className="h-56 bg-muted/30 rounded-lg" />
            ) : (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltipPie />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2 w-full mt-1">
                  {pieData.map((d) => (
                    <div
                      key={d.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: d.fill }}
                        />
                        <span className="text-muted-foreground text-xs">
                          {d.name}
                        </span>
                      </div>
                      <span className="text-white text-xs font-bold font-mono">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Bar + Today */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="card-premium bg-card/50 border-border/80 xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-orange" />
              Top doctores por citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-48 bg-muted/30 rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats?.topDoctores || []} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{fill: "#94a3b8", fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltipBar />} />
                  <Bar dataKey="citas" fill="#f97316" radius={[0, 6, 6, 0]} maxBarSize={24} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        {/* Today's Appointments */}
        <Card className="card-premium bg-card/50 border-border/80">
          <CardHeader className="pb-2">
             <CardTitle className="text-white text-lg">Citas de hoy</CardTitle>
          </CardHeader>
          <CardContent>
             {apptLoading ? <Skeleton className="h-40" /> : <p className="text-sm text-muted-foreground">{todayAppts.length} citas programadas.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}