# AtomQuest Goal Portal

> **AtomQuest Hackathon 1.0 Submission**
> A full-stack, role-based Goal Setting & Tracking Portal built for Atomberg's internal workforce management needs.

---
# Live Project Links

### Frontend Deployment

https://atom-quest-rho.vercel.app

---

### Backend Deployment

https://atomquest-backend-qfhk.onrender.com

---

### GitHub Repository

  
https://github.com/Alice-2004/AtomQuest

---


## Project Overview

Organizations that rely on spreadsheets and emails for goal tracking face alignment gaps, blind spots for managers, and painful HR data-compilation at appraisal time. This portal eliminates those pain points by digitalising the **full goal lifecycle**:

```
Goal Locked → Quarterly Check-ins → Progress Tracking
```

provides quarterly performance tracking and role-based workflow management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios (with JWT interceptor) |
| Backend | Python 3.11 + FastAPI |
| ORM | SQLAlchemy 2.0 |
| Database | SQLite |
| Auth | JWT Authentication |
| Hosting — Frontend | Vercel |
| Hosting — Backend | Render |

---


## Project Structure

```text
atomquest/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── atomquest.db
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── routes/
    │   └── App.jsx
    │
    └── package.json
```

---


## Features

### Authentication System

- JWT-based authentication
- Role-based login system
- Employee / Manager / Admin dashboards

---

### Employee Features

- Create goals
- Update goals
- Delete goals
- Submit goals
- Add quarterly check-ins
- Track progress percentage
- View progress history

---

### Manager Features

- View employee goals
- Approve goals
- Reject goals
- Add manager comments
- Monitor employee progress

---

### Admin Features

- View analytics dashboard
- Monitor goals
- Track approvals/rejections
- View quarterly check-ins

---

### Quarterly Check-in System

Employees can:

- select quarter
- update actual achievement
- add comments
- update progress status

Progress tracking includes:

- Goal Title
- Target
- Achievement
- Progress %
- Status
- Comments

---



## User Roles

| Role | Responsibilities |
|---|---|
| Employee | Create goals, submit check-ins, track progress |
| Manager | Approve/reject goals, review employee performance |
| Admin | Monitor analytics and organizational performance |

---


## Business Rules & Validations

| Rule | Description |
|---|---|
| Maximum Goals | Maximum 8 goals allowed |
| Minimum Weightage | Each goal must have minimum 10% weightage |
| Total Weightage | Total must equal exactly 100% |
| Goal Locking | Approved goals become read-only |
| Quarterly Check-ins | Allowed only for approved goals |
---

## UoM Score Computation

Scores are computed on write and stored. Multiply by 100 for percentage display.

| UoM Type | Use Case | Formula |
|---|---|---|
| **Min** | Higher is better — e.g. Sales Revenue | `actual ÷ target` |
| **Max** | Lower is better — e.g. TAT, Cost | `target ÷ actual` |
| **Timeline** | Date-based completion | `1.0` if completed on/before deadline, else `0.0` |
| **Zero** | Zero incidents = success — e.g. Safety | `1.0` if actual = 0, else `0.0` |

> Min-type scores can exceed 1.0 (overachievement). All other types are capped at 1.0.

---

## Check-in Schedule

| Period | Window Opens | Purpose |
|---|---|---|
| Goal Setting | 1st May | Goal creation, submission, and manager approval |
| Q1 Check-in | July | Progress update — Planned vs Actual |
| Q2 Check-in | October | Progress update — Planned vs Actual |
| Q3 Check-in | January | Progress update — Planned vs Actual |
| Q4 / Annual | March / April | Final achievement capture |

---

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- SQLite database (included locally)


---
### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd atomquest/frontend

# 2. Install dependencies (after Vite project is scaffolded)
npm install

# 3. Set the API base URL
echo "VITE_API_URL=http://localhost:8000" > .env.local

# 4. Start the dev server
npm run dev
```

Frontend will be running at `http://localhost:5173`.

---


## Database Setup

The project uses SQLite database.

Tables are automatically created using:

```python
Base.metadata.create_all(bind=engine)
```

Database Tables:

| Table | Purpose |
|---|---|
| users | User authentication and roles |
| goals | Employee goals |
| checkins | Quarterly progress tracking |
---


## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin / HR | `admin@demo.com` | `admin123` |
| Manager (L1) | `manager@demo.com` | `654321` |
| Employee | `employee@demo.com` | `123456` |

> The login page includes one-click demo buttons — just click a role to auto-fill credentials.

The demo employee is pre-assigned to the demo manager, so the complete approval workflow (Employee submits → Manager approves → Goal locks) works out of the box.

---
## API Reference

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register user |
| POST | /login | User login |

---

### Goal APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /goals | Create goals |
| GET | /goals | Fetch goals |
| PUT | /goals/{id} | Update or approve goals |
| DELETE | /goals/{id} | Delete goals |

---

