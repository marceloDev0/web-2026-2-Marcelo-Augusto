import { useState } from 'react'

export default function Perfil() {
  const [fileName, setFileName] = useState('')
  const [synced, setSynced] = useState(false)

  return (
    <section className="min-h-[calc(100vh-81px)] px-6 py-8 md:px-10 md:py-12">
      <div className="max-w-3xl">
        <div className="border-b border-slate-200 pb-8 md:pb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">A minha conta</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Configurações e Histórico</h1>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Nome completo</p><p className="mt-2 text-lg font-semibold text-slate-800">Mariana Alves Costa</p></div>
            <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Matrícula</p><p className="mt-2 text-lg font-semibold text-slate-800">202312345</p></div>
            <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Curso atual</p><p className="mt-2 text-lg font-semibold text-slate-800">Engenharia Informática</p></div>
            <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Carga horária exigida</p><p className="mt-2 text-lg font-semibold text-slate-800">3.600 horas</p></div>
          </div>
        </div>

        <div className="pt-8 md:pt-10">
          <h2 className="text-2xl font-bold text-slate-900">Importar Histórico do SIGAA</h2>
          <p className="mt-2 text-sm text-slate-500">Atualize o seu progresso carregando o ficheiro JSON exportado pelo SIGAA.</p>
          <label className="mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-blue-400 hover:bg-blue-50/40" htmlFor="sigaa-file">
            <span className="mb-3 text-3xl text-blue-600" aria-hidden="true">↑</span>
            <span className="font-semibold text-slate-700">Clique ou arraste o ficheiro JSON do SIGAA</span>
            <span className="mt-2 text-sm text-slate-500">{fileName || 'Apenas ficheiros .json'}</span>
            <input accept=".json,application/json" className="sr-only" id="sigaa-file" type="file" onChange={(event) => { setFileName(event.target.files?.[0]?.name || ''); setSynced(false) }} />
          </label>
          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300" type="button" disabled={!fileName} onClick={() => setSynced(true)}>
            Sincronizar Dados
          </button>
          {synced && <p className="mt-3 text-sm font-medium text-emerald-600">Histórico sincronizado com sucesso.</p>}
        </div>
      </div>
    </section>
  )
}
