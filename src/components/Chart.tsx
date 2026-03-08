import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Currency } from '../types/currency';
import type { YearlyProjection } from '../types/calculator';
import { formatCurrency } from '../utils/formatting';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  data: YearlyProjection[];
  currency: Currency;
}

export function Chart({ data, currency }: ChartProps) {
  const labels = data.map((d) => `Year ${d.year}`);

  const totalValues = data.map((projection) => projection.totalAmount);
  const contributionsOnly = data.map((_projection, idx) => {
    // Calculate cumulative contributions up to this year
    const cumulativeContributions = data
      .slice(0, idx + 1)
      .reduce((sum, year) => sum + year.contributions, 0) + data[0].principal;
    return cumulativeContributions;
  });
  const interestOnly = data.map((_projection, idx) => totalValues[idx] - contributionsOnly[idx]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Value',
        data: totalValues,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Total Contributions',
        data: contributionsOnly,
        borderColor: 'rgb(107, 114, 128)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Interest Earned',
        data: interestOnly,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y, currency);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return formatCurrency(value as number, currency);
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <Line data={chartData} options={options} />
    </div>
  );
}
