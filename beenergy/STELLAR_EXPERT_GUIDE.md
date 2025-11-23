# Guía Práctica: Stellar Expert para BeEnergy

## 🎯 Casos de Uso Específicos de BeEnergy

### 1. Ver Compra/Venta de Energía en el Marketplace

Cuando un usuario compra energía en tu marketplace:

#### Paso a Paso:
1. Usuario hace click en "Comprar" en el marketplace
2. Tu app procesa la transacción y te devuelve un hash
3. Copia ese hash
4. Ve a: `https://stellar.expert/explorer/testnet/tx/[HASH]`

#### Qué verás:
```
Transaction Details
├─ Source Account: G... (comprador)
├─ Operations:
│  ├─ 1. Payment: X kWh BeEnergy tokens
│  ├─ 2. Payment: Y XLM (precio)
│  └─ 3. Contract Invocation: marketplace.complete_sale()
├─ Fee: 0.0001 XLM
└─ Status: Success ✓
```

### 2. Monitorear tu Contrato de Marketplace

**URL:** `https://stellar.expert/explorer/testnet/contract/[TU_MARKETPLACE_CONTRACT]`

Verás:
- **Invocations:** Cada vez que alguien crea o acepta una oferta
- **Events:** Eventos como `energy_sold`, `offer_created`
- **Contract Data:** Estado actual (ofertas activas, volumen total, etc.)

### 3. Ver Balance de Tokens BeEnergy

Para ver cuántos tokens BeEnergy tiene una cuenta:

1. Ve a: `https://stellar.expert/explorer/testnet/account/[DIRECCION]`
2. Scroll a la sección "Assets"
3. Busca tu token "BeEnergy" o el código que uses

**Ejemplo:**
```
Assets
├─ XLM: 100.5000000
├─ BeEnergy (kWh): 250.0000000
└─ USDC: 50.0000000
```

### 4. Ver Historial de Consumo

Para ver el historial de consumo de energía de un usuario:

1. Busca su cuenta en Stellar Expert
2. Ve a la pestaña **"Payments"**
3. Filtra por tu token BeEnergy
4. Verás:
   - Pagos recibidos (energía producida/comprada)
   - Pagos enviados (energía consumida/vendida)
   - Fechas y cantidades

### 5. Verificar Gobernanza de la Comunidad

Si implementaste votaciones:

1. Ve a tu contrato de gobernanza
2. Pestaña **"Events"**
3. Busca eventos como:
   - `vote_cast`: Alguien votó
   - `proposal_created`: Nueva propuesta
   - `proposal_executed`: Propuesta aprobada y ejecutada

---

## 🔧 Integrar Stellar Expert en tu Frontend

### Componente de Link a Stellar Expert

Crea un componente reutilizable:

```typescript
// components/stellar-expert-link.tsx
"use client"

import { ExternalLink } from "lucide-react"

interface StellarExpertLinkProps {
  type: "transaction" | "account" | "contract"
  value: string
  children?: React.ReactNode
}

export function StellarExpertLink({ type, value, children }: StellarExpertLinkProps) {
  const network = process.env.PUBLIC_STELLAR_NETWORK === "TESTNET" ? "testnet" : "public"
  const baseUrl = `https://stellar.expert/explorer/${network}`

  const urlMap = {
    transaction: `${baseUrl}/tx/${value}`,
    account: `${baseUrl}/account/${value}`,
    contract: `${baseUrl}/contract/${value}`,
  }

  return (
    <a
      href={urlMap[type]}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
    >
      {children || "Ver en Stellar Expert"}
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}
```

### Usar en tu Activity Page

```typescript
// app/activity/page.tsx
import { StellarExpertLink } from "@/components/stellar-expert-link"

export default function ActivityPage() {
  const transactions = [...] // tus transacciones

  return (
    <div>
      {transactions.map(tx => (
        <div key={tx.hash}>
          <p>{tx.description}</p>
          <StellarExpertLink type="transaction" value={tx.hash}>
            Ver detalles
          </StellarExpertLink>
        </div>
      ))}
    </div>
  )
}
```

### Agregar en el Success Modal

```typescript
// components/success-modal.tsx
export function SuccessModal({ txHash }: { txHash: string }) {
  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>¡Transacción Exitosa!</DialogTitle>
        <p>Tu transacción se procesó correctamente</p>

        {/* Agregar link a Stellar Expert */}
        <div className="mt-4">
          <StellarExpertLink type="transaction" value={txHash}>
            Ver en el explorador de blockchain
          </StellarExpertLink>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

## 📊 Dashboard de Monitoreo

### Crear un Admin Dashboard

Puedes crear una página de admin para monitorear el sistema:

```typescript
// app/admin/page.tsx
"use client"

import { useEffect, useState } from "react"
import { StellarExpertLink } from "@/components/stellar-expert-link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEnergy: 0,
    activeOffers: 0,
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="glass-card p-6">
        <h3>Contrato de Marketplace</h3>
        <StellarExpertLink
          type="contract"
          value={process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!}
        >
          Ver estado
        </StellarExpertLink>
      </div>

      <div className="glass-card p-6">
        <h3>Token BeEnergy</h3>
        <StellarExpertLink
          type="contract"
          value={process.env.NEXT_PUBLIC_ENERGY_TOKEN_CONTRACT!}
        >
          Ver distribución
        </StellarExpertLink>
      </div>

      <div className="glass-card p-6">
        <h3>Cuenta Admin</h3>
        <StellarExpertLink
          type="account"
          value={process.env.NEXT_PUBLIC_ADMIN_ADDRESS!}
        >
          Ver balance
        </StellarExpertLink>
      </div>
    </div>
  )
}
```

---

## 🔍 API de Stellar Expert

Stellar Expert también tiene una API que puedes usar:

### Obtener información de cuenta

```typescript
async function getAccountInfo(address: string) {
  const network = "testnet" // o "public"
  const response = await fetch(
    `https://api.stellar.expert/explorer/${network}/account/${address}`
  )
  return await response.json()
}
```

### Obtener transacciones recientes

```typescript
async function getRecentTransactions(address: string) {
  const network = "testnet"
  const response = await fetch(
    `https://api.stellar.expert/explorer/${network}/account/${address}/tx?limit=10`
  )
  return await response.json()
}
```

### Usar en tu Dashboard

```typescript
"use client"

