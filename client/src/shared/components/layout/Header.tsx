import { useAuthStore } from "@/modules/auth/store/auth.store";

export const Header = () => {
    const user = useAuthStore(state => state.user);

    return (
        <header className="border-b bg-base-100 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    Dashboard
                </h1>

                <div>
                    <span className="font-medium">
                        {user?.name}
                    </span>
                </div>
            </div>
        </header>
    )
}