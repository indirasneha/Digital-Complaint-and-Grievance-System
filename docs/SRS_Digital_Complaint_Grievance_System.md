# Software Requirements Specification
Digital Complaint and Grievance System

## 1. Introduction

### 1.1 Purpose
This document provides a detailed description of the Digital Complaint and Grievance System. It outlines the functional and non-functional requirements of the system and serves as a reference for development and testing.

### 1.2 Scope
The Digital Complaint and Grievance System is a web-based platform that allows users to submit complaints digitally and track their status. Administrators can manage, review, and update complaints through an administrative dashboard.

### 1.3 Intended Audience
This document is intended for:
- Developers
- Project team members
- Instructors evaluating the system

### 1.4 System Overview
The system will provide an organized platform where complaints can be submitted, tracked, and managed efficiently through a centralized web interface.

---

## 2. Overall Description

### 2.1 Product Perspective
The system will be implemented as a web application using a client–server architecture.

Frontend: React  
Backend: Spring Boot  
Database: MySQL

### 2.2 User Classes

User
- Submits complaints
- Tracks complaint status

Administrator
- Reviews complaints
- Updates complaint status
- Manages complaint resolution

### 2.3 Operating Environment
The system will run on modern web browsers and will be accessible through internet-connected devices.

---

## 3. Functional Requirements

FR-1: The system shall allow users to register.

FR-2: The system shall allow users to log in securely.

FR-3: The system shall allow users to submit complaints.

FR-4: The system shall allow users to upload supporting files when submitting complaints.

FR-5: The system shall allow users to track the status of submitted complaints.

FR-6: The system shall allow users to view their complaint history.

FR-7: The system shall allow administrators to log in securely.

FR-8: The system shall allow administrators to view all complaints.

FR-9: The system shall allow administrators to filter complaints based on status.

FR-10: The system shall allow administrators to update complaint status.

FR-11: The system shall allow administrators to respond to complaints.

---

## 4. Non-Functional Requirements

NFR-1: The system shall respond to user actions within 3 seconds.

NFR-2: The system shall ensure secure authentication for all users.

NFR-3: The system shall support at least 100 concurrent users.

NFR-4: The system shall provide a user-friendly interface.

NFR-5: The system shall be scalable and maintainable.

---

## 5. External Interface Requirements

### 5.1 User Interface
The system will provide a web interface for both users and administrators.

### 5.2 Database Interface
The system will use a MySQL database to store user information, complaints, and status updates.

---

## 6. System Architecture

The system will follow a three-layer architecture:

Presentation Layer – React frontend  
Application Layer – Spring Boot backend  
Data Layer – MySQL database

---

## 7. Use Case Overview

User Registration  
User Login  
Complaint Submission  
Complaint Tracking  
Admin Complaint Management