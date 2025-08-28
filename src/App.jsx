import { useEffect, useState } from "react";
import {
  Plus,
  Check,
  Trash2,
  Circle,
  CheckCircle2,
  Eye,
  Globe,
} from "lucide-react";

// Traduções
const translations = {
  pt: {
    title: "Task Manager",
    subtitle: "Organize sua vida com elegância",
    pending: "Pendentes",
    completed: "Concluídas",
    addNewTask: "Adicionar nova tarefa",
    taskTitle: "Título da tarefa...",
    description: "Descrição (opcional)...",
    add: "Adicionar",
    cancel: "Cancelar",
    noTasksYet: "Nenhuma tarefa ainda",
    addFirstTask: "Adicione sua primeira tarefa para começar",
    viewDetails: "Ver detalhes",
    deleteTask: "Excluir tarefa",
    taskDetails: "Detalhes da Tarefa",
    descriptionLabel: "Descrição:",
    noDescription: "Nenhuma descrição adicionada",
    status: "Status",
    pendingStatus: "Pendente",
    completedStatus: "Concluída",
    markAsPending: "Marcar como Pendente",
    markAsCompleted: "Marcar como Concluída",
    deleteTaskButton: "Excluir Tarefa",
  },
  en: {
    title: "Task Manager",
    subtitle: "Organize your life with elegance",
    pending: "Pending",
    completed: "Completed",
    addNewTask: "Add new task",
    taskTitle: "Task title...",
    description: "Description (optional)...",
    add: "Add",
    cancel: "Cancel",
    noTasksYet: "No tasks yet",
    addFirstTask: "Add your first task to get started",
    viewDetails: "View details",
    deleteTask: "Delete task",
    taskDetails: "Task Details",
    descriptionLabel: "Description:",
    noDescription: "No description added",
    status: "Status",
    pendingStatus: "Pending",
    completedStatus: "Completed",
    markAsPending: "Mark as Pending",
    markAsCompleted: "Mark as Completed",
    deleteTaskButton: "Delete Task",
  },
  es: {
    title: "Gestor de Tareas",
    subtitle: "Organiza tu vida con elegância",
    pending: "Pendientes",
    completed: "Completadas",
    addNewTask: "Agregar nueva tarea",
    taskTitle: "Título de la tarea...",
    description: "Descripción (opcional)...",
    add: "Agregar",
    cancel: "Cancelar",
    noTasksYet: "Aún no hay tareas",
    addFirstTask: "Agrega tu primera tarea para comenzar",
    viewDetails: "Ver detalles",
    deleteTask: "Eliminar tarea",
    taskDetails: "Detalles de la Tarea",
    descriptionLabel: "Descripción:",
    noDescription: "No se agregó descripción",
    status: "Estado",
    pendingStatus: "Pendiente",
    completedStatus: "Completada",
    markAsPending: "Marcar como Pendiente",
    markAsCompleted: "Marcar como Completada",
    deleteTaskButton: "Eliminar Tarea",
  },
  fr: {
    title: "Gestionnaire de Tâches",
    subtitle: "Organisez votre vie avec élégance",
    pending: "En attente",
    completed: "Terminées",
    addNewTask: "Ajouter une nouvelle tâche",
    taskTitle: "Titre de la tâche...",
    description: "Description (optionnelle)...",
    add: "Ajouter",
    cancel: "Annuler",
    noTasksYet: "Aucune tâche pour le moment",
    addFirstTask: "Ajoutez votre première tâche pour commencer",
    viewDetails: "Voir les détails",
    deleteTask: "Supprimer la tâche",
    taskDetails: "Détails de la Tâche",
    descriptionLabel: "Description :",
    noDescription: "Aucune description ajoutée",
    status: "Statut",
    pendingStatus: "En attente",
    completedStatus: "Terminée",
    markAsPending: "Marquer comme En attente",
    markAsCompleted: "Marquer comme Terminée",
    deleteTaskButton: "Supprimer la Tâche",
  },
};

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [currentLang, setCurrentLang] = useState("pt");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedLang = localStorage.getItem("language") || "pt";
    setTasks(savedTasks);
    setCurrentLang(savedLang);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  useEffect(() => {
    localStorage.setItem("language", currentLang);
  }, [currentLang]);

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({
        ...selectedTask,
        isCompleted: !selectedTask.isCompleted,
      });
    }
  }

  function onTaskDelete(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  }

  function onTaskAdd() {
    if (!newTask.title.trim()) return;
    const task = {
      id: generateId(),
      title: newTask.title,
      description: newTask.description,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: "", description: "" });
    setIsAddingTask(false);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onTaskAdd();
    }
  }

  function openTaskDetails(task) {
    // Sempre busca a versão mais recente da tarefa pelo id
    const freshTask = tasks.find((t) => t.id === task.id) || task;
    setSelectedTask(freshTask);
  }

  function closeTaskDetails() {
    setSelectedTask(null);
  }

  function changeLanguage(langCode) {
    setCurrentLang(langCode);
    setShowLanguageDropdown(false);
  }

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const pendingTasks = tasks.filter((task) => !task.isCompleted);
  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  // No modal, busque sempre a versão mais recente da tarefa pelo id
  const selectedTaskData = selectedTask
    ? tasks.find((t) => t.id === selectedTask.id)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/15 transition-all duration-300"
            >
              <Globe size={18} />
              <span className="text-lg">{currentLanguage?.flag}</span>
              <span className="text-sm font-medium">
                {currentLanguage?.name}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  showLanguageDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showLanguageDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-xl z-50 min-w-[180px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 ${
                      lang.code === currentLang
                        ? "bg-white/15 text-blue-300"
                        : "text-white"
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                    {lang.code === currentLang && (
                      <Check size={16} className="ml-auto text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 leading-relaxed pb-2">
            {t.title}
          </h1>
          <p className="text-slate-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {pendingTasks.length}
            </div>
            <div className="text-slate-400 text-sm">{t.pending}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {completedTasks.length}
            </div>
            <div className="text-slate-400 text-sm">{t.completed}</div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-8 shadow-2xl">
          {!isAddingTask ? (
            <button
              onClick={() => setIsAddingTask(true)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Plus size={20} />
              {t.addNewTask}
            </button>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t.taskTitle}
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                onKeyPress={handleKeyPress}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                autoFocus
              />
              <textarea
                placeholder={t.description}
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none h-20"
              />
              <div className="flex gap-3">
                <button
                  onClick={onTaskAdd}
                  disabled={!newTask.title.trim()}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  {t.add}
                </button>
                <button
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTask({ title: "", description: "" });
                  }}
                  className="px-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-all duration-300"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✨</div>
              <p className="text-slate-400 text-lg">{t.noTasksYet}</p>
              <p className="text-slate-500">{t.addFirstTask}</p>
            </div>
          ) : (
            <>
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => onTaskClick(task.id)}
                      className="mt-1 text-slate-400 hover:text-green-400 transition-colors duration-300"
                    >
                      <Circle size={20} />
                    </button>
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => openTaskDetails(task)}
                    >
                      <h3 className="text-white font-medium text-lg mb-1 hover:text-blue-300 transition-colors duration-300">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openTaskDetails(task);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-400 transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                        title={t.viewDetails}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskDelete(task.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                        title={t.deleteTask}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {completedTasks.length > 0 && (
                <>
                  <div className="flex items-center gap-3 mt-8 mb-4">
                    <div className="h-px bg-white/20 flex-1"></div>
                    <span className="text-slate-400 text-sm font-medium">
                      {t.completed}
                    </span>
                    <div className="h-px bg-white/20 flex-1"></div>
                  </div>

                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 opacity-75 hover:opacity-100 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => onTaskClick(task.id)}
                          className="mt-1 text-green-400 hover:text-slate-400 transition-colors duration-300"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => openTaskDetails(task)}
                        >
                          <h3 className="text-slate-300 font-medium text-lg mb-1 line-through hover:text-slate-200 transition-colors duration-300">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-slate-500 text-sm leading-relaxed line-through line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openTaskDetails(task);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-400 transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                            title={t.viewDetails}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onTaskDelete(task.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                            title={t.deleteTask}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* Task Details Modal */}
        {selectedTaskData && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeTaskDetails}
          >
            <div
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-auto border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t.taskDetails}
                </h2>
                <button
                  onClick={closeTaskDetails}
                  className="text-slate-400 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="flex items-start gap-4 mb-4">
                  <button
                    onClick={() => onTaskClick(selectedTaskData.id)}
                    className={`mt-1 transition-colors duration-300 ${
                      selectedTaskData.isCompleted
                        ? "text-green-400 hover:text-slate-400"
                        : "text-slate-400 hover:text-green-400"
                    }`}
                  >
                    {selectedTaskData.isCompleted ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3
                      className={`text-2xl font-bold mb-3 ${
                        selectedTaskData.isCompleted
                          ? "text-slate-300 line-through"
                          : "text-white"
                      }`}
                    >
                      {selectedTaskData.title}
                    </h3>

                    {selectedTaskData.description ? (
                      <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                        <h4 className="text-slate-300 font-medium mb-2">
                          {t.descriptionLabel}
                        </h4>
                        <p
                          className={`text-slate-200 leading-relaxed whitespace-pre-wrap ${
                            selectedTaskData.isCompleted
                              ? "line-through opacity-75"
                              : ""
                          }`}
                        >
                          {selectedTaskData.description}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                        <p className="text-slate-400 italic">
                          {t.noDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-sm text-slate-400">
                    {t.status}:{" "}
                    <span
                      className={`font-medium ${
                        selectedTaskData.isCompleted
                          ? "text-green-400"
                          : "text-blue-400"
                      }`}
                    >
                      {selectedTaskData.isCompleted
                        ? t.completedStatus
                        : t.pendingStatus}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => onTaskClick(selectedTaskData.id)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        selectedTaskData.isCompleted
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      {selectedTaskData.isCompleted
                        ? t.markAsPending
                        : t.markAsCompleted}
                    </button>

                    <button
                      onClick={() => {
                        onTaskDelete(selectedTaskData.id);
                        closeTaskDetails();
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300"
                    >
                      {t.deleteTaskButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Click outside to close language dropdown */}
        {showLanguageDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowLanguageDropdown(false)}
          />
        )}
        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-xs opacity-80 select-none flex flex-col items-center gap-1">
          <span>
            © {new Date().getFullYear()} Task Manager — Gustavo Lazzuri
          </span>
          <span className="flex items-center gap-2 justify-center">
            <span className="inline-flex items-center gap-1">
              <span className="text-blue-400">React</span>
              <span>+</span>
              <span className="text-cyan-400">Tailwind</span>
            </span>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
