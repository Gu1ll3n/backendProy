import { useState } from "react";
import {
  Shield,
  Search,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  UserMinus,
  UserCog,
  Stethoscope,
  CalendarPlus,
  CalendarX,
  CalendarCheck,
  Users,
} from "lucide-react";
import { useAuditLogs } from "@/hooks/useAudit";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ACTION_CONFIG: Record<
  string,
  { label: string; className: string; icon: React.ElementType }
> = {
  PATIENT_CREATED: {
    label: "Paciente creado",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: Users,
  },
  PATIENT_UPDATED: {
    label: "Paciente actualizado",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: Users,
  },
  PATIENT_DELETED: {
    label: "Paciente eliminado",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: UserMinus,
  },
  APPOINTMENT_CREATED: {
    label: "Cita creada",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: CalendarPlus,
  },
  APPOINTMENT_UPDATED: {
    label: "Cita actualizada",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: CalendarCheck,
  },
  APPOINTMENT_CANCELLED: {
    label: "Cita cancelada",
    className: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
    icon: CalendarX,
  },
  APPOINTMENT_DELETED: {
    label: "Cita eliminada",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: CalendarX,
  },
  USER_CREATED: {
    label: "Usuario creado",
    className: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    icon: UserPlus,
  },
  USER_UPDATED: {
    label: "Usuario actualizado",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: UserCog,
  },
  USER_ROLE_CHANGED: {
    label: "Rol cambiado",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Stethoscope,
  },
  USER_DELETED: {
    label: "Usuario eliminado",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: UserMinus,
  },
};

const ENTITY_LABELS: Record<string, string> = {
  Patient: "Paciente",
  Appointment: "Cita",
  User: "Usuario",
};

const PAGE_SIZE = 20;

export default function AuditPage() {
  const [page, setPage] = useState(1);
  const [filterAction, setFilterAction] = useState<string>("");
  const [filterEntity, setFilterEntity] = useState<string>("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useAuditLogs({
    page,
    limit: PAGE_SIZE,
    action: filterAction || undefined,
    entity: filterEntity || undefined,
  });

  const logs = data?.logs || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Client-side search on user name/email
  const filtered = search
    ? logs.filter(
        (l) =>
          l.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          l.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          l.detail?.toLowerCase().includes(search.toLowerCase()),
      )
    : logs;

  const handleFilterChange = () => {
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Shield className="w-8 h-8 text-amber-400" />
          Registro de Auditoría
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Historial completo de acciones realizadas en el sistema
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuario o detalle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card/50 border-border/60"
          />
        </div>

        <Select
          value={filterAction || "all"}
          onValueChange={(v) => {
            setFilterAction(v === "all" ? "" : v);
            handleFilterChange();
          }}
        >
          <SelectTrigger className="w-48 bg-card/50 border-border/60">
            <SelectValue placeholder="Todas las acciones" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Todas las acciones</SelectItem>
            {Object.entries(ACTION_CONFIG).map(([key, cfg]) => (
              <SelectItem key={key} value={key}>
                {cfg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filterEntity || "all"}
          onValueChange={(v) => {
            setFilterEntity(v === "all" ? "" : v);
            handleFilterChange();
          }}
        >
          <SelectTrigger className="w-40 bg-card/50 border-border/60">
            <SelectValue placeholder="Todas las entidades" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Patient">Paciente</SelectItem>
            <SelectItem value="Appointment">Cita</SelectItem>
            <SelectItem value="User">Usuario</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="card-premium bg-card/50 border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">
            Actividad reciente
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            {total} registro{total !== 1 ? "s" : ""} en total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-14 bg-muted/30 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/40 text-left">
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider">
                      Acción
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                      Entidad
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">
                      Detalle
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {filtered.map((log) => {
                    const cfg = ACTION_CONFIG[log.action] || {
                      label: log.action,
                      className:
                        "bg-muted/10 text-muted-foreground border-border/30",
                      icon: Shield,
                    };
                    const ActionIcon = cfg.icon;
                    return (
                      <tr
                        key={log.id}
                        className="hover:bg-secondary/10 transition-colors"
                      >
                        <td className="py-3.5">
                          <p className="text-white font-mono text-xs">
                            {format(new Date(log.createdAt), "dd/MM/yy", {
                              locale: es,
                            })}
                          </p>
                          <p className="text-muted-foreground font-mono text-[10px]">
                            {format(new Date(log.createdAt), "HH:mm:ss")}
                          </p>
                        </td>
                        <td className="py-3.5">
                          {log.user ? (
                            <div>
                              <p className="text-white font-semibold text-sm">
                                {log.user.name}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {log.user.email}
                              </p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground/50 text-xs italic">
                              Sistema
                            </span>
                          )}
                        </td>
                        <td className="py-3.5">
                          <Badge
                            className={`${cfg.className} border text-[10px] uppercase font-bold tracking-wide gap-1`}
                          >
                            <ActionIcon className="w-3 h-3" />
                            {cfg.label}
                          </Badge>
                        </td>
                        <td className="py-3.5 hidden md:table-cell">
                          <span className="text-muted-foreground text-xs">
                            {ENTITY_LABELS[log.entity] || log.entity}
                            {log.entityId && (
                              <span className="text-muted-foreground/50">
                                {" "}
                                #{log.entityId}
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-3.5 hidden lg:table-cell">
                          <span className="text-muted-foreground text-xs truncate max-w-xs block">
                            {log.detail || "—"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!filtered.length && (
                <p className="text-center text-muted-foreground/40 text-sm py-12">
                  No hay registros de auditoría
                </p>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
              <p className="text-muted-foreground text-xs">
                Página {page} de {totalPages} ({total} registros)
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
