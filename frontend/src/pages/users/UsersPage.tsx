import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  Stethoscope,
  ConciergeBell,
  Search,
  UserCog,
} from "lucide-react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/useUsers";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@/lib/users.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const roleConfig = {
  ADMIN: {
    label: "Administrador",
    className: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    icon: ShieldCheck,
  },
  DOCTOR: {
    label: "Doctor",
    className: "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
    icon: Stethoscope,
  },
  RECEPCION: {
    label: "Recepción",
    className: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
    icon: ConciergeBell,
  },
};

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "DOCTOR" as "DOCTOR" | "ADMIN" | "RECEPCION",
};

export default function UsersPage() {
  const { user: currentUser } = useAuthStore();
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const filtered = (users || []).filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setFormError("");
    setDialogOpen(true);
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
    setFormError("");
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    setFormError("");
    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Nombre y email son obligatorios");
      return;
    }
    if (!editingUser && !form.password) {
      setFormError("La contraseña es obligatoria al crear un usuario");
      return;
    }

    try {
      if (editingUser) {
        const payload: import('@/lib/users.api').UpdateUserData = {
          name: form.name,
          email: form.email,
          role: form.role,
          ...(form.password ? { password: form.password } : {}),
        };
        await updateUser.mutateAsync({ id: editingUser.id, data: payload });
      } else {
        await createUser.mutateAsync({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
      }
      setDialogOpen(false);
    } catch {
      setFormError("Error al guardar");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteUser.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <UserCog className="w-8 h-8 text-violet-400" />
            Gestión de Usuarios
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Administra los accesos y roles del sistema
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-violet-600 hover:bg-violet-500 text-white gap-2 shadow-lg shadow-violet-500/20"
        >
          <Plus className="w-4 h-4" />
          Nuevo usuario
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card/50 border-border/60"
        />
      </div>

      {/* Table */}
      <Card className="card-premium bg-card/50 border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">
            Usuarios del sistema
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            {filtered.length} usuario{filtered.length !== 1 ? "s" : ""}{" "}
            encontrado{filtered.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 bg-muted/30 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/40 text-left">
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">
                      Creado
                    </th>
                    <th className="pb-3 font-semibold text-xs uppercase tracking-wider text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {filtered.map((u) => {
                    const cfg = roleConfig[u.role] || roleConfig.RECEPCION;
                    const RoleIcon = cfg.icon;
                    const isSelf = u.id === currentUser?.id;
                    return (
                      <tr
                        key={u.id}
                        className="hover:bg-secondary/10 transition-colors"
                      >
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-violet-400">
                                {u.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-white text-sm">
                                {u.name}
                                {isSelf && (
                                  <span className="ml-2 text-[10px] text-muted-foreground font-normal">
                                    (tú)
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 text-muted-foreground hidden md:table-cell">
                          {u.email}
                        </td>
                        <td className="py-3.5">
                          <Badge
                            className={`${cfg.className} border text-[10px] uppercase font-bold tracking-wide gap-1`}
                          >
                            <RoleIcon className="w-3 h-3" />
                            {cfg.label}
                          </Badge>
                        </td>
                        <td className="py-3.5 text-muted-foreground font-mono text-xs hidden lg:table-cell">
                          {format(new Date(u.createdAt), "dd/MM/yyyy", {
                            locale: es,
                          })}
                        </td>
                        <td className="py-3.5">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEdit(u)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-white hover:bg-secondary/40"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteTarget(u)}
                              disabled={isSelf}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!filtered.length && (
                <p className="text-center text-muted-foreground/40 text-sm py-12">
                  No se encontraron usuarios
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border/80 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingUser ? "Editar usuario" : "Nuevo usuario"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                Nombre completo
              </Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Ej. Dr. Juan Pérez"
                className="bg-background/50 border-border/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                Email
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="usuario@cemedica.com"
                className="bg-background/50 border-border/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                Contraseña{" "}
                {editingUser && (
                  <span className="normal-case text-muted-foreground/60">
                    (dejar vacío para no cambiar)
                  </span>
                )}
              </Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder={editingUser ? "••••••••" : "Mínimo 6 caracteres"}
                className="bg-background/50 border-border/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                Rol
              </Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
              >
                <SelectTrigger className="bg-background/50 border-border/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="ADMIN">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                      Administrador
                    </span>
                  </SelectItem>
                  <SelectItem value="DOCTOR">
                    <span className="flex items-center gap-2">
                      <Stethoscope className="w-3.5 h-3.5 text-brand-teal" />
                      Doctor
                    </span>
                  </SelectItem>
                  <SelectItem value="RECEPCION">
                    <span className="flex items-center gap-2">
                      <ConciergeBell className="w-3.5 h-3.5 text-brand-orange" />
                      Recepción
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formError && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {formError}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-muted-foreground"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={createUser.isPending || updateUser.isPending}
              className="bg-violet-600 hover:bg-violet-500 text-white"
            >
              {editingUser ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="bg-card border-border/80">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              ¿Eliminar usuario?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Estás a punto de eliminar permanentemente a{" "}
              <span className="text-white font-semibold">
                {deleteTarget?.name}
              </span>
              . Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/60 text-muted-foreground hover:text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteUser.isPending}
              className="bg-red-600 hover:bg-red-500 text-white border-0"
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
