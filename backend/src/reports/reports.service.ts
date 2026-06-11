import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
const PDFDocument = require('pdfkit') as typeof import('pdfkit');
import type { Response } from 'express';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async generateAppointmentsReport(res: Response, from?: string, to?: string) {
    const where: Record<string, unknown> = { deletedAt: null };
    if (from || to) {
      where.scheduledAt = {};
      const scheduled = where.scheduledAt as Record<string, unknown>;
      if (from) scheduled.gte = new Date(from);
      if (to) scheduled.lte = new Date(to);
    }

    const appointments = await this.prisma.appointment.findMany({
      where: where as any,
      include: {
        patient: { select: { firstName: true, lastName: true, ci: true } },
        doctor: { select: { name: true } },
      },
      orderBy: { scheduledAt: 'asc' },
    });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="reporte-citas-${Date.now()}.pdf"`);
    doc.pipe(res);

    // Header y lógica de tabla...
    appointments.forEach((appt: any, idx: number) => { // <--- CORREGIDO
      if (doc.y > 700) doc.addPage();
      const rowTop = doc.y;
      let x = 50;
      const row = [
        String(idx + 1),
        `${appt.patient.lastName}, ${appt.patient.firstName}`,
        appt.doctor.name,
        new Date(appt.scheduledAt).toLocaleString('es-BO'),
        this.translateStatus(appt.status),
        (appt.reason ?? '').substring(0, 18),
      ];
      
      row.forEach((val: string, i: number) => { // <--- CORREGIDO
        doc.text(val, x + 2, rowTop, { width: [30, 120, 120, 100, 80, 85][i] - 4 });
        x += [30, 120, 120, 100, 80, 85][i];
      });
      doc.moveDown(0.8);
    });

    doc.end();
  }

  async generatePatientsReport(res: Response) {
    const patients = await this.prisma.patient.findMany({
      where: { deletedAt: null },
      orderBy: { lastName: 'asc' },
      include: { _count: { select: { appointments: true } } },
    });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // ... (cabecera del doc)

    patients.forEach((p: any, idx: number) => { // <--- CORREGIDO
      if (doc.y > 720) doc.addPage();
      doc.font('Helvetica-Bold').fontSize(10).text(`${idx + 1}. ${p.lastName} ${p.firstName}`);
      doc.font('Helvetica').fontSize(9).text(`Citas: ${p._count.appointments}`);
      doc.moveDown(0.5);
    });

    doc.end();
  }

  private translateStatus(status: string): string {
    const map: Record<string, string> = { SCHEDULED: 'Programada', COMPLETED: 'Completada', CANCELLED: 'Cancelada', NO_SHOW: 'No asistió' };
    return map[status] || status;
  }
}