import { useState } from 'react'
import type { FormEvent } from 'react'

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
  const [courseList, setCourseList] = useState(courses)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState({ name: '', code: '', hours: '', prerequisites: '' })
  const [errors, setErrors] = useState({ name: '', code: '', hours: '' })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = {
      name: form.name.trim() ? '' : 'Informe o nome da disciplina.',
      code: /^[A-Z]{3}\d{3}$/.test(form.code.trim().toUpperCase()) ? '' : 'Use o formato ABC123.',
      hours: Number(form.hours) > 0 ? '' : 'Informe uma carga horária válida.',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setCourseList((current) => [...current, {
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      hours: Number(form.hours),
      prerequisites: form.prerequisites.split(',').map((item) => item.trim()).filter(Boolean),
    }])
    setForm({ name: '', code: '', hours: '', prerequisites: '' })
    setErrors({ name: '', code: '', hours: '' })
    setIsFormOpen(false)
  }

  return (
    <section className="min-h-[calc(100vh-81px)] px-6 py-8 md:px-10 md:py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Coordenação</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Catálogo Curricular</h1>
          <p className="mt-2 text-sm text-slate-500">Administre disciplinas, carga horária e dependências do PPC.</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700" type="button" onClick={() => setIsFormOpen((current) => !current)}>{isFormOpen ? 'Fechar formulário' : '+ Adicionar Disciplina'}</button>
      </header>

      {isFormOpen && (
        <form className="mb-8 border border-slate-200 bg-white p-5 md:p-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="course-name">Nome da disciplina</label>
              <input className={`w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-slate-300'}`} id="course-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="course-code">Código</label>
              <input className={`w-full rounded-lg border px-3 py-2.5 uppercase outline-none focus:border-blue-500 ${errors.code ? 'border-red-500' : 'border-slate-300'}`} id="course-code" placeholder="INF401" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
              {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="course-hours">Carga horária</label>
              <input className={`w-full rounded-lg border px-3 py-2.5 outline-none focus:border-blue-500 ${errors.hours ? 'border-red-500' : 'border-slate-300'}`} id="course-hours" min="1" type="number" value={form.hours} onChange={(event) => setForm({ ...form, hours: event.target.value })} />
              {errors.hours && <p className="mt-1 text-sm text-red-600">{errors.hours}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="course-prerequisites">Pré-requisitos</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500" id="course-prerequisites" placeholder="Separe por vírgulas" value={form.prerequisites} onChange={(event) => setForm({ ...form, prerequisites: event.target.value })} />
            </div>
          </div>
          <button className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700" type="submit">Guardar disciplina</button>
        </form>
      )}

      <div className="hidden overflow-hidden border border-slate-200 bg-white md:block">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="px-6 py-4 font-semibold">Disciplina</th><th className="px-6 py-4 font-semibold">Código</th><th className="px-6 py-4 font-semibold">Carga horária</th><th className="px-6 py-4 font-semibold">Pré-requisitos</th></tr>
          </thead>
          <tbody>{courseList.map((course) => <tr className="border-b border-slate-100 last:border-0" key={course.code}><td className="px-6 py-5 font-semibold text-slate-800">{course.name}</td><td className="px-6 py-5 text-sm text-slate-500">{course.code}</td><td className="px-6 py-5 text-sm text-slate-500">{course.hours}h</td><td className="px-6 py-5"><Prerequisites items={course.prerequisites} /></td></tr>)}</tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {courseList.map((course) => <article className="border border-slate-200 bg-white p-5" key={course.code}><div className="flex items-start justify-between gap-4"><h2 className="font-bold text-slate-900">{course.name}</h2><span className="text-xs font-semibold text-slate-400">{course.code}</span></div><p className="mt-3 text-sm text-slate-500">Carga horária: {course.hours}h</p><div className="mt-4"><p className="mb-2 text-xs font-semibold uppercase text-slate-400">Pré-requisitos</p><Prerequisites items={course.prerequisites} /></div></article>)}
      </div>
    </section>
  )
}
