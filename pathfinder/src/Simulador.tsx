import { useState } from 'react'

type SubjectStatus = 'completed' | 'pending' | 'blocked'

type Subject = {
  name: string
  hours: number
  status: SubjectStatus
}

const semesters: { name: string; subjects: Subject[] }[] = [
  {
    name: '1º Semestre',
    subjects: [
      { name: 'Introdução à Programação', hours: 60, status: 'completed' },
      { name: 'Matemática Discreta', hours: 60, status: 'completed' },
      { name: 'Fundamentos de Sistemas', hours: 45, status: 'pending' },
    ],
  },
  {
    name: '2º Semestre',
    subjects: [
      { name: 'Estruturas de Dados', hours: 60, status: 'pending' },
      { name: 'Bases de Dados', hours: 60, status: 'pending' },
      { name: 'Arquitetura de Computadores', hours: 45, status: 'blocked' },
    ],
  },
  {
    name: '3º Semestre',
    subjects: [
      { name: 'Engenharia de Software', hours: 60, status: 'pending' },
      { name: 'Desenvolvimento Web', hours: 60, status: 'pending' },
    ],
  },
  {
    name: '4º Semestre',
    subjects: [
      { name: 'Projeto Integrador', hours: 90, status: 'blocked' },
      { name: 'Sistemas Distribuídos', hours: 60, status: 'pending' },
    ],
  },
]

const statusColors: Record<SubjectStatus, string> = {
  completed: 'bg-emerald-500',
  pending: 'bg-slate-300',
  blocked: 'bg-red-500',
}

function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
      <div className="flex items-start gap-2">
        <span aria-label={subject.status} className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${statusColors[subject.status]}`} />
        <h3 className="text-sm font-semibold leading-5 text-slate-800">{subject.name}</h3>
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">{subject.hours} horas</p>
    </article>
  )
}

export default function Simulador() {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0].name)

  return (
    <section className="min-h-[calc(100vh-81px)] px-6 py-8 md:px-10 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Planeamento</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Simulador Curricular</h1>
          <p className="mt-2 text-sm text-slate-500">Explore cenários e organize as próximas disciplinas do seu percurso.</p>
        </div>
        <label className="w-full text-sm font-semibold text-slate-700 md:hidden" htmlFor="semester-select">
          Semestre
          <select className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" id="semester-select" value={selectedSemester} onChange={(event) => setSelectedSemester(event.target.value)}>
            {semesters.map((semester) => <option key={semester.name}>{semester.name}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:overflow-x-auto md:pb-4">
        {semesters.map((semester) => (
          <section className={`${selectedSemester !== semester.name ? 'hidden md:block' : ''} min-w-0 md:min-w-64 md:flex-1`} key={semester.name}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">{semester.name}</h2>
              <span className="text-xs font-medium text-slate-400">{semester.subjects.length} disciplinas</span>
            </div>
            <div className="space-y-3 rounded-xl bg-slate-50 p-3">
              {semester.subjects.map((subject) => <SubjectCard key={subject.name} subject={subject} />)}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
