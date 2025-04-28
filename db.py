# db.py
import sqlite3

def create_tables():
    conn = sqlite3.connect('college_obe.db')
    c = conn.cursor()

    # Users Table (Faculty/Admin/Principal/Coordinator)
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL,   -- 'admin', 'faculty', 'coordinator', 'principal'
            program_id INTEGER,
            status TEXT DEFAULT 'active'
        )
    ''')

    # Students Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roll_number TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            email TEXT,
            program_id INTEGER,
            current_semester INTEGER,
            academic_year TEXT,
            status TEXT DEFAULT 'active'
        )
    ''')

    # Programs Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS programs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            duration INTEGER,
            pattern TEXT,  -- Semester/Year
            status TEXT DEFAULT 'active'
        )
    ''')

    # Courses Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_code TEXT UNIQUE NOT NULL,
            course_name TEXT NOT NULL,
            program_id INTEGER,
            semester INTEGER,
            academic_year TEXT,
            status TEXT DEFAULT 'active'
        )
    ''')

    # Program Coordinators Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS program_coordinators (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            program_id INTEGER,
            academic_year TEXT,
            status TEXT DEFAULT 'active'
        )
    ''')

    conn.commit()
    conn.close()

# RUN ONCE
if __name__ == "__main__":
    create_tables()
