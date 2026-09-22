# Espetaria do Gaguinho - MVP 🍢

Um aplicativo web moderno, 100% focado no front-end, projetado para oferecer a melhor experiência de cardápio digital e delivery para a Espetaria do Gaguinho. Todo o fluxo de pedidos foi otimizado para fechar a compra via WhatsApp, com design elegante, animações fluidas e navegação intuitiva.

## 🚀 Funcionalidades

- **Cardápio Dinâmico:** Categorias organizadas com navegação "ScrollSpy" (o menu superior acompanha a rolagem da página).
- **Carrinho Interativo:** Botão flutuante que pulsa ao adicionar itens, e um modal "glassmorphism" elegante para gerenciar o pedido.
- **Sistema de Login Simples:** Armazenamento local (Local Storage) para salvar o nome e WhatsApp do cliente.
- **Opções de Entrega:**
  - **Retirada no Local**
  - **Delivery:** Integração com ViaCEP para preenchimento automático do endereço e cálculo de taxa de entrega dinâmico por bairro.
- **Opções de Pagamento:** Formas de pagamento variadas com acréscimo dinâmico de 5% caso a opção seja Cartão de Crédito.
- **Validações e Feedback Visual:** Alertas customizados em formato modal, bordas vermelhas e textos dinâmicos orientando o preenchimento de campos obrigatórios.
- **Sistema de Avaliações:** Depoimentos de clientes com interação via estrelas para postar novas avaliações.
- **Horário de Funcionamento Inteligente:** Selo que capta a hora oficial de Natal/RN e atualiza ao vivo indicando se a loja está Aberta ou Fechada.
- **Checkout via WhatsApp:** Geração automática de uma mensagem limpa e bem formatada enviada diretamente para o WhatsApp do estabelecimento.

## 🛠 Tecnologias Utilizadas

- **HTML5:** Semântico e acessível.
- **CSS3:** Variáveis (Custom Properties) para fácil manutenção de temas (ex: Modo Dark, Paleta Laranja Premium `#F97316`), Flexbox, CSS Grid e Animações customizadas.
- **JavaScript (Vanilla):** Controle de estado, cálculos matemáticos do carrinho, manipulação de DOM e Fetch API para o ViaCEP.
- **Ionicons:** Biblioteca de ícones modernos e leves.

## 📦 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/flplemos/espetariadogaguinho.git
   ```
2. Abra a pasta do projeto.
3. Como se trata de um projeto estático (HTML/CSS/JS puros), basta abrir o arquivo `index.html` em qualquer navegador moderno. Para uma melhor experiência de desenvolvimento, você pode utilizar a extensão **Live Server** do VS Code.

## 🎨 Design System

- **Cor Primária:** `#F97316` (Laranja Premium)
- **Fundo:** `#121212` (Dark Mode Nativo)
- **Superfícies:** Componentes com "Glassmorphism" (transparência e desfoque no fundo) para modais.
- **Tipografia:** `Outfit`, limpa e moderna.
