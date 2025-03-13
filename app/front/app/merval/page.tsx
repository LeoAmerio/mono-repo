'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { ArrowUpDown, Search } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"

type Stock = {
  symbol: string
  px_bid: number
  px_ask: number
  c: number
  pct_change: number
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('es-AR').format(num);
};

const formatPercentage = (num: number) => {
  return num.toFixed(2) + '%';
};

export default function Component() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('symbol')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetch('https://data-912-proxy.ferminrp.workers.dev/live/arg_stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stocks:', error))
  }, [])

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aValue = a[sortBy as keyof Stock];
    const bValue = b[sortBy as keyof Stock];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  })
  // const sortedStocks = [...filteredStocks].sort((a, b) => {
  //   if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
  //   if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
  //   return 0
  // })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cotizaciones del Merval</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por símbolo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="symbol">Símbolo</SelectItem>
              <SelectItem value="px_bid">Precio de compra</SelectItem>
              <SelectItem value="px_ask">Precio de venta</SelectItem>
              <SelectItem value="c">Último</SelectItem>
              <SelectItem value="pct_change">Cambio %</SelectItem>
            </SelectContent>
          </Select>
          <button onClick={toggleSortOrder} className="p-2 border rounded">
            <ArrowUpDown className={`transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedStocks.map((stock) => {
          const spreadValue = stock.px_ask - stock.px_bid;
          const spreadPercentage = (spreadValue / ((stock.px_ask + stock.px_bid) / 2)) * 100;
          
          return (
            <Card key={stock.symbol} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://icons.com.ar/icons/acciones/${stock.symbol.toUpperCase()}.svg`}
                      alt={stock.symbol}
                    />
                    <AvatarFallback className="bg-primary/10">
                      {stock.symbol.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{stock.symbol}</h2>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Compra:</div>
                    <div className="text-sm font-semibold">${formatNumber(stock.px_bid)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Venta:</div>
                    <div className="text-sm font-semibold">${formatNumber(stock.px_ask)}</div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div>Spread:</div>
                    <div>
                      ${formatNumber(spreadValue)} ({formatPercentage(spreadPercentage)})
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Último:</div>
                      <div className="text-sm font-semibold">${formatNumber(stock.c)}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Variación:</div>
                      <div className={`text-sm font-semibold ${stock.pct_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(stock.pct_change)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}