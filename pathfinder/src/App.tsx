import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import Dashboard from './Dashboard'
import GestaoPPC from './GestaoPPC'
import Perfil from './Perfil'
import Simulador from './Simulador'

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: '⌂' },
  { label: 'Simulador', path: '/simulador', icon: '▣' },
  { label: 'Gestão', path: '/gestao', icon: '☷' },
  { label: 'Perfil', path: '/perfil', icon: '◉' },
]

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ''
        : 'Informe um e-mail institucional válido.',
      password: password ? '' : 'A palavra-passe é obrigatória.',
    }

    setErrors(nextErrors)
    if (!nextErrors.email && !nextErrors.password) navigate('/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl shadow-slate-950/30 sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Pathfinder
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Aceda ao seu percurso académico
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Entre com as suas credenciais institucionais para continuar.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
              E-mail Institucional
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
              Palavra-passe
            </label>
            <input
              className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600" id="password-error">{errors.password}</p>}
          </div>

          <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" type="submit">
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="hidden border-b border-slate-200 bg-white md:block">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <NavLink className="text-xl font-bold tracking-tight text-slate-900" to="/dashboard">Pathfinder</NavLink>
          <div className="flex items-center gap-8">
            {navigation.map((item) => <NavigationLink key={item.path} item={item} desktop />)}
          </div>
        </nav>
      </header>
      <main className="mx-auto min-h-[calc(100vh-81px)] max-w-7xl pb-24 md:pb-8">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white md:hidden">
        <div className="grid grid-cols-4">
          {navigation.map((item) => <NavigationLink key={item.path} item={item} />)}
        </div>
      </nav>
    </div>
  )
}

function NavigationLink({ item, desktop = false }: { item: typeof navigation[number]; desktop?: boolean }) {
  return (
    <NavLink
      className={({ isActive }: { isActive: boolean }) => `${desktop ? 'text-sm' : 'flex flex-col items-center gap-1 py-3 text-xs'} font-semibold transition ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
      to={item.path}
    >
      <span aria-hidden="true" className={desktop ? 'hidden' : 'text-lg leading-none'}>{item.icon}</span>
      {item.label}
    </NavLink>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/gestao" element={<GestaoPPC />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  )
}

export default App