import { useEffect, useState } from "react"

export default function UserTransactions({ address }: { address: string }) {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function loadTransactions() {
      const network = process.env.PUBLIC_STELLAR_NETWORK === "TESTNET"
        ? "testnet"
        : "public"

      const response = await fetch(
        `https://api.stellar.expert/explorer/${network}/account/${address}/tx?limit=10`
      )
      const data = await response.json()
      setTransactions(data._embedded.records)
    }

    loadTransactions()
  }, [address])

  return (
    <div>
      {transactions.map(tx => (
        <div key={tx.hash}>
          <p>{tx.memo}</p>
          <StellarExpertLink type="transaction" value={tx.hash} />
        </div>
      ))}
    </div>
  )
}
```

---

## 📱 Ejemplos Prácticos

### Escenario 1: Usuario compra 100 kWh

1. Usuario ve oferta en marketplace
2. Click en "Comprar"
3. Freighter pide confirmación
4. Transacción se procesa
5. Success modal muestra: **"Ver en Stellar Expert"**
6. Usuario hace click y ve:
   - ✅ Transferencia de 100 kWh BeEnergy
   - ✅ Pago de 10 XLM al vendedor
   - ✅ Fee de 0.0001 XLM
   - ✅ Timestamp exacto

### Escenario 2: Usuario vende energía

1. Usuario crea oferta de 50 kWh
2. Otro usuario la acepta
3. En Stellar Expert del vendedor verás:
   - **Payment received:** +10 XLM
   - **Payment sent:** -50 kWh BeEnergy
   - **Contract event:** `energy_sold(50, 10)`

### Escenario 3: Admin verifica distribución

1. Admin abre el contrato de distribución en Stellar Expert
2. Ve en "Contract Data":
   ```
   total_distributed: 10000 kWh
   active_users: 50
   last_distribution: 2024-01-15
   ```
3. Ve en "Events" todas las distribuciones recientes

---

## 🎓 Tips Avanzados

### 1. Crear Dashboards Personalizados

Puedes combinar la API de Stellar Expert con tu UI:

```typescript
// lib/stellar-stats.ts
export async function getMarketplaceStats() {
  const contractId = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
  const network = "testnet"

  // Obtener invocaciones del contrato
  const response = await fetch(
    `https://api.stellar.expert/explorer/${network}/contract/${contractId}/invocations`
  )

  const data = await response.json()

  return {
    totalSales: data.filter(inv => inv.method === "buy_energy").length,
    totalVolume: calculateTotalVolume(data),
    lastActivity: data[0]?.timestamp
  }
}
```

### 2. Notificaciones en Tiempo Real

Usa webhooks o polling para notificar a usuarios:

```typescript
// Poll cada 30 segundos
setInterval(async () => {
  const txs = await getRecentTransactions(userAddress)
  const newTxs = txs.filter(tx => tx.timestamp > lastChecked)

  if (newTxs.length > 0) {
    // Mostrar notificación
    toast.success(`Nueva transacción: ${newTxs[0].hash}`)
  }
}, 30000)
```

### 3. Exportar Reportes

```typescript
async function exportMonthlyReport(address: string, month: string) {
  const txs = await getTransactionsForMonth(address, month)

  const csv = txs.map(tx => ({
    fecha: tx.timestamp,
    tipo: tx.type,
    cantidad: tx.amount,
    link: `https://stellar.expert/explorer/testnet/tx/${tx.hash}`
  }))

  downloadCSV(csv, `reporte-${month}.csv`)
}
```

---

## 🔐 Seguridad y Privacidad

**Nota importante:** Todas las transacciones en Stellar son públicas. Esto significa:

✅ **Ventajas:**
- Transparencia total
- Auditable por cualquiera
- Imposible manipular datos

⚠️ **Consideraciones:**
- Direcciones públicas son visibles
- Montos de transacciones son visibles
- Historial completo es público

**Recomendación:** Informa a tus usuarios sobre esto en tu Privacy Policy.

---

## 📚 Recursos Adicionales

- Stellar Expert API Docs: https://stellar.expert/docs
- Stellar Horizon API: https://developers.stellar.org/api
- Stellar CLI: https://developers.stellar.org/docs/tools/cli
- Freighter Wallet: https://freighter.app

---

## ✨ Próximos Pasos

1. ✅ Integrar StellarExpertLink en tu UI
2. ✅ Agregar links en Success Modals
3. ✅ Crear página de admin con monitoreo
4. ⏳ Implementar notificaciones de transacciones
5. ⏳ Crear reportes exportables
6. ⏳ Dashboard de analytics

¡Con Stellar Expert puedes dar total transparencia a tus usuarios sobre sus transacciones de energía! 🌟
