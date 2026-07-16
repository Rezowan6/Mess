import { LoginForm } from "../components/LoginForm"

export const LoginPage = () => {
  return (
    <div className=" flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
            <h1 className="text-center text-3xl font-bold">Mess Management System</h1>

            <p className="text-center text-base-content/70">sign in to your account</p>

            <div className="mt-6">
                <LoginForm />
            </div>
        </div>
      </div>
    </div>
  )
}
