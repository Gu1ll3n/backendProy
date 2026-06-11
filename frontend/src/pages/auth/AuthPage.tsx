import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  RefreshCw,
  LogIn,
  HeartPulse,
} from "lucide-react";

import authApi from "@/lib/auth.api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
  captchaAnswer: z.string().min(1, "Respuesta CAPTCHA requerida"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [captcha, setCaptcha] = useState<{
    token: string;
    question: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const fetchCaptcha = async () => {
    try {
      const data = await authApi.getCaptcha();
      setCaptcha(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar CAPTCHA");
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const onSubmit = async (values: LoginForm) => {
    if (!captcha) return;

    setIsLoading(true);

    try {
      const data = await authApi.login({
        email: values.email,
        password: values.password,
        captchaToken: captcha.token,
        captchaAnswer: values.captchaAnswer,
      });

      console.log("LOGIN RESPONSE:", data);

      login(data.accessToken, data.user);

      console.log("STORE:", useAuthStore.getState());

      toast.success(`Bienvenido, ${data.user.name}`);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      toast.error(
        err?.response?.data?.message ||
          "Credenciales inválidas"
      );

      fetchCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 mb-4 shadow-lg relative">
            <HeartPulse className="w-10 h-10 text-brand-teal" />
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            <span className="text-brand-teal">CEM</span>
            <span className="text-slate-100">EDICA</span>
          </h1>

          <p className="text-brand-orange/90 font-medium mt-1 text-sm tracking-wide">
            Diagnóstico y Tratamiento Médico
          </p>
        </div>

        <Card className="card-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-teal to-brand-orange" />

          <CardHeader>
            <CardTitle className="text-white">
              Iniciar sesión
            </CardTitle>

            <CardDescription>
              Ingrese sus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="email">
                  Correo electrónico
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cemedica.com"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Contraseña
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="captchaAnswer">
                    CAPTCHA
                  </Label>

                  <button
                    type="button"
                    onClick={fetchCaptcha}
                    className="text-sm text-cyan-400 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Actualizar
                  </button>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 border rounded-md p-3">
                    {captcha
                      ? captcha.question
                      : "Cargando..."}
                  </div>

                  <Input
                    id="captchaAnswer"
                    type="number"
                    className="w-24"
                    {...register("captchaAnswer")}
                  />
                </div>

                {errors.captchaAnswer && (
                  <p className="text-red-500 text-sm">
                    {errors.captchaAnswer.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || !captcha}
                className="w-full"
              >
                {isLoading ? (
                  "Ingresando..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Ingresar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs mt-6 text-muted-foreground">
          © {new Date().getFullYear()} CEMEDICA
        </p>
      </div>
    </div>
  );
}