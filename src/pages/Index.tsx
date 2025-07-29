import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CountryBall {
  id: number;
  name: string;
  country: string;
  image: string;
  likes: number;
  views: number;
  author: string;
  tags: string[];
}

const mockCountryBalls: CountryBall[] = [
  {
    id: 1,
    name: "Classic USA Ball",
    country: "США",
    image: "/img/6bfba579-c9d7-4d7b-8d0e-0bcbbb766813.jpg",
    likes: 1247,
    views: 5420,
    author: "FlagMaster",
    tags: ["классика", "США", "популярное"]
  },
  {
    id: 2,
    name: "Funny Russia Ball",
    country: "Россия", 
    image: "/img/d5411d14-a781-41ea-aef6-1bf715080f0b.jpg",
    likes: 892,
    views: 3210,
    author: "CountryArt",
    tags: ["юмор", "Россия", "мем"]
  },
  {
    id: 3,
    name: "Germany Work Ball",
    country: "Германия",
    image: "/img/6bfba579-c9d7-4d7b-8d0e-0bcbbb766813.jpg", 
    likes: 673,
    views: 2180,
    author: "EuropeFan",
    tags: ["работа", "Германия", "стереотип"]
  }
];

export default function Index() {
  const [selectedTool, setSelectedTool] = useState('brush');
  const [selectedColor, setSelectedColor] = useState('#FF4444');
  const [ballName, setBallName] = useState('');
  const [ballDescription, setBallDescription] = useState('');

  const tools = [
    { id: 'brush', name: 'Кисть', icon: 'Brush' },
    { id: 'eraser', name: 'Ластик', icon: 'Eraser' },
    { id: 'fill', name: 'Заливка', icon: 'PaintBucket' },
    { id: 'text', name: 'Текст', icon: 'Type' }
  ];

  const colors = ['#FF4444', '#4444FF', '#FFDD44', '#44FF44', '#FFFFFF', '#333333'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Globe" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900">Create Countryballs</h1>
                <p className="text-gray-600">Создавай и делись своими шариками</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Icon name="User" size={16} />
                <span>Войти</span>
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Icon name="Image" size={16} />
              <span>Галерея</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center space-x-2">
              <Icon name="Palette" size={16} />
              <span>Редактор</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} />
              <span>Обучение</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Сообщество</span>
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">Популярные работы</h2>
              <div className="flex items-center space-x-4">
                <Input placeholder="Поиск по тегам..." className="w-64" />
                <Button variant="outline">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCountryBalls.map((ball) => (
                <Card key={ball.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={ball.image} 
                      alt={ball.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90">
                        {ball.country}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{ball.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {ball.author}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ball.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={14} className="text-primary" />
                          <span className="text-sm font-medium">{ball.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={14} className="text-gray-500" />
                          <span className="text-sm text-gray-600">{ball.views}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Скачать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tools Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Wrench" size={20} />
                    <span>Инструменты</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {tools.map((tool) => (
                      <Button
                        key={tool.id}
                        variant={selectedTool === tool.id ? "default" : "outline"}
                        className="flex flex-col items-center p-4 h-auto"
                        onClick={() => setSelectedTool(tool.id)}
                      >
                        <Icon name={tool.icon as any} size={20} className="mb-1" />
                        <span className="text-xs">{tool.name}</span>
                      </Button>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Цвета</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-12 h-12 rounded-lg border-2 transition-transform hover:scale-110 ${
                            selectedColor === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Canvas */}
              <Card>
                <CardHeader>
                  <CardTitle>Холст</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                    <div className="text-gray-500">
                      <Icon name="Circle" size={64} className="mx-auto mb-4 opacity-50" />
                      <p>Начни создавать свой countryball!</p>
                      <p className="text-sm mt-2">Выбери инструмент и цвет</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Properties Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Settings" size={20} />
                    <span>Свойства</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название</label>
                    <Input 
                      placeholder="Мой крутой countryball"
                      value={ballName}
                      onChange={(e) => setBallName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Описание</label>
                    <Textarea 
                      placeholder="Расскажи о своем творении..."
                      value={ballDescription}
                      onChange={(e) => setBallDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Icon name="Share" size={16} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-4">Изучай искусство Countryballs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                От базовых форм до сложных композиций - изучи все секреты создания популярных countryballs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Основы рисования", level: "Новичок", duration: "15 мин", icon: "PenTool" },
                { title: "Работа с флагами", level: "Средний", duration: "25 мин", icon: "Flag" },
                { title: "Эмоции и выражения", level: "Средний", duration: "20 мин", icon: "Smile" },
                { title: "Композиция и сцены", level: "Продвинутый", duration: "35 мин", icon: "Layout" },
                { title: "Цветовые схемы", level: "Новичок", duration: "18 мин", icon: "Palette" },
                { title: "Анимация шариков", level: "Продвинутый", duration: "45 мин", icon: "Zap" }
              ].map((lesson, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/20 p-3 rounded-lg">
                        <Icon name={lesson.icon as any} size={24} className="text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{lesson.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant="secondary">{lesson.level}</Badge>
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-4">Сообщество создателей</h2>
              <p className="text-gray-600">Делись работами, получай обратную связь и вдохновляйся</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Топ создатели */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Trophy" size={20} className="text-accent" />
                    <span>Топ создатели месяца</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "FlagMaster", works: 23, likes: 5420, rank: 1 },
                      { name: "CountryArt", works: 18, likes: 4210, rank: 2 },
                      { name: "BallCreator", works: 15, likes: 3890, rank: 3 }
                    ].map((creator) => (
                      <div key={creator.name} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          creator.rank === 1 ? 'bg-yellow-500' : creator.rank === 2 ? 'bg-gray-400' : 'bg-yellow-600'
                        }`}>
                          {creator.rank}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{creator.name}</p>
                          <p className="text-sm text-gray-600">{creator.works} работ • {creator.likes} лайков</p>
                        </div>
                        <Button size="sm" variant="outline">Подписаться</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Последние обсуждения */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="MessageCircle" size={20} />
                    <span>Последние обсуждения</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Как правильно рисовать глаза?", author: "NewArtist", replies: 12, time: "2ч назад" },
                      { title: "Конкурс: Зимние countryballs", author: "ModTeam", replies: 45, time: "5ч назад" },
                      { title: "Поделитесь своими наработками", author: "ProCreator", replies: 8, time: "1д назад" }
                    ].map((topic, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-medium hover:text-primary cursor-pointer">{topic.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>by {topic.author}</span>
                          <span>{topic.replies} ответов</span>
                          <span>{topic.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}