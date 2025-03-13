"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "../../components/ui/table"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Plus, CreditCard, Trash2 } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export default function Gastos() {
  const [tarjetas, setTarjetas] = useState([
    {
      nombre: "Tarjeta 1",
      gastos: [{ concepto: "Gasto 1", montos: Array(12).fill(0) }],
    },
    {
      nombre: "Tarjeta 2",
      gastos: [{ concepto: "Gasto 1", montos: Array(12).fill(0) }],
    },
    {
      nombre: "Tarjeta 3",
      gastos: [{ concepto: "Gasto 1", montos: Array(12).fill(0) }],
    },
  ])

  const [otrosGastos, setOtrosGastos] = useState([
    { nombre: "Alquiler", monto: 0, pagado: false },
    { nombre: "Obra Social", monto: 0, pagado: false },
    { nombre: "Internet", monto: 0, pagado: false },
  ])

  const [sueldo, setSueldo] = useState(0)
  const [mesSeleccionado, setMesSeleccionado] = useState(1) // Febrero por defecto

  const actualizarNombreTarjeta = (tarjetaIndex: number, nuevoNombre: string) => {
    const nuevasTarjetas = [...tarjetas]
    nuevasTarjetas[tarjetaIndex].nombre = nuevoNombre
    setTarjetas(nuevasTarjetas)
  }

  const actualizarGasto = (tarjetaIndex: number, gastoIndex: number, mesIndex: number, valor: number) => {
    const nuevasTarjetas = [...tarjetas]
    nuevasTarjetas[tarjetaIndex].gastos[gastoIndex].montos[mesIndex] = valor
    setTarjetas(nuevasTarjetas)
  }

  const actualizarConceptoGasto = (tarjetaIndex: number, gastoIndex: number, nuevoConcepto: string) => {
    const nuevasTarjetas = [...tarjetas]
    nuevasTarjetas[tarjetaIndex].gastos[gastoIndex].concepto = nuevoConcepto
    setTarjetas(nuevasTarjetas)
  }

  const agregarGasto = (tarjetaIndex: number) => {
    const nuevasTarjetas = [...tarjetas]
    nuevasTarjetas[tarjetaIndex].gastos.push({ concepto: "Nuevo Gasto", montos: Array(12).fill(0) })
    setTarjetas(nuevasTarjetas)
  }

  const eliminarGasto = (tarjetaIndex: number, gastoIndex: number) => {
    const nuevasTarjetas = [...tarjetas]
    nuevasTarjetas[tarjetaIndex].gastos.splice(gastoIndex, 1)
    setTarjetas(nuevasTarjetas)
  }

  const actualizarOtroGasto = (
    index: number,
    campo: "nombre" | "monto" | "pagado",
    valor: string | number | boolean,
  ) => {
    const nuevosOtrosGastos = [...otrosGastos]
    // @ts-ignore
    nuevosOtrosGastos[index][campo] = valor
    setOtrosGastos(nuevosOtrosGastos)
  }

  const agregarOtroGasto = () => {
    setOtrosGastos([...otrosGastos, { nombre: "Nuevo Gasto", monto: 0, pagado: false }])
  }

  const eliminarOtroGasto = (index: number) => {
    const nuevosOtrosGastos = [...otrosGastos]
    nuevosOtrosGastos.splice(index, 1)
    setOtrosGastos(nuevosOtrosGastos)
  }

  const totalGastosTarjetas = tarjetas.reduce(
    (total, tarjeta) => total + tarjeta.gastos.reduce((sum, gasto) => sum + gasto.montos[mesSeleccionado], 0),
    0,
  )
  const totalOtrosGastos = otrosGastos.reduce((total, gasto) => total + gasto.monto, 0)
  const totalGastos = totalGastosTarjetas + totalOtrosGastos

  const datosGraficoBarras = {
    labels: ["Tarjetas", "Otros Gastos"],
    datasets: [
      {
        label: "Gastos",
        data: [totalGastosTarjetas, totalOtrosGastos],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
      },
    ],
  }

  const datosGraficoPie = {
    labels: ["Gastos", "Restante"],
    datasets: [
      {
        data: [totalGastos, Math.max(0, sueldo - totalGastos)],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)"],
      },
    ],
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Seguimiento de Gastos</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Tarjetas de Crédito</h2>
        {tarjetas.map((tarjeta, tarjetaIndex) => (
          <Card key={tarjetaIndex} className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2" />
                <Input
                  value={tarjeta.nombre}
                  onChange={(e) => actualizarNombreTarjeta(tarjetaIndex, e.target.value)}
                  className="w-48"
                />
              </CardTitle>
              <Button variant="outline" size="icon" onClick={() => agregarGasto(tarjetaIndex)}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Concepto</TableHead>
                    {meses.map((mes, index) => (
                      <TableHead
                        key={index}
                        className={`cursor-pointer ${mesSeleccionado === index ? "bg-primary text-primary-foreground" : ""}`}
                        onClick={() => setMesSeleccionado(index)}
                      >
                        {mes}
                      </TableHead>
                    ))}
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tarjeta.gastos.map((gasto, gastoIndex) => (
                    <TableRow key={gastoIndex}>
                      <TableCell>
                        <Input
                          value={gasto.concepto}
                          onChange={(e) => actualizarConceptoGasto(tarjetaIndex, gastoIndex, e.target.value)}
                          className="w-32"
                        />
                      </TableCell>
                      {gasto.montos.map((monto, mesIndex) => (
                        <TableCell key={mesIndex}>
                          <Input
                            type="number"
                            value={monto}
                            onChange={(e) =>
                              actualizarGasto(tarjetaIndex, gastoIndex, mesIndex, Number(e.target.value))
                            }
                            className="w-20"
                          />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => eliminarGasto(tarjetaIndex, gastoIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={mesSeleccionado + 1}>
                      Total del mes seleccionado ({meses[mesSeleccionado]}):
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {tarjeta.gastos.reduce((total, gasto) => total + gasto.montos[mesSeleccionado], 0)}
                    </TableCell>
                    <TableCell colSpan={11 - mesSeleccionado}></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Otros Gastos Fijos</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gasto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Pagado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {otrosGastos.map((gasto, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={gasto.nombre}
                    onChange={(e) => actualizarOtroGasto(index, "nombre", e.target.value)}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={gasto.monto}
                    onChange={(e) => actualizarOtroGasto(index, "monto", Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={gasto.pagado}
                    onCheckedChange={(checked) => actualizarOtroGasto(index, "pagado", checked)}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive" size="icon" onClick={() => eliminarOtroGasto(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={agregarOtroGasto} className="mt-4">
          <Plus className="mr-2 h-4 w-4" /> Agregar Gasto Fijo
        </Button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Sueldo</h2>
        <Input
          type="number"
          value={sueldo}
          onChange={(e) => setSueldo(Number(e.target.value))}
          className="w-48"
          placeholder="Ingrese su sueldo"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Gastos ({meses[mesSeleccionado]})</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={datosGraficoBarras} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Porcentaje de Gastos sobre Sueldo ({meses[mesSeleccionado]})</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={datosGraficoPie} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

//TODO: Agregar un grafico de barras para los gastos por tarjeta