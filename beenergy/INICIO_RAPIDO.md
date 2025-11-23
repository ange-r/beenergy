# 🚀 Inicio Rápido - BeEnergy

## ✅ Todo ya está configurado y listo

Tu proyecto BeEnergy ahora está completamente unificado en una sola carpeta con frontend y backend integrados.

---

## 📍 Ubicación del Proyecto

```
C:\Users\Aracelis\Desktop\Proyecto_Hack\Backend\beenergy\beenergy\
```

**¡Todo está aquí!** Frontend Next.js + Contratos Soroban + Documentación

---

## ⚡ 3 Pasos para Empezar

### Paso 1: Instalar Dependencias

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Backend\beenergy\beenergy
npm install
```

### Paso 2: Deployar Contratos (Si aún no lo hiciste)

```bash
.\deploy-testnet.ps1
```

Guarda las direcciones de los contratos (CB..., CC..., etc.)

### Paso 3: Configurar `.env.local`

Abre `.env.local` y pega tus direcciones:

```env
NEXT_PUBLIC_ENERGY_TOKEN_CONTRACT=CB__TU_ADDRESS__
NEXT_PUBLIC_ENERGY_DISTRIBUTION_CONTRACT=CC__TU_ADDRESS__
NEXT_PUBLIC_ADMIN_ADDRESS=GB__TU_ADDRESS__
```

---

## 🎯 Ejecutar la Aplicación

```bash
npm run dev
```

Abre http://localhost:3000

---

## 🌐 Instalar Freighter Wallet

1. Descarga: https://www.freighter.app/
2. Instala la extensión
3. Cambia a **Testnet**
4. Consigue XLM gratis: https://laboratory.stellar.org/#account-creator

---

## 📂 Estructura del Proyecto

```
beenergy/
├── app/              # ← Páginas Next.js (Landing, Dashboard, etc.)
├── components/       # ← Componentes React + UI
├── hooks/            # ← useEnergyToken, useEnergyDistribution
├── lib/              # ← stellar-wallet-context, contracts-config
├── public/           # ← logo.png, hero-image.png
├── contracts/        # ← Smart contracts Soroban
├── .env.local        # ← Configurar aquí
└── package.json      # ← Dependencias
```

---

## 📚 Documentación

- **PROYECTO_UNIFICADO.md** - Estructura completa del proyecto
- **SETUP_INSTRUCTIONS.md** - Instrucciones detalladas
- **INTEGRATION_GUIDE.md** - Guía de integración
- **README.md** - Info general

---

## ✨ Lo que ya está hecho

### Frontend (Next.js)
- ✅ Tu logo configurado en toda la app
- ✅ Landing page con imagen principal
- ✅ Dashboard, Marketplace, Consumo, Perfil
- ✅ Conexión real con Stellar (Freighter)
- ✅ Hooks listos para usar
- ✅ Dark mode + i18n
- ✅ UI moderna con shadcn/ui

### Backend (Soroban)
- ✅ Token $ENERGY (HDROP)
- ✅ Sistema de distribución
- ✅ Multi-firma
- ✅ Privacidad con ZK commitments

### Integración
- ✅ Hooks: `useEnergyToken()`, `useEnergyDistribution()`
- ✅ Wallet: `useStellarWallet()`
- ✅ Config: `contracts-config.ts`

---

## 🎮 Probar la App

1. **Conectar Wallet**
   - Click "Conectar Wallet"
   - Selecciona Freighter
   - Aprueba

2. **Ver Dashboard**
   - Verás tu balance de $ENERGY
   - Info de tu membresía (si eres miembro)
   - Gráficos de consumo

3. **Marketplace**
   - Ver ofertas P2P
   - Comprar/vender energía

---

## 🆘 Ayuda Rápida

### Error: "Contract not configured"
→ Configura `.env.local`

### Error: "No wallet connected"
→ Conecta Freighter primero

### Error: "Insufficient balance"
→ Necesitas XLM para fees (friendbot)

---

## 📞 Más Ayuda

Lee en orden:
1. Este archivo (INICIO_RAPIDO.md) ← Estás aquí
2. SETUP_INSTRUCTIONS.md
3. INTEGRATION_GUIDE.md

---

**¡Listo para el hackathon! 🌞⚡🐝**

Tienes todo lo necesario en una sola carpeta:
- ✅ Frontend moderno
- ✅ Smart contracts
- ✅ Integración completa
- ✅ Logo e imágenes
- ✅ Documentación

Solo necesitas:
1. `npm install`
2. Deployar contratos
3. Configurar `.env.local`
4. `npm run dev`

**¡A demostrar! 🚀**
