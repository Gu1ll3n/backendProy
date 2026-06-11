import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuditService } from '../audit/audit.service';

type AppointmentSummary = {
  scheduledAt: Date;
  doctorId: number;
  doctor: { name: string };
};

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService, private audit: AuditService) {}

  async create(dto: CreateAppointmentDto, userId?: number) {
    const appt = await this.prisma.appointment.create({
      data: { ...dto, scheduledAt: new Date(dto.scheduledAt), status: dto.status || 'SCHEDULED' },
      include: {
        patient: { select: { id: true, firstName: true, lastName: true, ci: true } },
        doctor: { select: { id: true, name: true, email: true } },
      },
    });
    await this.audit.log(userId, 'APPOINTMENT_CREATED', 'Appointment', appt.id, `${appt.patient.firstName} ${appt.patient.lastName} — Dr. ${appt.doctor.name}`);
    return appt;
  }

  async findAll(filters?: any) {
    const where: any = { deletedAt: null };
    if (filters?.patientId) where.patientId = filters.patientId;
    if (filters?.doctorId) where.doctorId = filters.doctorId;
    if (filters?.status) where.status = filters.status;
    return this.prisma.appointment.findMany({ where, include: { patient: true, doctor: true } });
  }

  async findOne(id: number) {
    const appt = await this.prisma.appointment.findFirst({ where: { id, deletedAt: null }, include: { patient: true, doctor: true } });
    if (!appt) throw new NotFoundException('Cita no encontrada');
    return appt;
  }

  async update(id: number, dto: UpdateAppointmentDto, userId?: number) {
    await this.findOne(id);
    const updated = await this.prisma.appointment.update({ where: { id }, data: { ...dto } });
    return updated;
  }

  async remove(id: number, userId?: number) {
    await this.findOne(id);
    return await this.prisma.appointment.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async getDashboardStats() {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const [total, todayCount, completed, cancelled, totalPatients, allAppointments] =
      await Promise.all([
        this.prisma.appointment.count({ where: { deletedAt: null } }),
        this.prisma.appointment.count({ where: { deletedAt: null, scheduledAt: { gte: startOfDay, lt: endOfDay } } }),
        this.prisma.appointment.count({ where: { deletedAt: null, status: 'COMPLETED' } }),
        this.prisma.appointment.count({ where: { deletedAt: null, status: 'CANCELLED' } }),
        this.prisma.patient.count({ where: { deletedAt: null } }),
        this.prisma.appointment.findMany({
          where: { deletedAt: null },
          select: { scheduledAt: true, doctorId: true, doctor: { select: { name: true } } },
        }) as Promise<AppointmentSummary[]>,
      ]);

    const now = new Date();
    const citasPorMes: { mes: string; total: number }[] = [];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const count = allAppointments.filter((a: AppointmentSummary) => {
        const dt = new Date(a.scheduledAt);
        return dt >= d && dt < nextMonth;
      }).length;
      citasPorMes.push({ mes: monthNames[d.getMonth()], total: count });
    }

    const doctorMap = new Map<number, { name: string; count: number }>();
    for (const a of allAppointments) {
      doctorMap.set(a.doctorId, { 
        name: a.doctor.name, 
        count: (doctorMap.get(a.doctorId)?.count || 0) + 1 
      });
    }
    
    const topDoctores = [...doctorMap.entries()]
      .map(([id, data]) => ({ name: data.name, citas: data.count }))
      .sort((a, b) => b.citas - a.citas)
      .slice(0, 5);

    return { total, todayCount, completed, cancelled, totalPatients, citasPorMes, topDoctores };
  }
}