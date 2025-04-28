# main.py
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import sqlite3

# Initialize FastAPI app
app = FastAPI()

# Mount static folder (CSS, JS, Images)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load HTML templates
templates = Jinja2Templates(directory="templates")

# Database connection helper
def get_db_connection():
    conn = sqlite3.connect('college_obe.db')
    conn.row_factory = sqlite3.Row
    return conn

# ------------------------------------
# Default Landing Page - Login
@app.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# Admin Dashboard
@app.get("/admin", response_class=HTMLResponse)
async def admin_dashboard(request: Request):
    return templates.TemplateResponse("admin/dashboard.html", {"request": request})

# Faculty Dashboard
@app.get("/faculty", response_class=HTMLResponse)
async def faculty_dashboard(request: Request):
    return templates.TemplateResponse("faculty/dashboard.html", {"request": request})

# Program Coordinator Dashboard
@app.get("/coordinator", response_class=HTMLResponse)
async def coordinator_dashboard(request: Request):
    return templates.TemplateResponse("coordinator/dashboard.html", {"request": request})

# Principal Dashboard
@app.get("/principal", response_class=HTMLResponse)
async def principal_dashboard(request: Request):
    return templates.TemplateResponse("principal/dashboard.html", {"request": request})

# ------------------------------------
# Example: Admin Adding a New User
@app.post("/admin/add_user")
async def add_user(name: str = Form(...), email: str = Form(...), password: str = Form(...), role: str = Form(...)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', (name, email, password, role))
    conn.commit()
    conn.close()
    return RedirectResponse(url="/admin", status_code=303)

# ------------------------------------
# You can similarly create /admin/add_student, /admin/add_program, /admin/add_course routes
