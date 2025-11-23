# 🔗 Guía de Integración Frontend-Backend BeEnergy

Esta guía te ayudará a conectar el frontend Next.js con los contratos inteligentes desplegados en Stellar.

---

## 📋 Pasos para Completar la Integración

### 1. **Instalar Dependencias**

Primero, instala las dependencias de Stellar en el frontend:

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Frontend
npm install
# O si usas pnpm:
pnpm install
```

---

### 2. **Desplegar Contratos en Testnet**

Ve al directorio del backend y despliega los contratos:

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Backend\beenergy\beenergy

# Opción 1: Usar el script de deploy
.\deploy-testnet.ps1

# Opción 2: Deploy manual
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/energy_token.wasm \
  --network testnet \
  --source-account ADMIN_SECRET_KEY
```

**IMPORTANTE:** Guarda las direcciones de los contratos que se generen después del deploy.

---

### 3. **Configurar Variables de Entorno**

Abre el archivo `.env.local` en la raíz del frontend y actualiza con las direcciones de tus contratos:

```env
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org

# Contract Addresses (Reemplaza con tus direcciones deployadas)
NEXT_PUBLIC_ENERGY_TOKEN_CONTRACT=CBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_ENERGY_DISTRIBUTION_CONTRACT=CCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_COMMUNITY_GOVERNANCE_CONTRACT=CDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Horizon Server
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org

# Admin address (tu dirección de Stellar)
NEXT_PUBLIC_ADMIN_ADDRESS=GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Dónde encontrar las direcciones de los contratos:**

Después de deployar, las direcciones estarán en:
- La salida de consola del script de deploy
- El archivo `.env` o `.env.deployed` en el backend
- Ejecutando: `stellar contract id asset --asset-code HDROP --network testnet`

---

### 4. **Instalar Freighter Wallet**

Para conectar la wallet, necesitas instalar la extensión de Freighter:

1. Descarga Freighter: https://www.freighter.app/
2. Instala la extensión en Chrome/Firefox/Brave
3. Crea una cuenta o importa una existente
4. Cambia a **Testnet** en las configuraciones de Freighter
5. Obtén XLM de testnet: https://laboratory.stellar.org/#account-creator

---

### 5. **Inicializar Contratos (Solo la Primera Vez)**

Después de deployar, necesitas inicializar los contratos. Abre la consola de Soroban o usa el script:

```bash
# Inicializar el token
stellar contract invoke \
  --id $ENERGY_TOKEN_CONTRACT \
  --network testnet \
  --source-account ADMIN \
  -- \
  __constructor \
  --admin GADMIN_ADDRESS \
  --distribution_contract $DISTRIBUTION_CONTRACT \
  --initial_supply 0

# Inicializar distribución
stellar contract invoke \
  --id $DISTRIBUTION_CONTRACT \
  --network testnet \
  --source-account ADMIN \
  -- \
  initialize \
  --admin GADMIN_ADDRESS \
  --token_contract $TOKEN_CONTRACT \
  --required_approvals 3
```

O usa el backend que ya tiene funciones helper para esto.

---

### 6. **Ejecutar el Frontend**

```bash
cd C:\Users\Aracelis\Desktop\Proyecto_Hack\Frontend
npm run dev
```

Abre http://localhost:3000

---

## 🔧 Hooks Disponibles

### `useEnergyToken()`

Hook para interactuar con el contrato de tokens $ENERGY:

```typescript
import { useEnergyToken } from "@/hooks/useEnergyToken"

function MyComponent() {
  const { getBalance, transfer, burnEnergy, isLoading, error } = useEnergyToken()

  // Obtener balance
  const balance = await getBalance()

  // Transferir tokens
  await transfer("GXXXXX...", 10) // Transferir 10 kWh

  // Quemar tokens (consumir energía)
  await burnEnergy(5) // Consumir 5 kWh
}
```

### `useEnergyDistribution()`

Hook para interactuar con el contrato de distribución:

```typescript
import { useEnergyDistribution } from "@/hooks/useEnergyDistribution"

function MyComponent() {
  const {
    getMemberInfo,
    getTotalGenerated,
    recordGeneration,
    recordPrivateConsumption,
    isLoading,
    error,
  } = useEnergyDistribution()

  // Obtener info de miembro
  const info = await getMemberInfo()
  console.log(info.isMember, info.percent)

  // Obtener total generado
  const total = await getTotalGenerated()

  // Registrar generación (solo admin)
  await recordGeneration(100) // 100 kWh generados

  // Registro privado de consumo
  await recordPrivateConsumption(commitment)
}
```

### `useStellarWallet()`

Hook para manejar la conexión de wallet:

```typescript
import { useStellarWallet } from "@/lib/stellar-wallet-context"