### Check-in APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /checkins | Submit quarterly check-ins |
| GET | /checkins | Fetch progress history |
---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                         USERS                                │
│                                                              │
│   Employee        Manager                 Admin              │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Access System
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                           │
│                                                              │
│              React.js + Tailwind CSS                         │
│                                                              │
│  Deployed on: Vercel                                         │
│                                                              │
│  Main Modules:                                               │
│                                                              │
│  • Authentication UI                                         │
│  • Employee Dashboard                                        │
│  • Manager Dashboard                                         │
│  • Admin Dashboard                                           │
│  • Goal Management UI                                        │
│  • Quarterly Check-in UI                                     │
│  • Analytics Dashboard                                       │
│  • Sidebar Navigation                                        │
│                                                              │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ REST API Calls (Axios)
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                            │
│                                                              │
│                    FastAPI (Python)                          │
│                                                              │
│              Deployed on: Render                             │
│                                                              │
│  Backend Responsibilities:                                   │
│                                                              │
│  • User Authentication                                       │
│  • JWT Token Handling                                        │
│  • Role-based Access Control                                 │
│  • Goal CRUD Operations                                      │
│  • Goal Approval/Rejection Workflow                          │
│  • Quarterly Check-in APIs                                   │
│  • Progress Tracking Logic                                   │
│  • Analytics APIs                                            │
│  • Validation Rules                                          │
│                                                              │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ SQLAlchemy ORM
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                           │
│                                                              │
│                         SQLite                               │
│                                                              │
│  Database Tables:                                            │
│                                                              │
│  • users                                                     │
│  • goals                                                     │
│  • checkins                                                  │
│                                                              │
│  Stored Information:                                         │
│                                                              │
│  • Employee Details                                          │
│  • Login Credentials                                         │
│  • Goal Information                                          │
│  • Approval Status                                           │
│  • Quarterly Progress                                        │
│  • Manager Comments                                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘



==============================================================
                    SYSTEM WORKFLOW
==============================================================

1. EMPLOYEE WORKFLOW

Employee Login
       ↓
Create Goals
       ↓
Submit Goals
       ↓
Manager Reviews Goals
       ↓
Approved / Rejected
       ↓
Employee Adds Quarterly Check-ins
       ↓
System Calculates Progress %
       ↓
Admin Monitors Overall Analytics


==============================================================
                QUARTERLY CHECK-IN FLOW
==============================================================

Employee Opens Check-in Dashboard
       ↓
Select Goal
       ↓
Enter Quarterly Achievement
       ↓
Add Status + Comment
       ↓
Backend Stores Check-in
       ↓
Progress Percentage Calculated
       ↓
Manager Reviews Progress


==============================================================
                PROGRESS CALCULATION LOGIC
==============================================================

1. MIN TYPE GOALS
(Higher value is better)

Example:
Sales Revenue

Formula:
Progress % = (Achievement / Target) × 100


2. MAX TYPE GOALS
(Lower value is better)

Example:
Response Time

Formula:
Progress % = (Target / Achievement) × 100


3. TIMELINE TYPE GOALS

Example:
Project Deadline Tracking

Logic:
• Before Deadline → On Track
• Delayed → Delayed
• Completed → Success


4. ZERO TYPE GOALS

Example:
Safety Incidents

Logic:
• Zero incidents → Success
• Any incident → Failure


==============================================================
                    ROLE RESPONSIBILITIES
==============================================================

EMPLOYEE
• Create Goals
• Edit Goals
• Delete Goals
• Submit Quarterly Check-ins
• Track Progress


MANAGER
• Review Employee Goals
• Approve / Reject Goals
• Add Manager Comments
• Monitor Quarterly Progress


ADMIN
• View System Analytics
• Monitor All Goals
• Track Goal Status
• View Progress Statistics
• System Oversight
```

**Cost Optimisation Notes:**
- Frontend on Vercel — free tier, zero cold-start, global CDN.
- Backend on Render free tier — spins down after inactivity; use Render's paid starter ($7/mo) for the demo to avoid cold starts.
- Computed scores are stored on write, not recalculated on every read.


---
## Deployment Guide

### Backend Deployment (Render)

1. Push backend code to GitHub
2. Create Web Service on Render
3. Build Command:

```bash
pip install -r requirements.txt
```

4. Start Command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

---

### Frontend Deployment (Vercel)

1. Push frontend code to GitHub
2. Import project into Vercel
3. Set root directory as `frontend`
4. Deploy project

## Hackathon Evaluation Alignment

| Criterion | How This Project Addresses It |
|---|---|
| Functionality | Full end-to-end flow: create → approve → lock → check-in → report |
| BRD Adherence | All validation rules enforced on client and server; all 4 UoM types implemented |
| User Friendliness | Role-based dashboards; live weightage meter; one-click demo login; inline error messages |
| No Bugs | Server-side validation guards every mutation; shared goal sync is atomic; upsert prevents duplicate achievement records |
| Cost Optimisation | Free-tier hosting stack; response caching; scores stored on write; indexed FK columns |

---

*Built for AtomQuest Hackathon 1.0 — Atomberg Technologies*
