import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Currency {
  code: string;
  name: string;
  country: string;
  symbol: string;
  rate: number;
  change: number;
  flag: string;
}

interface ChartData {
  time: string;
  value: number;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', country: 'США', symbol: '$', rate: 1.0, change: 0.12, flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', country: 'Еврозона', symbol: '€', rate: 0.85, change: -0.08, flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', country: 'Великобритания', symbol: '£', rate: 0.73, change: 0.15, flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Япония', symbol: '¥', rate: 110.25, change: -0.34, flag: '🇯🇵' },
  { code: 'RUB', name: 'Russian Ruble', country: 'Россия', symbol: '₽', rate: 75.80, change: 0.89, flag: '🇷🇺' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'Китай', symbol: '¥', rate: 6.45, change: 0.05, flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', country: 'Индия', symbol: '₹', rate: 74.30, change: -0.22, flag: '🇮🇳' },
  { code: 'BTC', name: 'Bitcoin', country: 'Криптовалюта', symbol: '₿', rate: 45000, change: 2.15, flag: '₿' }
];

const generateChartData = (): ChartData[] => {
  const data: ChartData[] = [];
  let value = 100;
  for (let i = 0; i < 30; i++) {
    value += (Math.random() - 0.5) * 5;
    data.push({
      time: `День ${i + 1}`,
      value: Math.max(85, Math.min(115, value))
    });
  }
  return data;
};

export default function Index() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [convertAmount, setConvertAmount] = useState('100');
  const [chartData] = useState(generateChartData());

  const handleCurrencySelect = (currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    setSelectedCurrency(currency || null);
    setShowChart(true);
  };

  const convertCurrency = (amount: number, fromRate: number, toRate: number) => {
    return ((amount / fromRate) * toRate).toFixed(2);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/img/aceada45-b2c6-450d-9355-a812d5aba0f5.jpg')`
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Icon name="TrendingUp" size={80} className="mx-auto mb-4 text-yellow-400" />
          </div>
          <h1 className="text-6xl font-display font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Currency Countries
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Отслеживайте курсы валют со всего мира в режиме реального времени. 
            Анализируйте тренды, конвертируйте валюты и принимайте взвешенные финансовые решения.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-8 py-3 text-lg shadow-2xl"
            onClick={() => document.getElementById('currencies')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Icon name="Eye" size={20} className="mr-2" />
            Смотреть курсы
          </Button>
        </div>
      </div>

      {/* Currency Grid */}
      <div id="currencies" className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Популярные валюты</h2>
            <p className="text-gray-600 text-lg">Выберите валюту для подробного анализа</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currencies.map((currency) => (
              <Card 
                key={currency.code} 
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-yellow-400"
                onClick={() => handleCurrencySelect(currency.code)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{currency.flag}</div>
                    <Badge 
                      variant={currency.change >= 0 ? "default" : "destructive"}
                      className={currency.change >= 0 ? "bg-green-500" : "bg-red-500"}
                    >
                      {currency.change >= 0 ? '+' : ''}{currency.change.toFixed(2)}%
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{currency.code}</h3>
                  <p className="text-gray-600 text-sm mb-2">{currency.country}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {currency.symbol}{currency.rate.toFixed(2)}
                    </span>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Currency Details & Chart */}
          {showChart && selectedCurrency && (
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Currency Info */}
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-5xl">{selectedCurrency.flag}</div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{selectedCurrency.code}</h3>
                      <p className="text-gray-600">{selectedCurrency.name}</p>
                      <p className="text-lg font-semibold">
                        {selectedCurrency.symbol}{selectedCurrency.rate.toFixed(2)}
                        <span className={`ml-2 ${selectedCurrency.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ({selectedCurrency.change >= 0 ? '+' : ''}{selectedCurrency.change.toFixed(2)}%)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Converter */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="ArrowLeftRight" size={20} />
                        <span>Конвертер валют</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Сумма</label>
                        <Input 
                          type="number"
                          value={convertAmount}
                          onChange={(e) => setConvertAmount(e.target.value)}
                          placeholder="100"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Из</label>
                          <Select defaultValue={selectedCurrency.code}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((curr) => (
                                <SelectItem key={curr.code} value={curr.code}>
                                  {curr.flag} {curr.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">В</label>
                          <Select defaultValue="USD">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((curr) => (
                                <SelectItem key={curr.code} value={curr.code}>
                                  {curr.flag} {curr.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">
                          {convertAmount} {selectedCurrency.code} = {' '}
                          {convertCurrency(parseFloat(convertAmount) || 0, selectedCurrency.rate, 1)} USD
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chart */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">График за 30 дней</h4>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
                    <div className="relative h-64">
                      <svg className="w-full h-full" viewBox="0 0 400 200">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.3}} />
                            <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 0}} />
                          </linearGradient>
                        </defs>
                        
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map(i => (
                          <line
                            key={i}
                            x1="0"
                            y1={i * 40}
                            x2="400"
                            y2={i * 40}
                            stroke="#E5E7EB"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Chart line */}
                        <polyline
                          fill="url(#chartGradient)"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          points={chartData.map((point, index) => 
                            `${(index / (chartData.length - 1)) * 400},${200 - ((point.value - 85) / 30) * 200}`
                          ).join(' ')}
                        />
                        
                        {/* Data points */}
                        {chartData.map((point, index) => (
                          <circle
                            key={index}
                            cx={(index / (chartData.length - 1)) * 400}
                            cy={200 - ((point.value - 85) / 30) * 200}
                            r="4"
                            fill="#3B82F6"
                            className="hover:r-6 transition-all cursor-pointer"
                          />
                        ))}
                      </svg>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>1 месяц назад</span>
                      <span>Сегодня</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="BarChart" size={20} />
                <span>Сравнение валют</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Валюта</th>
                      <th className="text-right py-3">Курс к USD</th>
                      <th className="text-right py-3">Изменение</th>
                      <th className="text-right py-3">Рыночная капитализация</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currencies.map((currency) => (
                      <tr key={currency.code} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{currency.flag}</span>
                            <div>
                              <p className="font-semibold">{currency.code}</p>
                              <p className="text-sm text-gray-600">{currency.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-4 font-mono">
                          {currency.symbol}{currency.rate.toFixed(4)}
                        </td>
                        <td className="text-right py-4">
                          <Badge 
                            variant={currency.change >= 0 ? "default" : "destructive"}
                            className={currency.change >= 0 ? "bg-green-500" : "bg-red-500"}
                          >
                            {currency.change >= 0 ? '+' : ''}{currency.change.toFixed(2)}%
                          </Badge>
                        </td>
                        <td className="text-right py-4 text-gray-600">
                          ${(currency.rate * 1000000).toLocaleString()}M
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}