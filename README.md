# TaskBoard - Kanban Full Stack

Aplicacao full stack de gerenciamento de tarefas estilo Kanban, com **Spring Boot** no backend e **React + TypeScript** no frontend.

---

## Tecnologias

### Backend
- Java 25
- Spring Boot 4.0.3
- Spring Data JPA
- Hibernate 7
- H2 Database (banco em memoria)
- Bean Validation
- Swagger / OpenAPI 3
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Axios
- React Router v6
- React Icons (Feather)
- React Hot Toast
- CSS puro

---

## Como Executar

### Pre-requisitos
- Java 25 (OpenJDK)
- Maven 3.9+
- Node.js 24+ (via nvm)
- npm 11+

### Backend (porta 8080)

```bash
cd backend
mvn spring-boot:run
```

### Frontend (porta 5173)

```bash
cd frontend
npm install
npm run dev
```

### Acessos

| Recurso | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API REST | http://localhost:8080/api/tasks |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| Console H2 | http://localhost:8080/h2-console |

---

## Endpoints da API

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | /api/tasks | Listar todas as tarefas |
| GET | /api/tasks?status= | Filtrar por status |
| GET | /api/tasks/{id} | Buscar tarefa por ID |
| POST | /api/tasks | Criar nova tarefa |
| PUT | /api/tasks/{id} | Atualizar tarefa existente |
| DELETE | /api/tasks/{id} | Deletar tarefa |

### Status
- `PENDING`
- `IN_PROGRESS`
- `COMPLETED`

### Prioridades
- `LOW`
- `MEDIUM`
- `HIGH`

### Exemplo de Request Body

```json
{
  "title": "Minha tarefa",
  "description": "Descricao da tarefa",
  "status": "PENDING",
  "priority": "HIGH"
}
```
