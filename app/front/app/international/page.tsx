"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DiscountWindowInfo } from "../../components/DiscountWindowInfo";
import { NewsCard } from "../../components/NewsCard";
import { NewsBadge } from "../../components/NewsBadge";
import { NewsModal } from "../../components/NewsModal";
import { Button } from "../../components/ui/button";
import { MarketSentimentChart } from "../../components/MarketSentimentChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EconomicData {
  date: string;
  value: number;
}

interface FREDObservation {
  date: string;
  value: string;
}

interface FREDResponse {
  observations: FREDObservation[];
}

interface NewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

async function fetchFredSeries(series: string) {
  const response = await fetch(`/api/fred?series=${series}`);
  if (!response.ok) throw new Error(`Error fetching ${series}`);
  const data: FREDResponse = await response.json();
  return data.observations
    .map((obs: FREDObservation) => ({
      date: obs.date,
      value: Number.parseFloat(obs.value),
    }))
    .filter((item: EconomicData) => !isNaN(item.value));
}

const newsCategories = ["General", "Forex", "Crypto", "Merger", "Macroeconomia", "FED", "USA", "Argentina", "Finanzas"];
// const newsCategories = []

export default function Internacional() {
  const [cpiData, setCpiData] = useState<EconomicData[]>([]);
  const [pceData, setPceData] = useState<EconomicData[]>([]);
  const [fedFundsRate, setFedFundsRate] = useState<EconomicData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // useEffect(() => {
  //   // Fetch CPI data
  //   fetch("/api/fred?series_id=CPIAUCSL")
  //     .then((response) => response.json())
  //     .then((data: FREDResponse) => {
  //       setCpiData(
  //         data.observations.map((obs) => ({
  //           date: obs.date,
  //           value: Number.parseFloat(obs.value),
  //         }))
  //       );
  //     });

  //   // Fetch PCE data
  //   fetch("/api/fred?series_id=PCE")
  //     .then((response) => response.json())
  //     .then((data: FREDResponse) => {
  //       setPceData(
  //         data.observations.map((obs) => ({
  //           date: obs.date,
  //           value: Number.parseFloat(obs.value),
  //         }))
  //       );
  //     });

  //   // Fetch Federal Funds Rate data
  //   fetch("/api/fred?series_id=FEDFUNDS")
  //     .then((response) => response.json())
  //     .then((data: FREDResponse) => {
  //       setFedFundsRate(
  //         data.observations.map((obs) => ({
  //           date: obs.date,
  //           value: Number.parseFloat(obs.value),
  //         }))
  //       );
  //     });

  //   // Simulated news data (replace with actual API call if available)
  //   setNews([
  //     {
  //       title: "Fed Maintains Interest Rates",
  //       content:
  //         "The Federal Reserve decided to maintain current interest rates...",
  //       date: "2023-06-15",
  //     },
  //     {
  //       title: "Inflation Concerns Rise",
  //       content: "Recent CPI data shows an unexpected increase in inflation...",
  //       date: "2023-06-10",
  //     },
  //     {
  //       title: "PCE Index Suggests Moderate Growth",
  //       content:
  //         "The latest Personal Consumption Expenditures (PCE) index indicates...",
  //       date: "2023-06-05",
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [cpi, pce, ffr] = await Promise.all([
          fetchFredSeries("CPIAUCSL"),
          fetchFredSeries("PCE"),
          fetchFredSeries("FEDFUNDS"),
        ]);

        setCpiData(cpi);
        setPceData(pce);
        setFedFundsRate(ffr);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `/api/news?category=${selectedCategory}&page=${currentPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews(data.news);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    }

    fetchNews();
  }, [selectedCategory, currentPage]);

  if (isLoading) return <div>Loading economic data...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Economic Indicators",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const chartData = {
    labels: cpiData
      .slice(-12)
      .map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "CPI",
        data: cpiData.slice(-12).map((d) => d.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "PCE",
        data: pceData.slice(-12).map((d) => d.value),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Federal Funds Rate",
        data: fedFundsRate.slice(-12).map((d) => d.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sección Internacional</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Indicadores Económicos</CardTitle>
          </CardHeader>
          <CardContent>
            <Line options={chartOptions} data={chartData} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Últimos Datos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indicador</TableHead>
                  <TableHead>Último Valor</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>CPI</TableCell>
                  <TableCell>
                    {cpiData[cpiData.length - 1]?.value.toFixed(2)}
                  </TableCell>
                  <TableCell>{cpiData[cpiData.length - 1]?.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PCE</TableCell>
                  <TableCell>
                    {pceData[pceData.length - 1]?.value.toFixed(2)}
                  </TableCell>
                  <TableCell>{pceData[pceData.length - 1]?.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Federal Funds Rate</TableCell>
                  <TableCell>
                    {fedFundsRate[fedFundsRate.length - 1]?.value.toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    {new Date(fedFundsRate[fedFundsRate.length - 1]?.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <DiscountWindowInfo />
        <MarketSentimentChart />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Noticias Económicas</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {newsCategories.map((category) => (
              <NewsBadge
                key={category}
                category={category}
                isSelected={category === selectedCategory}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                title={item.headline}
                summary={item.summary}
                date={new Date(item.datetime * 1000).toISOString()}
                onSelect={() => setSelectedNews(item)}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedNews && (
        <NewsModal
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
          title={selectedNews.headline}
          content={selectedNews.summary}
          date={new Date(selectedNews.datetime * 1000).toISOString()}
          url={selectedNews.url}
        />
      )}

      {/* <Card className="mt-6">
        <CardHeader>
          <CardTitle>Noticias Económicas</CardTitle>
        </CardHeader>
        <CardContent>
          {news.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.date}</p>
              <p className="mt-2">{item.content}</p>
            </div>
          ))}
        </CardContent>
      </Card> */}
    </div>
  );
}
