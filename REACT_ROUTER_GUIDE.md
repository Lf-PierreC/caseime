# Guia Completo do React Router DOM

## 📚 Índice
1. [Instalação](#instalação)
2. [Configuração Básica](#configuração-básica)
3. [Navegação](#navegação)
4. [Hooks Principais](#hooks-principais)
5. [Rotas Aninhadas](#rotas-aninhadas)
6. [Proteção de Rotas](#proteção-de-rotas)
7. [Exemplos Práticos](#exemplos-práticos)

## 🚀 Instalação

O React Router DOM já está instalado no seu projeto:
```bash
npm install react-router-dom
```

## ⚙️ Configuração Básica

### 1. Envolver a aplicação com BrowserRouter

```tsx
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Sua aplicação aqui */}
    </Router>
  );
}
```

### 2. Definir rotas com Routes e Route

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

## 🧭 Navegação

### Navegação Declarativa (Link)

```tsx
import { Link } from 'react-router-dom';

<Link to="/about">Sobre</Link>
<Link to="/contact" state={{ from: 'home' }}>Contato</Link>
```

### Navegação Programática (useNavigate)

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navegar para uma rota
navigate('/about');

// Navegar com state
navigate('/contact', { state: { from: 'home' } });

// Voltar uma página
navigate(-1);

// Avançar uma página
navigate(1);
```

## 🎣 Hooks Principais

### 1. useParams - Parâmetros de URL

```tsx
import { useParams } from 'react-router-dom';

// Para rota: /user/:id/:name
const UserProfile = () => {
  const { id, name } = useParams();
  
  return (
    <div>
      <h2>Usuário: {name}</h2>
      <p>ID: {id}</p>
    </div>
  );
};
```

### 2. useSearchParams - Query Parameters

```tsx
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  const updateSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  return (
    <div>
      <p>Buscando: {query}</p>
      <p>Página: {page}</p>
      <button onClick={() => updateSearch('novo termo')}>
        Buscar
      </button>
    </div>
  );
};
```

### 3. useLocation - Informações da URL

```tsx
import { useLocation } from 'react-router-dom';

const LocationInfo = () => {
  const location = useLocation();
  
  return (
    <div>
      <p>Pathname: {location.pathname}</p>
      <p>Search: {location.search}</p>
      <p>Hash: {location.hash}</p>
      <p>State: {JSON.stringify(location.state)}</p>
    </div>
  );
};
```

### 4. useNavigate - Navegação Programática

```tsx
import { useNavigate } from 'react-router-dom';

const NavigationExample = () => {
  const navigate = useNavigate();
  
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);
  const goToHome = () => navigate('/');
  const goToWithState = () => navigate('/admin', { 
    state: { from: 'example' } 
  });

  return (
    <div>
      <button onClick={goBack}>Voltar</button>
      <button onClick={goForward}>Avançar</button>
      <button onClick={goToHome}>Home</button>
      <button onClick={goToWithState}>Admin</button>
    </div>
  );
};
```

## 🏗️ Rotas Aninhadas

### Estrutura Hierárquica

```tsx
import { Routes, Route, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <nav>Dashboard Navigation</nav>
      <main>
        <Outlet /> {/* Renderiza as rotas filhas aqui */}
      </main>
    </div>
  );
};

const DashboardHome = () => <h2>Dashboard Home</h2>;
const Profile = () => <h2>Profile</h2>;
const Settings = () => <h2>Settings</h2>;

<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

## 🔒 Proteção de Rotas

### Componente de Rota Protegida

```tsx
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  redirectTo = '/login'
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

### Uso

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute isAuthenticated={loggedIn}>
      <Admin />
    </ProtectedRoute>
  }
/>
```

## 📝 Exemplos Práticos

### 1. Rota com Parâmetros Dinâmicos

```tsx
// Rota: /product/:id
<Route path="/product/:id" element={<ProductDetail />} />

// No componente:
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div>
      <h2>Produto {id}</h2>
      <button onClick={() => navigate('/products')}>
        Voltar para Produtos
      </button>
    </div>
  );
};
```

### 2. Rota com Query Parameters

```tsx
// URL: /search?q=react&page=2
<Route path="/search" element={<SearchResults />} />

// No componente:
const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  return (
    <div>
      <input 
        value={query || ''} 
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar..."
      />
      <p>Página {page}</p>
    </div>
  );
};
```

### 3. Rota 404 (Catch-all)

```tsx
<Route 
  path="*" 
  element={
    <div>
      <h1>404 - Página Não Encontrada</h1>
      <Link to="/">Voltar para Home</Link>
    </div>
  } 
/>
```

### 4. Redirecionamento

```tsx
// Redirecionamento simples
<Route path="/old-page" element={<Navigate to="/new-page" replace />} />

// Redirecionamento condicional
<Route 
  path="/admin" 
  element={
    isAdmin ? <Admin /> : <Navigate to="/login" replace />
  } 
/>
```

## 🎯 Dicas Importantes

1. **Sempre use `replace`** no `Navigate` para evitar entradas desnecessárias no histórico
2. **Use `state`** para passar dados entre rotas
3. **Organize rotas** de forma hierárquica para melhor manutenção
4. **Proteja rotas** que precisam de autenticação
5. **Use rotas aninhadas** para layouts compartilhados
6. **Sempre tenha uma rota 404** para páginas não encontradas

## 🔧 Configurações Avançadas

### HashRouter (para GitHub Pages)

```tsx
import { HashRouter as Router } from 'react-router-dom';

<Router>
  {/* Sua aplicação */}
</Router>
```

### MemoryRouter (para testes)

```tsx
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter initialEntries={['/']}>
  {/* Sua aplicação */}
</MemoryRouter>
```

Este guia cobre os principais conceitos do React Router DOM. Seu projeto já está configurado e funcionando com exemplos práticos! 