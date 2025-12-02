import { useState, useEffect } from 'react';
import { getTasksRequest, createTaskRequest, updateTaskStatusRequest } from '../api/tasks';
import type { Task, TaskFilters, NewTask } from '../api/tasks';

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // Filtros iniciales
  const [filters, setFilters] = useState<TaskFilters>({ title: '', owner: '', status: '' });
  // Formulario
  const [newTask, setNewTask] = useState<NewTask>({ title: '', owner: '', description: '' });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- 1. CARGAR TAREAS ---
  const loadTasks = async () => {
    try {
      // Pasamos los filtros (si están vacíos, URLSearchParams los ignora o los manda vacíos)
      const data = await getTasksRequest(filters);
      setTasks(data); // data ya es el array de tareas
    } catch (err) {
      console.error("Error cargando tareas:", err);
    } 
  };

  // Recargar cuando cambie algún filtro
  useEffect(() => {
    loadTasks();
  }, [filters]);

  // --- 2. CREAR TAREA ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createTaskRequest(newTask);
      // Limpiar formulario si tuvo éxito
      setNewTask({ title: '', owner: '', description: '' });
      // Recargar lista
      loadTasks();
    } catch (err) {
      // Aquí capturamos el mensaje de error del backend (ej: "Title must be unique")
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // --- 3. CAMBIAR ESTADO ---
  const handleToggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'completed' ? 'incompleted' : 'completed';
      await updateTaskStatusRequest(task.id, newStatus);
      loadTasks(); // Refrescar la vista
    } catch (err) {
      alert("No se pudo actualizar la tarea: " + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-emerald-400">Mini Task Tracker</h1>

        {/* SECCIÓN DE CREACIÓN */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-zinc-700 pb-2">Nueva Tarea</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Título (debe ser único)"
                className="p-2 rounded bg-zinc-700 border border-zinc-600 focus:border-emerald-500 outline-none text-white"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Dueño (Owner)"
                className="p-2 rounded bg-zinc-700 border border-zinc-600 focus:border-emerald-500 outline-none text-white"
                value={newTask.owner}
                onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                required
              />
            </div>
            <textarea
              placeholder="Descripción (Opcional - máx 150 caracteres)"
              maxLength={150}
              className="p-2 rounded bg-zinc-700 border border-zinc-600 focus:border-emerald-500 outline-none text-white h-20 resize-none"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Crear Tarea'}
            </button>
          </form>
        </div>

        {/* SECCIÓN DE FILTROS */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            placeholder="Buscar por título..."
            className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-700"
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <input
            placeholder="Filtrar por dueño..."
            className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-700"
            onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
          />
          <select
            className="p-2 rounded bg-zinc-800 border border-zinc-700 cursor-pointer"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Todos los estados</option>
            <option value="completed">Completadas</option>
            <option value="incompleted">Pendientes</option>
          </select>
        </div>

        {/* LISTADO DE TAREAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-4 rounded-lg border-l-4 shadow-md bg-zinc-800 flex flex-col justify-between ${
                task.status === 'completed' ? 'border-green-500' : 'border-yellow-500'
              }`}
            >
              <div>
                <h3 className={`font-bold text-lg ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'}`}>
                  {task.title}
                </h3>
                <span className="text-xs text-zinc-400 bg-zinc-900 px-2 py-1 rounded inline-block mt-1 mb-2">
                  Owner: {task.owner}
                </span>
                <p className="text-gray-300 text-sm mb-4">
                  {task.description || "Sin descripción"}
                </p>
              </div>
              
              <button
                onClick={() => handleToggleStatus(task)}
                className={`w-full py-1 px-3 rounded text-sm font-semibold transition-colors ${
                  task.status === 'completed' 
                    ? 'bg-zinc-700 text-gray-300 hover:bg-zinc-600' 
                    : 'bg-yellow-600 text-white hover:bg-yellow-700'
                }`}
              >
                {task.status === 'completed' ? 'Marcar como Pendiente' : 'Completar Tarea'}
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10">No hay tareas que coincidan con los filtros.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskPage;