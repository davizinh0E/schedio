import React, { useState } from 'react';
import { Calendar, Plus, Bell, CheckCircle, Circle, Home, BarChart3, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const SchedioPrototypes = () => {
    const [currentScreen, setCurrentScreen] = useState('home');

    const categories = [
        { name: 'Saúde', color: 'bg-green-500' },
        { name: 'Estudos', color: 'bg-blue-500' },
        { name: 'Trabalho', color: 'bg-purple-500' },
        { name: 'Pessoal', color: 'bg-orange-500' }
    ];

    const todayTasks = [
        { time: '08:00', title: 'Meditação matinal', category: 'Saúde', done: true },
        { time: '09:30', title: 'Reunião de equipe', category: 'Trabalho', done: true },
        { time: '14:00', title: 'Estudar React', category: 'Estudos', done: false },
        { time: '18:00', title: 'Academia', category: 'Saúde', done: false },
        { time: '20:00', title: 'Ler 30 minutos', category: 'Pessoal', done: false }
    ];

    const getCategoryColor = (category) => {
        const cat = categories.find(c => c.name === category);
        return cat ? cat.color : 'bg-gray-500';
    };

    // Tela Principal - Visualização Diária
    const HomeScreen = () => (
        <div className="flex flex-col h-full">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-b-3xl shadow-lg">
                <h1 className="text-2xl font-bold mb-1">Schedio</h1>
                <p className="text-indigo-100 text-sm">Terça-feira, 30 de Setembro</p>

                <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progresso do dia</span>
                        <span className="text-sm font-bold">40%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                        <div className="bg-white rounded-full h-2" style={{width: '40%'}}></div>
                    </div>
                    <p className="text-xs text-indigo-100 mt-2">2 de 5 tarefas concluídas</p>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Tarefas de Hoje</h2>
                    <button className="bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                        <Plus size={20} />
                    </button>
                </div>

                <div className="space-y-3">
                    {todayTasks.map((task, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {task.done ?
                                        <CheckCircle className="text-green-500" size={24} /> :
                                        <Circle className="text-gray-300" size={24} />
                                    }
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-2 h-2 rounded-full ${getCategoryColor(task.category)}`}></span>
                                        <span className="text-xs text-gray-500 font-medium">{task.category}</span>
                                    </div>
                                    <h3 className={`font-semibold ${task.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <Bell size={14} /> {task.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Tela do Calendário
    const CalendarScreen = () => {
        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const dates = [
            [null, null, null, null, 1, 2, 3],
            [4, 5, 6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30, null]
        ];

        return (
            <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6">
                    <h1 className="text-2xl font-bold mb-1">Calendário</h1>
                    <div className="flex items-center justify-between mt-4">
                        <button><ChevronLeft size={24} /></button>
                        <span className="text-lg font-semibold">Setembro 2025</span>
                        <button><ChevronRight size={24} /></button>
                    </div>
                </div>

                <div className="flex-1 p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-4">
                        <div className="grid grid-cols-7 gap-2 mb-2">
                            {days.map(day => (
                                <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {dates.map((week, weekIdx) => (
                            <div key={weekIdx} className="grid grid-cols-7 gap-2">
                                {week.map((date, dateIdx) => (
                                    <div key={dateIdx} className="aspect-square">
                                        {date ? (
                                            <button className={`w-full h-full rounded-lg flex flex-col items-center justify-center text-sm font-semibold ${
                                                date === 30 ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                                            }`}>
                                                {date}
                                                {[8, 15, 22, 30].includes(date) && (
                                                    <div className="flex gap-0.5 mt-1">
                                                        <div className={`w-1 h-1 rounded-full ${getCategoryColor('Saúde')}`}></div>
                                                        <div className={`w-1 h-1 rounded-full ${getCategoryColor('Estudos')}`}></div>
                                                    </div>
                                                )}
                                            </button>
                                        ) : <div></div>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h3 className="font-bold text-gray-800 mb-3">Categorias</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-3 shadow-md border border-gray-100 flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full ${cat.color}`}></div>
                                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Tela de Adicionar Tarefa
    const AddTaskScreen = () => (
        <div className="flex flex-col h-full">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6">
                <div className="flex items-center gap-3">
                    <button onClick={() => setCurrentScreen('home')}>
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Nova Tarefa</h1>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Título</label>
                        <input
                            type="text"
                            placeholder="Ex: Estudar para prova"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Categoria</label>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat, idx) => (
                                <button key={idx} className={`${cat.color} text-white rounded-xl p-3 font-medium shadow-md hover:opacity-90`}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Horário</label>
                            <input
                                type="time"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição (opcional)</label>
                        <textarea
                            placeholder="Adicione detalhes..."
                            rows="3"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none"
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Bell className="text-indigo-600" size={20} />
                            <span className="text-sm font-medium text-gray-700">Lembrete</span>
                        </div>
                        <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                            <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition peer-checked:bg-indigo-600"></span>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></span>
                        </label>
                    </div>

                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition">
                        Criar Tarefa
                    </button>
                </div>
            </div>
        </div>
    );

    // Tela de Estatísticas
    const StatsScreen = () => (
        <div className="flex flex-col h-full">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6">
                <h1 className="text-2xl font-bold mb-1">Estatísticas</h1>
                <p className="text-indigo-100 text-sm">Seu progresso semanal</p>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                        <p className="text-gray-500 text-sm mb-1">Sequência Atual</p>
                        <p className="text-3xl font-bold text-indigo-600">7 dias</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                        <p className="text-gray-500 text-sm mb-1">Taxa de Conclusão</p>
                        <p className="text-3xl font-bold text-green-500">85%</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Tarefas por Categoria</h3>
                    <div className="space-y-3">
                        {categories.map((cat, idx) => (
                            <div key={idx}>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                                        <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-800">{[12, 18, 8, 15][idx]}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`${cat.color} rounded-full h-2`} style={{width: `${[60, 90, 40, 75][idx]}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Atividade Semanal</h3>
                    <div className="flex items-end justify-between h-32 gap-2">
                        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg" style={{height: `${[60, 80, 95, 70, 85, 50, 40][idx]}%`}}></div>
                                <span className="text-xs text-gray-600 font-medium">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Bottom Navigation
    const BottomNav = () => (
        <div className="bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
            <div className="flex items-center justify-around">
                <button
                    onClick={() => setCurrentScreen('home')}
                    className={`flex flex-col items-center gap-1 ${currentScreen === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                    <Home size={24} />
                    <span className="text-xs font-medium">Início</span>
                </button>
                <button
                    onClick={() => setCurrentScreen('calendar')}
                    className={`flex flex-col items-center gap-1 ${currentScreen === 'calendar' ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                    <Calendar size={24} />
                    <span className="text-xs font-medium">Calendário</span>
                </button>
                <button
                    onClick={() => setCurrentScreen('add')}
                    className="flex flex-col items-center gap-1 text-white"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full -mt-6 shadow-lg">
                        <Plus size={24} />
                    </div>
                </button>
                <button
                    onClick={() => setCurrentScreen('stats')}
                    className={`flex flex-col items-center gap-1 ${currentScreen === 'stats' ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                    <BarChart3 size={24} />
                    <span className="text-xs font-medium">Stats</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400">
                    <Settings size={24} />
                    <span className="text-xs font-medium">Config</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-md mx-auto h-screen bg-gray-50 flex flex-col shadow-2xl">
            <div className="flex-1 overflow-hidden">
                {currentScreen === 'home' && <HomeScreen />}
                {currentScreen === 'calendar' && <CalendarScreen />}
                {currentScreen === 'add' && <AddTaskScreen />}
                {currentScreen === 'stats' && <StatsScreen />}
            </div>
            <BottomNav />
        </div>
    );
};

export default SchedioPrototypes;