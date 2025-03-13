"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { IconUserOff } from "@tabler/icons-react";

interface DiscountWindowData {
  date: string;
  amount: number;
}

interface FREDObservation {
  date: string;
  value: string;
}

interface FREDResponse {
  observations: FREDObservation[];
}

export function DiscountWindowInfo() {
  const [discountWindowData, setDiscountWindowData] = useState<
    DiscountWindowData[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Discount Window data
    async function fetchData() {
      try {
        const response = await fetch("/api/fred?series=WDISCL");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data: FREDResponse = await response.json();
        setDiscountWindowData(
          data.observations
            .map((obs: FREDObservation) => ({
              date: obs.date,
              amount: Number.parseFloat(obs.value),
            }))
            .filter((item: DiscountWindowData) => !isNaN(item.amount))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <div>Loading discount window data...</div>;
  // if (error)
  //   return (
  //     <div className="text-center py-10">
  //       <IconUserOff size={48} className="mx-auto mb-4 text-gray-400" />
  //       <h2 className="text-xl font-semibold mb-2">
  //         Grafica no disponible momentaneamente
  //       </h2>
  //       <p className="text-gray-600">
  //         Estamos experimentando un pequeño problema, lamentamos las molestias,
  //       </p>
  //       <p className="text-gray-600">
  //         los datos acerca de la ventanilla de descuentos de la fed volvera
  //         pronto.
  //       </p>
  //     </div>
  //     // <div>Error: {error}</div>
  //   );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventanilla de Descuentos de la FED</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          La ventanilla de descuentos es un mecanismo utilizado por la Reserva
          Federal para proporcionar liquidez a corto plazo a los bancos y otras
          instituciones de depósito.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Monto (Millones de USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discountWindowData.slice(-5).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
