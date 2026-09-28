import { useNavigate } from 'react-router-dom'

const savedPlans = [
  { title: 'Plano Formatura 2026', edited: 'Editado hoje', progress: '65%' },
  { title: 'Percurso de Mobilidade', edited: 'Editado há 2 dias', progress: '42%' },
  { title: 'Plano Alternativo', edited: 'Editado em 12 mar. 2026', progress: '28%' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[calc(100vh-81px)] px-6 py-8 md:px-10 md:py-12">
      <div className="mb-10 bg-slate-50 p-6 md:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Visão geral</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Meu Progresso</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-500">Acompanhe o seu percurso e mantenha o foco nos próximos passos.</p>
          </div>
          <span className="text-2xl font-bold text-slate-900">65%</span>
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200" aria-label="65% concluído">
          <div className="h-full w-[65%] rounded-full bg-blue-600" />
        </div>
        <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
          <span>72 de 110 créditos concluídos</span>
          <span>Em andamento</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Continue de onde parou</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Meus Planejamentos Salvos</h2>
        </div>
        <button className="hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 md:block" type="button" onClick={() => navigate('/simulador')}>
          + Criar Nova Simulação
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-3">
        {savedPlans.map((plan) => (
          <article className="flex min-h-52 flex-col justify-between border border-slate-200 bg-white p-5" key={plan.title}>
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-slate-900">{plan.title}</h3>
                <span className="text-xs font-semibold text-blue-600">{plan.progress}</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">{plan.edited}</p>
            </div>
            <button className="mt-8 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600" type="button" onClick={() => navigate('/simulador')}>
              Abrir Simulação
            </button>
          </article>
        ))}
      </div>

      <button aria-label="Criar Nova Simulação" className="fixed bottom-20 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 md:hidden" type="button" onClick={() => navigate('/simulador')}>
        +
      </button>
    </section>
  )
}