function MyComponent() {
  const {
    isConnected,
    address,
    shortAddress,
    userProfile,
    kit,
    connectWallet,
    disconnectWallet,
    setUserProfile,
  } = useStellarWallet()

  // Conectar wallet
  await connectWallet()

  // Desconectar
  disconnectWallet()
}
```

---

## 🎨 Actualizar Páginas con Datos Reales

### Dashboard

Actualiza `app/dashboard/page.tsx` para usar datos reales:

```typescript
"use client"

import { useEffect, useState } from "react"
import { useStellarWallet } from "@/lib/stellar-wallet-context"
import { useEnergyToken } from "@/hooks/useEnergyToken"
import { useEnergyDistribution } from "@/hooks/useEnergyDistribution"

export default function DashboardPage() {
  const { isConnected, address } = useStellarWallet()
  const { getBalance } = useEnergyToken()
  const { getMemberInfo, getTotalGenerated } = useEnergyDistribution()

  const [balance, setBalance] = useState<string>("0")
  const [memberInfo, setMemberInfo] = useState({ isMember: false, percent: 0 })
  const [totalGenerated, setTotalGenerated] = useState(0)

  useEffect(() => {
    if (isConnected && address) {
      loadData()
    }
  }, [isConnected, address])

  const loadData = async () => {
    try {
      const [bal, info, total] = await Promise.all([
        getBalance(),
        getMemberInfo(),
        getTotalGenerated(),
      ])

      setBalance(bal)
      setMemberInfo(info)
      setTotalGenerated(total)
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  return (
    <div>
      <h1>Balance: {balance} kWh</h1>
      <p>Member: {memberInfo.isMember ? "Yes" : "No"}</p>
      <p>Ownership: {memberInfo.percent}%</p>
      <p>Total Generated: {totalGenerated} kWh</p>
    </div>
  )
}
```

---

## 📦 Estructura de Archivos Creados

```
Frontend/
├── .env.local                          # Variables de entorno (configurar)
├── lib/
│   ├── stellar-wallet-context.tsx      # Provider de Stellar Wallet
│   └── contracts-config.ts             # Configuración de contratos
├── hooks/
│   ├── useEnergyToken.ts              # Hook para token contract
│   └── useEnergyDistribution.ts       # Hook para distribution contract
├── public/
│   ├── logo.png                       # Logo de BeEnergy
│   └── hero-image.png                 # Imagen principal
└── INTEGRATION_GUIDE.md               # Esta guía
```

---

## 🧪 Testing

### 1. Conectar Wallet

- Abre http://localhost:3000
- Click en "Conectar Wallet"
- Selecciona Freighter
- Aprueba la conexión

### 2. Ver Balance

- Ve al Dashboard
- Deberías ver tu balance de tokens $ENERGY

### 3. Transferir Tokens

- Ingresa una dirección de destino
- Ingresa cantidad de kWh
- Click en "Transferir"
- Firma la transacción en Freighter

---

## ⚠️ Troubleshooting

### Error: "Contract not configured"

**Solución:** Verifica que las direcciones de los contratos estén configuradas en `.env.local`

### Error: "No wallet connected"

**Solución:** Asegúrate de conectar Freighter primero

### Error: "Transaction failed"

**Posibles causas:**
1. No tienes XLM suficiente para fees (consigue de friendbot)
2. El contrato no está inicializado
3. No tienes los permisos necesarios (ej: solo admin puede registrar generación)

### Freighter no se muestra

**Solución:**
1. Verifica que la extensión esté instalada
2. Refresca la página
3. Verifica que estés en testnet

---

## 🚀 Próximos Pasos

1. ✅ Configurar variables de entorno
2. ✅ Instalar dependencias
3. ✅ Desplegar contratos
4. ⬜ Actualizar páginas con datos reales
5. ⬜ Implementar funcionalidad de marketplace
6. ⬜ Agregar sistema de notificaciones
7. ⬜ Implementar ZK proofs para privacidad

---

## 📚 Recursos

- [Stellar SDK Docs](https://stellar.github.io/js-stellar-sdk/)
- [Soroban Docs](https://soroban.stellar.org/docs)
- [Freighter Wallet](https://www.freighter.app/)
- [Stellar Expert (Explorer)](https://stellar.expert/explorer/testnet)
- [Stellar Laboratory](https://laboratory.stellar.org/)

---

## 💬 Soporte

Si tienes problemas:
1. Revisa los logs de consola del navegador
2. Verifica el estado de transacciones en Stellar Expert
3. Consulta la documentación de Soroban
4. Abre un issue en el repositorio

---

**¡Buena suerte con la integración! 🌞⚡**
