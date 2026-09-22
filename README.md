# Espetaria do Gaguinho - Cardápio Digital

Este é o repositório do cardápio digital moderno e interativo da **Espetaria do Gaguinho**. A aplicação foi projetada para oferecer a melhor experiência possível ao cliente, facilitando a navegação pelos produtos, personalização de combos e o processo final de checkout via WhatsApp.

## ?? Funcionalidades Principais

* **Design Premium e Responsivo**: Interface focada em mobile, mas que adapta-se perfeitamente em telas maiores. Estética "Dark Mode" moderna, que realça a aparência dos pratos.
* **Carrinho de Compras Interativo**: Adição de itens de forma fluida. O botão de "Adicionar" na vitrine de produtos transforma-se dinamicamente em controles de quantidade (- 1 +) para ajustes rápidos sem a necessidade de abrir o modal do carrinho.
* **Combos Personalizáveis**: Uma seção especial de Combos, que permite que o cliente "monte" o seu combo escolhendo os sabores específicos dos espetos antes de adicioná-los ao carrinho. A UI limita a quantidade permitida de acordo com o tamanho do combo.
* **Integração Automática com WhatsApp**: Ao finalizar a compra, o sistema compila os produtos, adicionais, combos, cálculo de frete, método de pagamento e gera um link automático para enviar o pedido formatado e pronto para o WhatsApp do restaurante.
* **Busca de CEP Automática & Cálculo de Frete**: Integração com a API ViaCEP. O sistema autocompleta o endereço e calcula o frete baseado no bairro de destino em Natal.
* **Gerenciamento de Horário Comercial**: Função de bloqueio automático que impede a realização de pedidos caso o restaurante esteja fora do seu horário de funcionamento.
* **Sistema de Avaliações**: Os clientes podem deixar avaliações em estrelas, e um modal exibe as análises mais recentes, transmitindo confiança para novos usuários.
* **Cache Local**: Salva as informações de endereço e contato (nome/telefone) do cliente usando o localStorage do navegador, dispensando o preenchimento de dados recorrentes e agilizando futuras compras.

## ?? Estrutura de Arquivos Profissional

O projeto está organizado da seguinte maneira:

/
+-- index.html            # Arquivo principal (Markup da aplicação)
+-- README.md             # Documentação
+-- assets/
    +-- css/
    ¦   +-- style.css     # Arquivo centralizado de estilos e variáveis de cores
    +-- js/
    ¦   +-- script.js     # Lógica central (Carrinho, Combos, Menu, WhatsApp)
    +-- images/           # Imagens de produtos, logos e assets visuais gerados via IA

## ?? Tecnologias Utilizadas

* **HTML5**: Estrutura semântica do cardápio e modais.
* **CSS3 Vanilla**: Estilos ricos em variáveis, flexbox, grid, gradients e transições suaves.
* **JavaScript (Vanilla)**: Manipulação da DOM em tempo real, estado da aplicação, eventos e manipulação do DOM.
* **ViaCEP API**: Busca de endereço simplificada.
* **Ionicons**: Ícones vetorizados.

## ?? Demonstração do Fluxo de Pedido

1. O cliente entra na aplicação, navega utilizando os botões de ancoragem do topo, visualiza as fotos.
2. Adiciona os espetos diretamente na lista. Caso deseje um **Combo**, o modal orientará na seleção dos sabores permitidos.
3. Ao visualizar o carrinho, o cliente escolhe Delivery (informa CEP, número e pagamento) ou Retirada (visualiza o endereço para buscar o pedido).
4. O clique final gera uma mensagem no WhatsApp com formatação elegante.
