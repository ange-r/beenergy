# 🎉 BeEnergy - Proyecto Unificado

## ✅ Todo el proyecto ahora está en una sola carpeta

He movido todo el frontend configurado a la carpeta del backend. Ahora tienes un proyecto completo y unificado.

---

## 📁 Estructura del Proyecto Unificado

```
C:\Users\Aracelis\Desktop\Proyecto_Hack\Backend\beenergy\beenergy\
│
├── 📱 FRONTEND (Next.js)
│   ├── app/                        # Páginas de Next.js
│   │   ├── page.tsx               # Landing page (con logo nuevo)
│   │   ├── layout.tsx             # Layout principal
│   │   ├── globals.css            # Estilos globales
│   │   ├── dashboard/             # Dashboard
│   │   ├── marketplace/           # Marketplace P2P
│   │   ├── consumption/           # Consumo
│   │   ├── activity/              # Actividad
│   │   └── profile/               # Perfil
│   │
│   ├── components/                # Componentes React
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── sidebar.tsx
│   │   ├── dashboard-header.tsx
│   │   └── ...
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── useEnergyToken.ts     # ← Hook para token contract
│   │   └── useEnergyDistribution.ts # ← Hook para distribution
│   │
│   ├── lib/                       # Utilidades y contextos
│   │   ├── stellar-wallet-context.tsx # ← Stellar wallet real
│   │   ├── contracts-config.ts   # ← Configuración de contratos
│   │   ├── wallet-context.tsx    # Wallet context
│   │   ├── theme-context.tsx     # Theme provider
│   │   ├── i18n-context.tsx      # i18n
│   │   └── utils.ts
│   │
│   ├── public/                    # Assets estáticos
│   │   ├── logo.png              # ✅ Tu logo
│   │   ├── hero-image.png        # ✅ Imagen principal
│   │   └── ...
│   │
│   ├── styles/                    # Estilos
│   │
│   ├── .env.local                # ← Variables de entorno (configurar)
│   ├── next.config.mjs           # Config de Next.js
│   ├── tsconfig.json             # TypeScript config
│   ├── tailwind.config.js        # Tailwind config
│   └── postcss.config.mjs        # PostCSS config
│
├── ⚡ BACKEND (Smart Contracts)
│   ├── contracts/                 # Contratos Soroban
│   │   ├── energy_token/         # Token $ENERGY (HDROP)
│   │   ├── energy_distribution/  # Distribución
│   │   └── community_governance/ # Gobernanza
│   │
│   ├── packages/                  # Clients generados
│   │
│   ├── target/                    # Build artifacts
│   │
│   ├── Cargo.toml                # Workspace Rust
│   ├── Cargo.lock
│   │
│   ├── .env                      # ← Variables del backend
│   ├── .env.example
│   └── environments.toml
│
├── 📚 DOCUMENTACIÓN
│   ├── README.md                  # Documentación principal
│   ├── SETUP_INSTRUCTIONS.md     # ← Instrucciones paso a paso
│   ├── INTEGRATION_GUIDE.md      # ← Guía de integración
│   ├── PROYECTO_UNIFICADO.md     # ← Este archivo
│   ├── ZK_PRIVACY_GUIDE.md       # Guía de privacidad
│   ├── DEPLOY_MANUAL.md          # Deploy manual
│   └── FRONTEND_ERROR_HANDLING.md
│
├── 🛠️ SCRIPTS
│   ├── deploy-testnet.ps1        # Deploy Windows
│   ├── deploy-testnet.sh         # Deploy Linux/Mac
│   └── deploy-simple.ps1
│
└── ⚙️ CONFIGURACIÓN
    ├── package.json              # ← Actualizado con Next.js
    ├── package-lock.json
    ├── components.json           # shadcn/ui config
    ├── eslint.config.js
    └── vite.config.ts            # Para los contratos
```

---

## 🚀 Cómo Ejecutar el Proyecto Unificado

### 1. **Instalar Dependencias**

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Backend\beenergy\beenergy
npm install
```

Esto instalará todas las dependencias de:
- ✅ Next.js 16
- ✅ React 19
- ✅ Stellar SDK
- ✅ shadcn/ui
- ✅ Todos los componentes UI

### 2. **Configurar Variables de Entorno**

Edita `.env.local` y agrega las direcciones de tus contratos:

```env
NEXT_PUBLIC_ENERGY_TOKEN_CONTRACT=CB__TU_ADDRESS__
NEXT_PUBLIC_ENERGY_DISTRIBUTION_CONTRACT=CC__TU_ADDRESS__
NEXT_PUBLIC_ADMIN_ADDRESS=GB__TU_ADDRESS__
```

### 3. **Ejecutar el Frontend**

```bash
npm run dev
```

Abre http://localhost:3000

### 4. **Ejecutar Frontend + Contratos (Desarrollo completo)**

```bash
npm run start
```

Esto ejecutará:
- ✅ Next.js dev server
- ✅ Stellar scaffold watch (auto-rebuild de contratos)

---

## 📦 Scripts Disponibles

```bash
npm run dev              # Solo frontend (Next.js)
npm run dev:vite        # Solo Vite (viejo)
npm run start           # Frontend + Contratos
npm run build           # Build de producción
npm run build:contracts # Build solo contratos
npm run lint            # Linter
npm run format          # Prettier
```

---

## 🔧 Deploy de Contratos

### Opción 1: Script Automático (Windows)

```bash
.\deploy-testnet.ps1
```

### Opción 2: Script Automático (Linux/Mac)

```bash
./deploy-testnet.sh
```

### Opción 3: Manual

```bash
# Build
stellar contract build

