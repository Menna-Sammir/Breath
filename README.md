# 🌬️ Breath  
_A Retreat Booking & Therapeutic Tourism Platform_

![Breath Logo](https://github.com/Menna-Sammir/Breath/blob/main/client/src/assets/images/logo.png)

---

## 📖 Overview  
**Breath** is a full-stack application designed for booking retreats, wellness programs, and therapeutic tourism services.  
The project follows **.NET Clean Architecture** for the backend and uses a modern React client built with **Vite + React Query + MobX**.

Breath focuses on:
- Clean, scalable, maintainable backend architecture  
- Smooth communication between API and client  
- Fast, cached, and efficient data fetching  
- Modern and intuitive user experience  

---

## 🖼️ Landing Page Preview  

![Landing](https://github.com/Menna-Sammir/Breath/blob/main/client/src/assets/images/screencapture-breath-production-91b3-up-railway-app-2025-11-25-02_17_35.png)

---

## 🛠️ Tech Stack  

### **Backend**
- .NET 10  
- Clean Architecture  
- CQRS + MediatR  
- PostgreSQL  
- EF Core  
- Minimal APIs / Controllers  

### **Client**
- React  
- Vite  
- React Query  
- MobX  
- TypeScript  

---

## 🧱 Architecture  
```bash
Breath/
│
├── Domain
├── API
├── Infrastructure
├── Persistence
└── Client (Vite + React + React Query + MobX — fully connected to backend)
```


---

## 🚀 Features  
- Browse & book retreats  
- View retreat details, schedules, and wellness programs  
- Responsive modern UI  
- API-driven backend using CQRS  
- Clean separation of concerns  
- Optimistic UI updates using React Query  

---

## 📦 Getting Started  

### **Backend Setup**
```bash
cd API
dotnet restore
dotnet ef database update
dotnet run
The backend will start on:
👉 http://localhost:5001/ (or your configured port)
```


⚡ Make sure the API URL inside your client .env or config points to the running backend.

📽️ Demo

[demo link here](https://breath-production-91b3.up.railway.app/)

📄 Related Article

شرح Clean Architecture & MediatR:
🔗 https://www.linkedin.com/pulse/how-i-structure-net-applications-maintainability-using-menna-samir-qmeff/?trackingId=zCjFl3eJSJymiMelbrXFKA%3D%3D
