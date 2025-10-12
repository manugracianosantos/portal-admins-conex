// A pasta app em geral define as páginas principais do projeto
// Esta é a página inicial que aparece em: http://localhost:3000 (login)


/*O arquivo page.tsx em específico, representa as páginas da aplicação,
essa é a página principal, e para isso temos as importações dos componentes */

import { UserProfileCard } from "@/components/user-profile-card"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Dashboard } from "@/components/dashboard"
import { UserList } from "@/components/user-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Tabs defaultValue="cards" className="w-full">
        <div className="bg-white border-b border-[#e3e3e3] px-8 py-4">
          <TabsList className="bg-[#f8f8f8]">
            <TabsTrigger value="cards">Profile Cards</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">User List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="cards" className="p-8">
          <div className="flex flex-wrap gap-6 justify-center">
            <UserProfileCard
              name="Griselda Pereira"
              email="griselapereira@gmail.com"
              createdDate="27/05/2025"
              updatedDate="03/10/2025"
              id="001"
              phone="1995450-5430"
              birthDate="22/08/1991"
              cpf="623.254.562-66"
              userType="profissional"
            />
            <UserProfileCard
              name="Griselda Pereira"
              email="griselapereira@gmail.com"
              createdDate="27/05/2025"
              updatedDate="03/10/2025"
              id="001"
              phone="1995450-5430"
              birthDate="22/08/1991"
              cpf="623.254.562-66"
              userType="profissional"
            />
          </div>
        </TabsContent>

        <TabsContent value="login" className="p-0">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register" className="p-0">
          <RegisterForm />
        </TabsContent>

        <TabsContent value="dashboard" className="p-0">
          <Dashboard />
        </TabsContent>

        <TabsContent value="users" className="p-0">
          <UserList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
