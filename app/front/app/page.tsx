import Link from "next/link"
import { CreditCard, TrendingUp, Globe, Activity } from "lucide-react"
import { LoginButton } from "../components/LoginButton"
import { AccountsOverview } from "../components/financial-ui/accounts-overview"
import { RecentTransactions } from "../components/financial-ui/recent-transactions"
import { QuickBillPay } from "../components/financial-ui/quick-bill-pay"
import { BusinessMetrics } from "../components/financial-ui/business-metrics"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AccountsOverview />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-1">
          <QuickBillPay />
        </div>
      </div>

      <BusinessMetrics />
    </div>
  )
  
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  //     <h1 className="text-4xl font-bold mb-8">Finanzas Personales</h1>
  //     <div className="flex space-x-4">
  //       <Link
  //         href="/gastos"
  //         className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
  //       >
  //         <CreditCard className="mr-2" />
  //         Gastos
  //       </Link>
  //       <Link
  //         href="/inversiones"
  //         className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
  //       >
  //         <TrendingUp className="mr-2" />
  //         Inversiones
  //       </Link>
  //       <Link
  //         href="/international"
  //         className="flex items-center justify-center bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
  //       >
  //         <Globe className="mr-2" />
  //         Internacional
  //       </Link>
  //       <Link
  //         href="/merval"
  //         className="flex items-center justify-center bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
  //       >
  //         <Activity className="mr-2" />
  //         Mervalneta
  //       </Link>
  //     </div>
  //     <LoginButton />
  //   </div>
  // )
}