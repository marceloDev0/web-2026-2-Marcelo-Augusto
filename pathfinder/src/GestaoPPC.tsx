type Course = {
  name: string
  code: string
  hours: number
  prerequisites: string[]
}

const courses: Course[] = [
  { name: 'Introdução à Programação', code: 'INF101', hours: 60, prerequisites: [] },
  { name: 'Estruturas de Dados', code: 'INF201', hours: 60, prerequisites: ['Introdução à Programação'] },
  { name: 'Bases de Dados', code: 'INF202', hours: 60, prerequisites: ['Introdução à Programação'] },
  { name: 'Engenharia de Software', code: 'INF301', hours: 60, prerequisites: ['Estruturas de Dados', 'Bases de Dados'] },
]

function Prerequisites({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-sm text-slate-400">Nenhum</span>
  return <div className="flex flex-wrap gap-1.5">{items.map((item) => <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600" key={item}>{item}</span>)}</div>
}

export default function GestaoPPC() {
  return (
    <section className="min-h-[calc(100vh-81px)] px-6 py-8 md:px-10 md:py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Coordenação</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Catálogo Curricular</h1>
          <p className="mt-2 text-sm text-slate-500">Administre disciplinas, carga horária e dependências do PPC.</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700" type="button">+ Adicionar Disciplina</button>
      </header>

      <div className="hidden overflow-hidden border border-slate-200 bg-white md:block">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="px-6 py-4 font-semibold">Disciplina</th><th className="px-6 py-4 font-semibold">Código</th><th className="px-6 py-4 font-semibold">Carga horária</th><th className="px-6 py-4 font-semibold">Pré-requisitos</th></tr>
          </thead>
          <tbody>{courses.map((course) => <tr className="border-b border-slate-100 last:border-0" key={course.code}><td className="px-6 py-5 font-semibold text-slate-800">{course.name}</td><td className="px-6 py-5 text-sm text-slate-500">{course.code}</td><td className="px-6 py-5 text-sm text-slate-500">{course.hours}h</td><td className="px-6 py-5"><Prerequisites items={course.prerequisites} /></td></tr>)}</tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {courses.map((course) => <article className="border border-slate-200 bg-white p-5" key={course.code}><div className="flex items-start justify-between gap-4"><h2 className="font-bold text-slate-900">{course.name}</h2><span className="text-xs font-semibold text-slate-400">{course.code}</span></div><p className="mt-3 text-sm text-slate-500">Carga horária: {course.hours}h</p><div className="mt-4"><p className="mb-2 text-xs font-semibold uppercase text-slate-400">Pré-requisitos</p><Prerequisites items={course.prerequisites} /></div></article>)}
      </div>
    </section>
  )
}