# Deploy energy_token
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/energy_token.wasm \
  --network testnet \
  --source-account ADMIN

# Deploy energy_distribution
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/energy_distribution.wasm \
  --network testnet \
  --source-account ADMIN
```

**Guarda las direcciones que se generen y actualiza `.env.local`**

---

## 📖 Documentos Importantes

### Para Empezar:
1. **SETUP_INSTRUCTIONS.md** - Instrucciones paso a paso
2. **INTEGRATION_GUIDE.md** - Guía completa de integración
3. **README.md** - Documentación general

### Para Desarrollo:
- **ZK_PRIVACY_GUIDE.md** - Implementación de privacidad
- **FRONTEND_ERROR_HANDLING.md** - Manejo de errores
- **DEPLOY_MANUAL.md** - Deploy manual de contratos

---

## 🎯 Flujo de Trabajo Completo

### 1. Primera vez (Setup):
```bash
# Instalar dependencias
npm install

# Instalar Freighter
# https://www.freighter.app/

# Deploy contratos
.\deploy-testnet.ps1

# Configurar .env.local con las direcciones
```

### 2. Desarrollo diario:
```bash
# Ejecutar todo
npm run start

# O solo frontend
npm run dev
```

### 3. Antes de presentar:
```bash
# Build de producción
npm run build

# Preview
npm run preview
```

---

## ✨ Características Integradas

### Frontend (Next.js)
- ✅ Landing page con tu logo
- ✅ Dashboard con datos reales de blockchain
- ✅ Marketplace P2P
- ✅ Conexión con Freighter wallet
- ✅ Hooks para contratos
- ✅ Internacionalización (i18n)
- ✅ Dark mode
- ✅ Componentes UI modernos (shadcn/ui)

### Backend (Soroban)
- ✅ Token $ENERGY (HoneyDrop - HDROP)
- ✅ Sistema de distribución
- ✅ Multi-firma
- ✅ Privacidad con commitments
- ✅ Tests integrados

### Integración
- ✅ Hooks listos para usar
- ✅ Stellar Wallets Kit configurado
- ✅ React Query para state
- ✅ Error handling
- ✅ Loading states

---

## 🔍 Verificar que Todo Esté Copiado

```bash
# Verificar estructura
ls -la

# Deberías ver:
# - app/
# - components/
# - hooks/
# - lib/
# - public/ (con logo.png y hero-image.png)
# - contracts/
# - .env.local
# - next.config.mjs
# - package.json (actualizado)
```

---

## 🆘 Troubleshooting

### "Cannot find module @/..."
**Solución:** Ejecuta `npm install` nuevamente

### "Port 3000 already in use"
**Solución:** Cierra otros procesos o cambia el puerto en `next.config.mjs`

### Las imágenes no cargan
**Solución:** Verifica que estén en `public/logo.png` y `public/hero-image.png`

### Los hooks no funcionan
**Solución:** Configura `.env.local` con las direcciones de los contratos

---

## 📊 Comparación: Antes vs Ahora

### ❌ Antes (Separado):
```
Proyecto_Hack/
├── Frontend/          # Carpeta separada
└── Backend/
    └── beenergy/
        └── beenergy/  # Solo contratos
```

### ✅ Ahora (Unificado):
```
Proyecto_Hack/
└── Backend/
    └── beenergy/
        └── beenergy/  # ¡TODO JUNTO!
            ├── Frontend (Next.js)
            ├── Contratos (Soroban)
            └── Documentación
```

---

## 🎓 Próximos Pasos

1. ✅ Ejecutar `npm install`
2. ✅ Deployar contratos
3. ✅ Configurar `.env.local`
4. ✅ Ejecutar `npm run dev`
5. ✅ Conectar Freighter
6. ✅ ¡Probar la aplicación!

---

## 📞 Ayuda

Lee estos documentos en orden:
1. **SETUP_INSTRUCTIONS.md** (primero)
2. **INTEGRATION_GUIDE.md** (segundo)
3. **README.md** (referencia)

---

**¡Tu proyecto BeEnergy ahora está completamente unificado y listo para el hackathon! 🌞⚡🐝**
