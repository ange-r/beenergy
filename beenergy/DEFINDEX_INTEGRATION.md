# Integración DeFindex - BeEnergy

Esta guía explica cómo usar la integración de DeFindex para generar rendimiento automático en los balances de los usuarios.

## 📋 Tabla de Contenidos

- [Configuración](#configuración)
- [Arquitectura](#arquitectura)
- [API Endpoints](#api-endpoints)
- [Uso en Frontend](#uso-en-frontend)
- [Ejemplos](#ejemplos)

## ⚙️ Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env` y configura las siguientes variables:

```env
# DeFindex Configuration
DEFINDEX_API_KEY="sk_your_api_key_here"
DEFINDEX_BASE_URL="https://api.defindex.io"
NEXT_PUBLIC_DEFINDEX_VAULT_ADDRESS="VAULT_ADDRESS_HERE"
```

**Donde obtener:**
- `DEFINDEX_API_KEY`: Obtén tu API key en [DeFindex.io](https://defindex.io)
- `NEXT_PUBLIC_DEFINDEX_VAULT_ADDRESS`: Dirección del vault de USDC en DeFindex

### 2. Instalación de Dependencias

El SDK de DeFindex ya está instalado. Si necesitas reinstalar:

```bash
npm install @defindex/sdk --legacy-peer-deps
```

## 🏗️ Arquitectura

```
┌─────────────────┐
│    Frontend     │
│  (Dashboard)    │
└────────┬────────┘
         │ useDefindex()
         ▼
┌─────────────────┐
│  API Routes     │
│ /api/defindex/* │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ DeFindex Service│
│ (lib/defindex-  │
│  service.ts)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ @defindex/sdk   │
│ (NPM Package)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ DeFindex API    │
│ (Stellar/       │
│  Soroban)       │
└─────────────────┘
```

## 🔌 API Endpoints

### Health Check
```
GET /api/defindex/health
```
Verifica el estado de la conexión con DeFindex.

**Respuesta:**
```json
{
  "success": true,
  "healthy": true,
  "message": "DeFindex API is operational"
}
```

### Obtener Estadísticas del Usuario
```
GET /api/defindex/stats/[vaultAddress]/[userAddress]
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "balance": 520,
    "apy": 5.2,
    "interestToday": 0.074,
    "interestThisMonth": 2.21
  }
}
```

### Información del Vault
```
GET /api/defindex/vault/[address]
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "address": "VAULT_ADDRESS",
    "name": "USDC Yield Vault",
    "symbol": "yvUSDC",
    "totalAssets": 1000000,
    "apy": 5.2
  }
}
```

### Depositar Fondos
```
POST /api/defindex/deposit
```

**Body:**
```json
{
  "vaultAddress": "VAULT_ADDRESS",
  "amount": 100,
  "userAddress": "USER_PUBLIC_KEY",
  "invest": true,
  "slippageBps": 100
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "transaction": "TRANSACTION_XDR",
    "vaultAddress": "VAULT_ADDRESS",
    "amount": 100,
    "message": "Deposit transaction generated successfully. Please sign with your wallet."
  }
}
```

### Retirar Fondos
```
POST /api/defindex/withdraw
```

**Body:**
```json
{
  "vaultAddress": "VAULT_ADDRESS",
  "amount": 50,
  "userAddress": "USER_PUBLIC_KEY"
}
```

## 💻 Uso en Frontend

### Hook useDefindex

```tsx
import { useDefindex } from '@/hooks/useDefindex';

function MyComponent() {
  const {
    stats,           // Estadísticas del usuario
    vaultInfo,       // Información del vault
    loading,         // Estado de carga
    error,           // Errores
    fetchStats,      // Recargar estadísticas
    deposit,         // Depositar fondos
    withdraw,        // Retirar fondos
    checkHealth,     // Verificar estado
  } = useDefindex();

  // Los datos se cargan automáticamente
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Balance: ${stats?.balance}</h2>
      <p>APY: {stats?.apy}%</p>
      <p>Interés hoy: ${stats?.interestToday}</p>
    </div>
  );
}
```

### Depositar Fondos

```tsx
async function handleDeposit() {
  try {
    // Genera la transacción
    const transaction = await deposit(100); // 100 USD

    // Firmar con la wallet del usuario
    const signedTx = await wallet.sign(transaction);

    // Enviar a la red
    await stellar.submitTransaction(signedTx);

    // Recargar estadísticas
    await fetchStats();
  } catch (error) {
    console.error('Error al depositar:', error);
  }
}
```

### Retirar Fondos

```tsx
async function handleWithdraw() {
  try {
    // Genera la transacción
    const transaction = await withdraw(50); // 50 USD

    // Firmar con la wallet del usuario
    const signedTx = await wallet.sign(transaction);

    // Enviar a la red
    await stellar.submitTransaction(signedTx);

    // Recargar estadísticas
    await fetchStats();
  } catch (error) {
    console.error('Error al retirar:', error);
  }
}
```

## 📊 Ejemplo Completo: Dashboard

```tsx
'use client'

import { useDefindex } from '@/hooks/useDefindex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { stats, vaultInfo, loading } = useDefindex();

  return (
    <Card>
      <CardHeader>
        <CardTitle>DeFindex Yield</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <div>
              <p>APY: {stats?.apy}%</p>
              <p>Balance: ${stats?.balance}</p>
            </div>
            <div>
              <p>Interés hoy: +${stats?.interestToday.toFixed(3)}</p>
              <p>Este mes: +${stats?.interestThisMonth.toFixed(2)}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
```

## 🔐 Seguridad

1. **API Key**: Nunca expongas tu `DEFINDEX_API_KEY` en el frontend
2. **Transacciones**: Los usuarios siempre deben firmar las transacciones con su wallet
3. **Validación**: El backend valida todos los parámetros antes de generar transacciones

## 📚 Recursos

- [DeFindex Docs](https://docs.defindex.io/)
- [DeFindex SDK GitHub](https://github.com/paltalabs/defindex-sdk)
- [Stellar Documentation](https://developers.stellar.org/)

## 🐛 Troubleshooting

### Error: "DEFINDEX_API_KEY no está configurada"
- Asegúrate de tener `.env` con la clave `DEFINDEX_API_KEY`

### Error: "Vault address not configured"
- Configura `NEXT_PUBLIC_DEFINDEX_VAULT_ADDRESS` en tu `.env`

### Error al depositar/retirar
- Verifica que el usuario tenga fondos suficientes
- Asegúrate de que la wallet esté conectada
- Revisa que la transacción esté firmada correctamente

## 🚀 Próximos Pasos

1. Obtén tu API key de DeFindex
2. Configura las variables de entorno
3. Prueba la integración en testnet primero
4. Implementa en producción con mainnet

---

**Nota**: Esta integración actualmente usa mock data. Para usar datos reales, configura las variables de entorno y actualiza el dashboard para usar el hook `useDefindex()`.
